import { resolve } from 'path';
import merge from 'webpack-merge';
import { BannerPlugin, HashedModuleIdsPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

import commonConfig from './webpack.common';

const prodConfig = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new BannerPlugin({
            banner: `/** @preserve This coo project is develop by YuTengjing under MIT license */`,
            raw: true,
        }),
        new ForkTsCheckerWebpackPlugin({
            memoryLimit: 1024 * 2,
            tsconfig: resolve(__dirname, '../../src/renderer/tsconfig.json'),
        }),
        new HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id].[contenthash].css',
            ignoreOrder: false,
        }),
        new LodashModuleReplacementPlugin(),
        new AntdDayjsWebpackPlugin(),
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[/\\]node_modules[/\\]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
    },
});

export default prodConfig;
