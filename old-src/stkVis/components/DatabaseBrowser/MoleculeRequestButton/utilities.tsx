import * as React from 'react';
import { getPageIndex, getPageKind } from '../../../selectors';
import { Nothing, Just, Maybe, MaybeKind } from 'maybe';
import {
    IDatabaseBrowser,
    DatabaseBrowserKind,
    PageKind,
} from '../../../models';
import { getPageMoleculesOptions } from '../../../actions';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';


export function assertNever(arg: never): never { throw Error(); }


interface IPageData
{
    pageIndex: number;
    pageKind: PageKind;
}


export interface MoleculeRequestButtonProps
{
    pageData: Maybe<IPageData>;
    dispatchPageRequest:
        (options: getPageMoleculesOptions) => () => void;
    isForward: boolean;
}


export function getButtonLabel(props: MoleculeRequestButtonProps)
{
    if (!props.isForward)
    {
        return <NavigateBeforeIcon />;
    }

    const pageData: Maybe<IPageData>
        = props.pageData;

    switch (pageData.kind)
    {
        case MaybeKind.Nothing:
            return <SearchIcon />;

        case MaybeKind.Just:
            if (
                pageData.value.pageKind === PageKind.LastIncomplete
                ||
                pageData.value.pageKind === PageKind.LastComplete
                ||
                pageData.value.pageKind === PageKind.OnlyIncomplete
                ||
                pageData.value.pageKind === PageKind.OnlyComplete
            ) {
                return <RefreshIcon />;
            }
            else
            {
                return <NavigateNextIcon />;
            }

        default:
            assertNever(pageData);
    }
}


export function getNextPageIndex(
    pageData: Maybe<IPageData>,
    isForward: boolean,
)
    : number
{
    switch(pageData.kind)
    {
        case MaybeKind.Just:

            if (
                isForward
                &&
                pageData.value.pageKind === PageKind.OnlyIncomplete
            )
            {
                return pageData.value.pageIndex;
            }
            if (
                isForward
                &&
                pageData.value.pageKind === PageKind.LastIncomplete
            )
            {
                return pageData.value.pageIndex;
            }

            const increment: number
                = (isForward)? 1 : -1;

            return pageData.value.pageIndex+increment;

        case MaybeKind.Nothing:
            return 0;

        default:
            assertNever(pageData);
    }
}


export function maybeGetPageData(
    state: IDatabaseBrowser,
)
    : Maybe<IPageData>
{
    switch(state.kind)
    {
        case DatabaseBrowserKind.Initial:
            return new Nothing();

        case DatabaseBrowserKind.Loaded:
            return new Just({
                pageIndex: getPageIndex(state),
                pageKind: getPageKind(state),
            });

        default:
            assertNever(state);
    }
}