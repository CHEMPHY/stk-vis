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
    MoleculeSelectionTypeKind,
} from '../../../../../../../../../models';
import { IPageData } from '../../../IPageData';
import {
    getPageKind,
    IDbEntry,
    getDatabaseData,
    IDatabaseData,
    getPropertyQuery,
    IPropertyQuery,
    extractPropertyData,
    getPropertyPromise,
    IPropertyResults,
    extractMoleculeData,
    addPositionMatrices,
} from './utilities';



interface OptionsBase
{
    kind: MoleculeSelectionTypeKind;
    database: string;
    moleculeCollection: string;
    positionMatrixCollection: string;
    propertyCollections: string[];
    dispatch: (action: AnyAction) => void;
    numEntriesPerPage: number;
    pageIndex: number;
    sortedCollection: string;
    currentPageData: Maybe<IPageData>;
    successSnackbar: (message: string) => void;
    errorSnackbar: (message: string) => void;
    client: MongoClient;
    cursor: AggregationCursor;
}


interface SelectBoth extends OptionsBase
{
    kind: MoleculeSelectionTypeKind.Both;
    buildingBlockPositionMatrixCollection: string;
}


interface SelectOne extends OptionsBase
{
    kind:
        MoleculeSelectionTypeKind.BuildingBlocks
        |
        MoleculeSelectionTypeKind.ConstructedMolecules;
}


type processArrayOptions =
    | SelectBoth
    | SelectOne

function assertNever(arg: never): never { throw Error(); }


interface processArrayInterface
{
    (options: processArrayOptions):
    (err: MongoError, item: IDbEntry[]) => void
}

export const processArray: processArrayInterface =
    (options: processArrayOptions) =>
    (err: MongoError, items: IDbEntry[]) =>
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
        = getDatabaseData(
            items.slice(0, options.numEntriesPerPage),
            options.sortedCollection,
        );

    const query: IPropertyQuery
        = getPropertyQuery(data);

    const propertyPromises: Promise<Maybe<IPropertyResults>>[]
        = options.propertyCollections.map(
            getPropertyPromise({...options, query})
        ).map(promise => promise.then(extractPropertyData(data)));

    const moleculesPromise: Promise<Maybe<IPropertyResults>>
        = getPropertyPromise
            ({...options, query})(options.moleculeCollection)
        .then(extractMoleculeData(data));

    const positionMatricesPromise: Promise<Maybe<IPropertyResults>>
        = getPropertyPromise
            ({...options, query})(options.positionMatrixCollection)

    const promises: Promise<any>[]
        = [];


    switch (options.kind)
    {
        case MoleculeSelectionTypeKind.Both:

            const bBPromise: Promise<Maybe<IPropertyResults>>
                = getPropertyPromise
                ({...options, query})
                (options.buildingBlockPositionMatrixCollection)

            promises.push(
                moleculesPromise,
                positionMatricesPromise,
                bBPromise,
                ...propertyPromises,
            );
            break;

        case MoleculeSelectionTypeKind.BuildingBlocks:
        case MoleculeSelectionTypeKind.ConstructedMolecules:
            promises.push(
                moleculesPromise,
                positionMatricesPromise,
                ...propertyPromises,
            );
            break;

        default:
            assertNever(options);
    }

    Promise.all(promises).then(
        (properties: Maybe<IPropertyResults>[]) =>
        {
            switch (options.kind)
            {
                case MoleculeSelectionTypeKind.Both:
                    addPositionMatrices(data, properties[2]);
                    break;

                case MoleculeSelectionTypeKind.BuildingBlocks:
                case MoleculeSelectionTypeKind.ConstructedMolecules:
                    break;

                default:
                    assertNever(options);
            }

            addPositionMatrices(data, properties[1]);

            options.dispatch(updateTable({
                molecules: data.molecules,
                columnValues: data.columnValues,
                pageIndex: options.pageIndex,
                pageKind,
                propertyCollections: [
                    options.sortedCollection,
                    ...options.propertyCollections,
                ],
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
