import { resolve } from 'path';
import webpack, { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { PROJECT_ROOT } from '../constants';
import packageJson from '../../package.json';

const outputPath = resolve(PROJECT_ROOT, 'public/vendor');
const dllConfig: Configuration = {
    mode: 'development',
    target: 'electron-renderer',
    context: PROJECT_ROOT,
    devtool: '#source-map',
    entry: {
        vendors: Object.keys(packageJson.dependencies).filter((pkg) => {
            const excludedPackages = new Set([
                'electron',
                'electron-window-state',
                'react-hot-loader',
                'react-dom',
                'normalize.css',
            ]);
            return !excludedPackages.has(pkg);
        }),
    },
    output: {
        path: outputPath,
        filename: '[name]-[hash].dll.js',
        library: '[name]_[hash]',
    },
    plugins: [
        new WebpackBar({
            name: 'dll',
            color: '#3873fe',
        }),
        new CleanWebpackPlugin({}),
        new webpack.DllPlugin({
            path: resolve(outputPath, '[name]-manifest.json'),
            name: '[name]_[hash]',
        }),
    ],
};

export default dllConfig;
