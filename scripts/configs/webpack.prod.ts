import { resolve } from 'path';
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
            memoryLimit: 2048,
            tsconfig: resolve(__dirname, '../../src/renderer/tsconfig.json'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
            ignoreOrder: false,
        }),
        new SizePlugin({ writeFile: false }),
        new BundleAnalyzerPlugin({ openAnalyzer: false }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
    },
});

const smp = new SpeedMeasurePlugin();
const prodConfig = smp.wrap(mergedConfig);

export default prodConfig;
