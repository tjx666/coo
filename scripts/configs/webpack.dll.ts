import { resolve } from 'path';
import webpack, { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import packageJson from '../../package.json';
import { PROJECT_ROOT } from '../constants';

const outputPath = resolve(PROJECT_ROOT, 'public/vendor');
const dllConfig: Configuration = {
    mode: 'development',
    target: 'electron-renderer',
    context: PROJECT_ROOT,
    devtool: '#source-map',
    entry: {
        vendors: Object.keys(packageJson.dependencies).filter(pkg => {
            const excludedPackages = [
                'electron',
                'electron-window-state',
                'react-hot-loader',
                'react-dom',
                'normalize.css',
            ];
            return !excludedPackages.includes(pkg);
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
