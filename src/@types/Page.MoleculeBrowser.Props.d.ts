declare module 'Page.MoleculeBrowser.Props'
{
    import {
        Props as SortButtonProps,
    } from 'Page.MoleculeBrowser.SortButton';
    import {
        Props as MoleculeTableProps,
    } from 'Page.MoleculeBrowser.MoleculeTable';
    import {
        Props as TwoDViewerProps,
    } from 'Page.MoleculeBrowser.TwoDViewer';
    import {
        Props as ThreeDViewerProps,
    } from 'Page.MoleculeBrowser.ThreeDViewer';
    import {
        Props as NextButtonProps,
    } from 'Page.MoleculeBrowser.NextButton';
    import {
        Props as BackButtonProps,
    } from 'Page.MoleculeBrowser.BackButton';
    import {
        Props as BreadcrumbsProps,
    } from 'Page.MoleculeBrowser.Breadcrumbs';

    export interface Props<a>
    {
        sortButton: SortButtonProps<a>;
        moleculeTable: MoleculeTableProps<a>;
        twoDViewer: TwoDViewerProps;
        threeDViewer: ThreeDViewerProps;
        nextButton: NextButtonProps<a>;
        backButton: BackButtonProps<a>;
        breadcrumbs: BreadcrumbsProps<a>;
    }
}