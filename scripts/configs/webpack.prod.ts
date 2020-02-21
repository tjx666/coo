import { resolve } from 'path';
import { argv } from 'yargs';
import merge from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import SizePlugin from 'size-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import commonConfig from './webpack.common';

const mergedConfig = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            memoryLimit: 1024 * 2,
            tsconfig: resolve(__dirname, '../../src/renderer/tsconfig.json'),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id].[contenthash].css',
            ignoreOrder: false,
        }),
        new SizePlugin({ writeFile: false }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
    },
});

if (argv.analyze) mergedConfig.plugins!.push(new BundleAnalyzerPlugin());

const smp = new SpeedMeasurePlugin();
const prodConfig = smp.wrap(mergedConfig);

export default prodConfig;
