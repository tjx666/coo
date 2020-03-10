import { resolve } from 'path';
import merge from 'webpack-merge';
import { HotModuleReplacementPlugin, DllReferencePlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

import { PROJECT_ROOT } from '../constants';
import commonConfig from './webpack.common';

const devConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            memoryLimit: 1024,
            tsconfig: resolve(__dirname, '../../src/renderer/tsconfig.json'),
        }),
        new DllReferencePlugin({
            context: PROJECT_ROOT,
            manifest: resolve(PROJECT_ROOT, 'public/vendor/vendors-manifest.json'),
        }),
        new AddAssetHtmlPlugin({ filepath: resolve(PROJECT_ROOT, 'public/vendor/*.dll.js') }),
    ],
});

export default devConfig;
