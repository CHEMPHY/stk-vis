import { IDbEntry } from '../IDbEntry';
import { MongoError } from 'mongodb';
import { getDatabaseData, IDatabaseData } from '../getDatabaseData';
import { getPropertyQuery, IPropertyQuery } from '../getPropertyQuery';
import {
    assertNever,
    getPropertyPromise,
    getMoleculeId
} from '../utilities';
import { updateTable, setLastPage } from '../../../../../actions';
import { PageKind } from '../../../../../models';
import {
    processArrayInterface,
    processArrayOptions,
} from './interfaces';
import {
    extractPropertyData,
    IPropertyResults,
} from '../utilities';




export const processArray: processArrayInterface =
    (options: processArrayOptions) =>
    (err: MongoError, items: IDbEntry[]) =>
{
    if (items === undefined || items.length === 0)
    {
        options.dispatch(setLastPage());
        return;
    }

    const isFirstPage: boolean
        = options.pageIndex === 0;

    const isLastPage: boolean
        // The requests number of items should be numEntriesPerPage+1.
        = items.length <= options.numEntriesPerPage;

    let pageKind: PageKind
        = PageKind.Last;

    if (isFirstPage && isLastPage)
    {
        pageKind = PageKind.Only;
    }
    if (isFirstPage && !isLastPage)
    {
        pageKind = PageKind.First;
    }
    if (!isFirstPage && isLastPage)
    {
        pageKind = PageKind.Last;
    }
    if (!isFirstPage && !isLastPage)
    {
        pageKind = PageKind.Middle;
    }

    const data: IDatabaseData
        = getDatabaseData(items.slice(0, options.numEntriesPerPage));

    const query: IPropertyQuery
        = getPropertyQuery(data);

    const propertyPromises: Promise<IPropertyResults>[]
        = options.propertyCollections.map(
            getPropertyPromise
            (options.client)(options.database)(query)
        ).map(promise => promise.then(extractPropertyData(data)));

    Promise.all(propertyPromises).then(
        (properties: IPropertyResults[]) =>
        {
            options.dispatch(updateTable({
                molecules: data.molecules,
                columnValues: data.columnValues,
                pageIndex: options.pageIndex,
                pageKind,
            }));
            options.cursor.close();
            options.client.close();
        }
    );
}