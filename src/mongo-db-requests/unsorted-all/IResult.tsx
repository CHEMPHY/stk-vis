import { IMolecule, PageKind } from '../types';


export const enum ResultKind
{
    Success = 'Success',
    DatabaseConnectionError = 'Database Connection Error',
    CollectionConnectionError = 'Collection Connection Error',


}


export interface ISuccess
{
    kind: ResultKind.Success;
    molecules: IMolecule[];
    pageKind: PageKind;
    valueCollections: string[];
}

export interface IDatabaseConnectionError
{
    kind: ResultKind.DatabaseConnectionError;
}


export interface ICollectionConnectionError
{
    kind: ResultKind.CollectionConnectionError;
}



export type IResult =
    | ISuccess
    | IDatabaseConnectionError
    | ICollectionConnectionError
