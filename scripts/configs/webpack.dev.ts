import { resolve } from 'path';
import merge from 'webpack-merge';
import { HotModuleReplacementPlugin, NamedModulesPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import commonConfig from './webpack.common';

const devConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin(),
        new ForkTsCheckerWebpackPlugin({
            memoryLimit: 1024,
            tsconfig: resolve(__dirname, '../../src/renderer/tsconfig.json'),
        }),
    ],
});

export default devConfig;
