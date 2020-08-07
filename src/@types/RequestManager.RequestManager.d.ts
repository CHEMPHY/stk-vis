declare module 'RequestManager.RequestManager'

{
    import {
        Action,
    } from 'RequestManager.Action';
    import {
        RequestResult,
    } from 'RequestManager.RequestResult';
    import {
        UpdateMoleculePage,
    } from 'RequestManager.UpdateMoleculePage';
    import {
        SortType
    } from 'RequestManager.SortType';
    import {
        SetSorted
    } from 'RequestManager.SetSorted';
    import {
        SetUnsorted
    } from 'RequestManager.SetUnsorted';

    export type RequestManager = Record<string, unknown>;

    export interface BackButtonProps<a>
    {
        value0: {
            disabled: boolean;
            onClick:
                () =>
                (dispatch: (action: a) => void) =>
                Promise<void>;
        };
    }

    export interface SortButtonProps<a>
    {
        value0: {
            collections: string[];
            setSorted:
                (dispatch: (action: a) => void) =>
                (collection: string) =>
                (sortType: SortType) =>
                void
            setUnsorted: (dispatch: (action: a) => void) => void
        };
    }

    export interface ActionCreators<a>
    {
        setSorted: (payload: SetSorted) => a;
        setUnsorted: (payload: SetUnsorted) => a;
    }

    export interface NextButtonProps<a>
    {
        value0: {
            lastPage: boolean;
            onClick:
                () =>
                (dispatch: (action: a) => void) =>
                Promise<void>;
        };
    }

    export const initialState: RequestManager;

    export const reducer:
        (state: RequestManager) =>
        (action: Action) =>
        RequestManager;

    export const nextButtonProps:
        <a>(updateMoleculePage: (payload: UpdateMoleculePage) => a) =>
        (state: RequestManager) =>
        NextButtonProps<a>;

    export const backButtonProps:
        <a>(updateMoleculePage: (payload: UpdateMoleculePage) => a) =>
        (state: RequestManager) =>
        BackButtonProps<a>;

    export const sortButtonProps:
        <a>(actionCreators: ActionCreators<a>) =>
        (state: RequestManager)
        => SortButtonProps<a>;
}
