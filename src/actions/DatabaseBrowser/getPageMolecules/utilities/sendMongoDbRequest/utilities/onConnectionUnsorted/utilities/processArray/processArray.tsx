import { AnyAction } from '@reduxjs/toolkit';
import { MongoError, MongoClient, AggregationCursor } from 'mongodb';
import {
    updateTable,
    setMoleculeRequestState,
} from '../../../../../../../../../actions';
import {
    MaybeKind,
    Maybe,
} from '../../../../../../../../../utilities';
import {
    PageKind,
    MoleculeRequestStateKind,
    SearchKind,
} from '../../../../../../../../../models';
import { IPageData } from '../../../IPageData';
import {
    getPageKind,
    getDatabaseData,
    IDatabaseData,
    IMoleculeEntry,
    getPropertyQuery,
    IPropertyQuery,
    extractPropertyData,
    getPropertyPromise,
    getPositionMatrixPromise,
    IPropertyResults,
    IPositionMatrixResults,
    addPositionMatrices,
    validateData,
    IValidatedDatabaseData,
} from './utilities';



interface OptionsBase
{
    kind: SearchKind;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    propertyCollections: string[];
    dispatch: (action: AnyAction) => void;
    numEntriesPerPage: number;
    pageIndex: number;
    currentPageData: Maybe<IPageData>;
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
    client: MongoClient;
    cursor: AggregationCursor;
}


interface SelectBoth extends OptionsBase
{
    kind: SearchKind.UnsortedBoth;
    buildingBlockPositionMatrixCollection: string;
}


interface SelectOne extends OptionsBase
{
    kind:
        SearchKind.UnsortedBuildingBlocks
        |
        SearchKind.UnsortedConstructedMolecules;
}

type processArrayOptions =
    | SelectBoth
    | SelectOne


function assertNever(arg: never): never { throw Error(); }


interface processArrayInterface
{
    (options: processArrayOptions):
    (err: MongoError, item: IMoleculeEntry[]) => void
}

export const processArray: processArrayInterface =
    (options: processArrayOptions) =>
    (err: MongoError, items: IMoleculeEntry[]) =>
{
    if (err !== null)
    {
        options.dispatch(
            setMoleculeRequestState(
                MoleculeRequestStateKind.RequestFailed
            )
        );
        options.errorSnackbar('Could not find entries in database.');
        return;
    }

    if (items.length === 0)
    {
        options.dispatch(
            setMoleculeRequestState(
                MoleculeRequestStateKind.RequestSucceeded
            )
        );
        options.successSnackbar('Did not find any molecules!');
        return;
    }

    const pageKind: PageKind
        = getPageKind({
            numItems: items.length,
            pageIndex: options.pageIndex,
            numEntriesPerPage: options.numEntriesPerPage,
        });

    const data: IDatabaseData
        = getDatabaseData(items.slice(0, options.numEntriesPerPage));

    const query: IPropertyQuery
        = getPropertyQuery(data);

    const propertyPromises: Promise<Maybe<IPropertyResults>>[]
        = options.propertyCollections.map(
            getPropertyPromise({...options, query})
        ).map(promise => promise.then(extractPropertyData(data)));

    const positionMatricesPromise: Promise<Maybe<IPositionMatrixResults>>
        = getPositionMatrixPromise
            ({...options, query})(options.positionMatrixCollection)

    const promises: Promise<unknown>[]
        = [];

    switch (options.kind)
    {
        case SearchKind.UnsortedBoth:

            const bBPromise: Promise<Maybe<IPositionMatrixResults>>
                = getPositionMatrixPromise
                ({...options, query})
                (options.buildingBlockPositionMatrixCollection)

            promises.push(
                positionMatricesPromise,
                bBPromise,
                ...propertyPromises,
            );
            break;

        case SearchKind.UnsortedBuildingBlocks:
        case SearchKind.UnsortedConstructedMolecules:
            promises.push(
                positionMatricesPromise,
                ...propertyPromises,
            );
            break;

        default:
            assertNever(options);
    }

    Promise.all(promises).then(
        (properties: Promise<unknown>[]) =>
        {

            switch (options.kind)
            {
                case SearchKind.UnsortedBoth:
                    addPositionMatrices(data, properties[1]);
                    break;

                case SearchKind.UnsortedBuildingBlocks:
                case SearchKind.UnsortedConstructedMolecules:
                    break;

                default:
                    assertNever(options);
            }

            addPositionMatrices(data, properties[0]);

            const validatedData: IValidatedDatabaseData
                = validateData(data);

            options.dispatch(updateTable({
                molecules: validatedData.molecules,
                columnValues: validatedData.columnValues,
                pageIndex: options.pageIndex,
                pageKind,
                propertyCollections: options.propertyCollections,
            }));
            options.cursor.close();
            options.client.close();

            switch (options.currentPageData.kind)
            {
                case MaybeKind.Nothing:
                    break;

                case MaybeKind.Just:
                    const noNewMolecules: boolean
                        = (
                            data.molecules.length
                            <=
                            options.currentPageData.value.numMolecules
                        );

                    const isSamePage: boolean
                        = (
                            options.pageIndex
                            ===
                            options.currentPageData.value.pageIndex
                        );

                    const isIncomplete: boolean
                        = (
                            pageKind === PageKind.OnlyIncomplete
                            ||
                            pageKind === PageKind.LastIncomplete
                        );

                    if (isSamePage && noNewMolecules && isIncomplete)
                    {
                        options.successSnackbar(
                            'There are no new molecules!'
                        );
                    }
                    break;

                default:
                    assertNever(options.currentPageData);

            }
        }
    );
}
