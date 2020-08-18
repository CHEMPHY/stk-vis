const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    entry: {
        // 'stk-vis': './src/stk-vis/index.tsx',
        'molecule-browser': './src/molecule-browser/index.tsx',
        //'mongo-configurator': './src/mongo-configurator/index.tsx',
        'molecules': './src/molecules/index.tsx',
        'request-manager': './src/request-manager/index.tsx',

        'stk-vis': './src/Page/StkVis/index.tsx',
        'mongo-configurator': './src/Page/MongoConfigurator/index.tsx',

        'unsorted-all':
            './src/Page/MoleculeBrowser/UnsortedAll/index.tsx',

        'unsorted-building-blocks':
            './src/Page/MoleculeBrowser/'
            +'UnsortedBuildingBlocks/index.tsx',

        'unsorted-constructed-molecules':
            './src/Page/MoleculeBrowser/'
            +'UnsortedConstructedMolecules/index.tsx',

        'sorted-all':
            './src/Page/MoleculeBrowser/SortedAll/index.tsx',

        'sorted-building-blocks':
            './src/Page/MoleculeBrowser/'
            +'SortedBuildingBlocks/index.tsx',

        'sorted-constructed-molecules':
            './src/Page/MoleculeBrowser/'
            +'SortedConstructedMolecules/index.tsx',

    },
    target: 'electron-renderer',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'stkVis',
            template: './src/template.html',
            chunks: ['stk-vis'],
            filename: 'stk-vis.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Mongo Configurator',
            template: './src/template.html',
            chunks: ['mongo-configurator'],
            filename: 'mongo-configurator.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Molecule Browser',
            template: './src/template.html',
            chunks: ['molecule-browser'],
            filename: 'molecule-browser.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Request Manager',
            template: './src/template.html',
            chunks: ['request-manager'],
            filename: 'request-manager.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Molecules',
            template: './src/template.html',
            chunks: ['molecules'],
            filename: 'molecules.html',
        }),
        new HtmlWebpackPlugin({
            title: 'UnsortedAll',
            template: './src/template.html',
            chunks: ['unsorted-all'],
            filename: 'unsorted-all.html',
        }),
        new HtmlWebpackPlugin({
            title: 'UnsortedBuildingBlocks',
            template: './src/template.html',
            chunks: ['unsorted-building-blocks'],
            filename: 'unsorted-building-blocks.html',
        }),
        new HtmlWebpackPlugin({
            title: 'UnsortedConstructedMolecules',
            template: './src/template.html',
            chunks: ['unsorted-constructed-molecules'],
            filename: 'unsorted-constructed-molecules.html',
        }),
        new HtmlWebpackPlugin({
            title: 'SortedAll',
            template: './src/template.html',
            chunks: ['sorted-all'],
            filename: 'sorted-all.html',
        }),
        new HtmlWebpackPlugin({
            title: 'SortedBuildingBlocks',
            template: './src/template.html',
            chunks: ['sorted-building-blocks'],
            filename: 'sorted-building-blocks.html',
        }),
        new HtmlWebpackPlugin({
            title: 'SortedConstructedMolecules',
            template: './src/template.html',
            chunks: ['sorted-constructed-molecules'],
            filename: 'sorted-constructed-molecules.html',
        }),
    ],
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            'stk-vis': path.join(
                __dirname,
                './src/stk-vis/components',
            ),

            'molecules': path.join(
                __dirname,
                './src/molecules/components',
            ),

            'request-manager': path.join(
                __dirname,
                './src/request-manager/components',
            ),

            'mongo-configurator': path.join(
                __dirname,
                './src/mongo-configurator/components',
            ),

            'SortType': path.join(
                __dirname,
                './output/SortType',
            ),

            'Page.StkVis': path.join(
                __dirname,
                './output/Page.StkVis',
            ),


            'Page.MongoConfigurator': path.join(
                __dirname,
                './output/Page.MongoConfigurator',
            ),


            'Page.MoleculeBrowser.UnsortedAll': path.join(
                __dirname,
                './output/Page.MoleculeBrowser.UnsortedAll',
            ),

            'Page.MoleculeBrowser.UnsortedBuildingBlocks': path.join(
                __dirname,
                './output/Page.MoleculeBrowser.UnsortedBuildingBlocks',
            ),

            'Page.MoleculeBrowser.UnsortedConstructedMolecules':
                path.join(
                    __dirname,
                    './output/Page.MoleculeBrowser.'
                    +'UnsortedConstructedMolecules',
                ),

            'Page.MoleculeBrowser.SortedAll': path.join(
                __dirname,
                './output/Page.MoleculeBrowser.SortedAll',
            ),

            'Page.MoleculeBrowser.SortedBuildingBlocks': path.join(
                __dirname,
                './output/Page.MoleculeBrowser.SortedBuildingBlocks',
            ),

            'Page.MoleculeBrowser.SortedConstructedMolecules':
                path.join(
                    __dirname,
                    './output/Page.MoleculeBrowser.'
                    +'SortedConstructedMolecules',
                ),

            'Page.MoleculeBrowser.MoleculeTable': path.join(
                __dirname,
                './output/Page.MoleculeBrowser.MoleculeTable',
            ),

            'molecule-browser': path.join(
                __dirname,
                './src/molecule-browser/components',
            ),

            'StkVis.StkVis': path.join(
                __dirname,
                './output/StkVis.StkVis',
            ),

            'StkVis.Action': path.join(
                __dirname,
                './output/StkVis.Action',
            ),

            'MongoConfigurator.MongoConfigurator': path.join(
                __dirname,
                './output/MongoConfigurator.MongoConfigurator',
            ),

            'MongoConfigurator.SearchKind': path.join(
                __dirname,
                './output/MongoConfigurator.SearchKind',
            ),

            'MoleculeBrowser.Initialize.UnsortedAll':
                path.join(
                    __dirname,
                    './output/MoleculeBrowser.'
                    + 'Initialize.UnsortedAll',
                ),

            'MoleculeBrowser.Initialize.UnsortedBuildingBlocks':
                path.join(
                    __dirname,
                    './output/MoleculeBrowser.'
                    + 'Initialize.'
                    + 'UnsortedBuildingBlocks',
                ),

            'MoleculeBrowser.Initialize.UnsortedConstructedMolecules':
                path.join(
                    __dirname,
                    './output/MoleculeBrowser.'
                    + 'Initialize.'
                    + 'UnsortedConstructedMolecules',
                ),

            'MongoConfigurator.Action': path.join(
                __dirname,
                './output/MongoConfigurator.Action',
            ),

            'MoleculeBrowser.Action': path.join(
                __dirname,
                './output/MoleculeBrowser.Action',
            ),

            'MoleculeBrowser.MoleculeBrowser': path.join(
                __dirname,
                './output/MoleculeBrowser.MoleculeBrowser',
            ),

            'Molecules.Molecules':
                path.join(
                    __dirname,
                    './output/Molecules.Molecules',
                ),

            'Molecules.Action':
                path.join(
                    __dirname,
                    './output/Molecules.Action',
                ),

            'Molecules.SelectMolecule':
                path.join(
                    __dirname,
                    './output/Molecules.SelectMolecule',
                ),

            'Molecules.Utils':
                path.join(
                    __dirname,
                    './output/Molecules.Utils',
                ),

            'Molecules.Utils.UnsortedAll':
                path.join(
                    __dirname,
                    './output/Molecules.Utils.UnsortedAll',
                ),

            'RequestManager.RequestManager':
                path.join(
                    __dirname,
                    './output/RequestManager.RequestManager',
                ),

            'RequestManager.Action':
                path.join(
                    __dirname,
                    './output/RequestManager.Action',
                ),

            'RequestManager.SortType':
                path.join(
                    __dirname,
                    './output/RequestManager.SortType',
                ),

            'RequestManager.PageKind':
                path.join(
                    __dirname,
                    './output/RequestManager.PageKind',
                ),

            'RequestManager.InitializeUnsortedAll':
                path.join(
                    __dirname,
                    './output/RequestManager.InitializeUnsortedAll',
                ),

            'RequestManager.InitializeUnsortedBuildingBlocks':
                path.join(
                    __dirname,
                    './output/RequestManager.'
                    + 'InitializeUnsortedBuildingBlocks',
                ),

            'RequestManager.InitializeUnsortedConstructedMolecules':
                path.join(
                    __dirname,
                    './output/RequestManager.'
                    + 'InitializeUnsortedConstructedMolecules',
                ),

            'MongoConfigurator.InitializeMongoConfigurator':
                path.join(
                    __dirname,
                    './output/MongoConfigurator.'
                    + 'InitializeMongoConfigurator',
                ),

            'RequestManager.SetSorted':
                path.join(
                    __dirname,
                    './output/RequestManager.SetSorted',
                ),

            'RequestManager.SetUnsorted':
                path.join(
                    __dirname,
                    './output/RequestManager.SetUnsorted',
                ),

            'RequestManager.UpdateMoleculePage':
                path.join(
                    __dirname,
                    './output/RequestManager.UpdateMoleculePage',
                ),

            'Requests.UnsortedAll':
                path.join(
                    __dirname,
                    './output/Requests.UnsortedAll',
                ),

            'SelectingCollection':
                path.join(
                    __dirname,
                    './output/SelectingCollection',
                ),

        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
        ],
    },
}
