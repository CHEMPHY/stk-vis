import { Maybe, Just, Nothing } from '../../utilities';
import {
    IState,
    ILoadedDatabaseBrowser,
    IInitialDatabaseBrowser,
    IDatabaseBrowser,
    IColumnValues,
    IMolecule,
    IInitialRequestState,
    IMoleculeRequestState,
    DatabaseBrowserKind,
    PageKind,
    ISortedLoadedDatabaseBrowser,
    SortType,
    SortKind,
} from '../../models';
import * as fp from 'lodash/fp';


export function getDatabaseBrowser(
    state: IState,
)
    : IDatabaseBrowser
{
    return state;
}

export function getDatabaseBrowserKind(
    state: IDatabaseBrowser,
)
    : DatabaseBrowserKind
{
    return state.kind;
}


export function getMoleculeTableEntry({
    state,
    columnName,
    moleculeId,
}: {
    state: ILoadedDatabaseBrowser,
    columnName: string,
    moleculeId: number,
}
): Maybe<string>
{
    const columnValues: IColumnValues = getColumnValues(state);
    const entry: string | undefined
        = fp.get([columnName, moleculeId], columnValues);

    if (entry === undefined) {
        return new Nothing();
    } else {
        return new Just(entry);
    }
}


export function getVisibleColumns(
    state: ILoadedDatabaseBrowser,
)
    : string[]
{
    return state.visibleColumns;
}


export function getColumnValues(
    state: ILoadedDatabaseBrowser,
)
    : IColumnValues
{
    return state.columnValues;
}


export function getTableMolecules(
    state: ILoadedDatabaseBrowser,
)
    : IMolecule[]
{
    return state.molecules;
}


export function getMoleculeRequestState(
    state: ILoadedDatabaseBrowser,
)
    : IMoleculeRequestState
{
    return state.moleculeRequestState;
}


export function getInitialRequestState(
    state: IInitialDatabaseBrowser,
)
    : IInitialRequestState
{
    return state.initialRequestState;
}


export function getMongoDbUrl(state: IDatabaseBrowser): string {
    return state.url;
}


export function getMongoDbDatabase(state: IDatabaseBrowser): string {
    return state.database;
}


export function getMongoDbMoleculeCollection(
    state: IDatabaseBrowser,
)
    : string
{
    return state.moleculeCollection;
}


export function getMongoDbPositionMatrixCollection(
    state: IDatabaseBrowser,
)
    : string
{
    return state.positionMatrixCollection;
}


export function getMongoDbPropertyCollections(
    state: IDatabaseBrowser,
)
    : string[]
{
    return state.propertyCollections;
}


export function getPageIndex(
    state: ILoadedDatabaseBrowser
)
    : number
{
    return state.pageIndex;
}


export function getNumEntriesPerPage(
    state: IDatabaseBrowser
)
    : number
{
    return state.numEntriesPerPage;
}


export function getPageKind(
    state: ILoadedDatabaseBrowser,
)
    : PageKind
{
    return state.pageKind;
}


export function getMolecules(
    state: ILoadedDatabaseBrowser,
)
    : IMolecule[]
{
    return state.molecules
}

export function getSelectedMolecule(
    state: ILoadedDatabaseBrowser,
)
    : number
{
    return state.selectedMolecule;
}


export function getSortedCollection(
    state: ISortedLoadedDatabaseBrowser,
)
    : string
{
    return state.sortedCollection;
}


export function getSortType(
    state: ISortedLoadedDatabaseBrowser,
)
    : SortType
{
    return state.sortType;
}


export function getSortKind(
    state: ISortedLoadedDatabaseBrowser,
)
    : SortKind
{
    return state.sortKind;
}
