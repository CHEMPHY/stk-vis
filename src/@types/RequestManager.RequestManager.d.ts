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

    export type RequestManager = Record<string, unknown>;

    type Dispatch<a> = (action: a) => void;
    export interface BackButtonProps<a>
    {
        value0: {
            disabled: boolean;
            request: () => Promise<RequestResult>;
            onClick: () => (dispatch: Dispatch<a>) => Promise<void>;
        };
    }

    export interface SortButtonProps
    {
        value0: {
            collections: string[];
        };
    }

    export interface NextButtonProps
    {
        value0: {
            lastPage: boolean;
            request: () => Promise<RequestResult>;
        };
    }

    export const initialState: RequestManager;

    export const reducer:
        (state: RequestManager) =>
        (action: Action) =>
        RequestManager;

    export const nextButtonProps:
        (state: RequestManager) => NextButtonProps;

    export const backButtonProps:
        <a>(updateMoleculePage: (payload: UpdateMoleculePage) => a) =>
        (state: RequestManager) =>
        BackButtonProps<a>;

    export const sortButtonProps:
        (state: RequestManager) => SortButtonProps;
}
