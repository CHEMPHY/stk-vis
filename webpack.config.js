const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    entry: {
        'stk-vis': './src/stk-vis/index.tsx',
        'molecule-browser': './src/molecule-browser/index.tsx',
        'mongo-configurator': './src/mongo-configurator/index.tsx',
        'molecules': './src/molecules/index.tsx',
        'request-manager': './src/request-manager/index.tsx',
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

            'molecule-browser': path.join(
                __dirname,
                './src/molecule-browser/components',
            ),

            'StkVis.UpdateFields.UpdateFields': path.join(
                __dirname,
                './output/StkVis.UpdateFields.UpdateFields',
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

            'MongoConfigurator.Action': path.join(
                __dirname,
                './output/MongoConfigurator.Action',
            ),

            'MongoConfigurator.UpdateFields.UpdateFields': path.join(
                __dirname,
                './output/MongoConfigurator.UpdateFields.UpdateFields',
            ),

            'MoleculeBrowser.Action': path.join(
                __dirname,
                './output/MoleculeBrowser.Action',
            ),

            'MoleculeBrowser.MoleculeBrowser': path.join(
                __dirname,
                './output/MoleculeBrowser.MoleculeBrowser',
            ),

            'MoleculeBrowser.UpdateMoleculePage.UpdateMoleculePage':
                path.join(
                    __dirname,
                    './output/MoleculeBrowser.'
                    + 'UpdateMoleculePage.UpdateMoleculePage',
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

            'RequestManager.InitializeSortedAll':
                path.join(
                    __dirname,
                    './output/RequestManager.InitializeSortedAll',
                ),

            'RequestManager.InitializeSortedBuildingBlocks':
                path.join(
                    __dirname,
                    './output/RequestManager.'
                    + 'InitializeSortedBuildingBlocks',
                ),

            'RequestManager.InitializeSortedConstructedMolecules':
                path.join(
                    __dirname,
                    './output/RequestManager.'
                    + 'InitializeSortedConstructedMolecules',
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

            'mongo-db-requests': path.join(
                __dirname,
                './src/mongo-db-requests',
            ),

            'maybe': path.join(
                __dirname,
                './src/maybe',
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
