import { AnyAction } from '@reduxjs/toolkit';
import {
    IDatabaseBrowser,
    ISortedLoadedDatabaseBrowser,
    DatabaseBrowserKind,
    SortedKind,
} from '../../models';
import {
    urlReducer,
    databaseReducer,
    moleculeCollectionReducer,
    positionMatrixCollectionReducer,
    propertyCollectionsReducer,
} from './mongoDbReducers';
import {
    moleculeRequestStateReducer,
} from './moleculeRequestStateReducer';
import {
    moleculesReducer
} from './moleculesReducer';
import {
    visibleColumnsReducer
} from './visibleColumnsReducer';
import {
    columnValuesReducer
} from './columnValuesReducer';
import {
    pageIndexReducer,
} from './pageIndexReducer';
import {
    numEntriesPerPageReducer
} from './numEntriesPerPageReducer';
import {
    pageKindReducer
} from './pageKindReducer';
import {
    selectedMoleculeReducer
} from './selectedMoleculeReducer';
import {
    sortedCollectionReducer
} from './sortedCollectionReducer';
import {
    sortedTypeReducer
} from './sortedTypeReducer';
import {
    getMongoDbUrl,
    getMongoDbDatabase,
    getMongoDbPropertyCollections,
    getMongoDbPositionMatrixCollection,
    getMongoDbMoleculeCollection,
    getMoleculeRequestState,
    getTableMolecules,
    getVisibleColumns,
    getColumnValues,
    getPageIndex,
    getNumEntriesPerPage,
    getPageKind,
    getSelectedMolecule,
    getSortedCollection,
    getSortedType,
} from '../../selectors';



export function sortedDatabaseBrowserReducer(
    state: ISortedLoadedDatabaseBrowser,
    action: AnyAction,
)
    : IDatabaseBrowser
{
    return {
        kind:
            DatabaseBrowserKind.Loaded,
        url:
            urlReducer(
                getMongoDbUrl(state),
                action,
            ),
        database:
            databaseReducer(
                getMongoDbDatabase(state),
                action,
            ),
        moleculeCollection:
            moleculeCollectionReducer(
                getMongoDbMoleculeCollection(state),
                action,
            ),
        positionMatrixCollection:
            positionMatrixCollectionReducer(
                getMongoDbPositionMatrixCollection(state),
                action,
            ),
        propertyCollections:
            propertyCollectionsReducer(
                getMongoDbPropertyCollections(state),
                action,
            ),
        moleculeRequestState:
            moleculeRequestStateReducer(
                getMoleculeRequestState(state),
                action,
            ),
        molecules:
            moleculesReducer(
                getTableMolecules(state),
                action,
            ),
        visibleColumns:
            visibleColumnsReducer(
                getVisibleColumns(state),
                action,
            ),
        columnValues:
            columnValuesReducer(
                getColumnValues(state),
                action,
            ),
        pageIndex:
            pageIndexReducer(
                getPageIndex(state),
                action,
            ),
        numEntriesPerPage:
            numEntriesPerPageReducer(
                getNumEntriesPerPage(state),
                action,
            ),
        pageKind:
            pageKindReducer(
                getPageKind(state),
                action,
            ),
        selectedMolecule:
            selectedMoleculeReducer(
                getSelectedMolecule(state),
                action,
            ),

        sortedKind:
            SortedKind.Sorted,

        sortedCollection:
            sortedCollectionReducer(
                getSortedCollection(state),
                action,
            ),
        sortedType:
            sortedTypeReducer(
                getSortedType(state),
                action,
            ),
    };
}
