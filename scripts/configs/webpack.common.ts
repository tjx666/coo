import { resolve } from 'path';
import { argv } from 'yargs';
import { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Options as HtmlMinifierOptions } from 'html-minifier';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import SizePlugin from 'size-plugin';

import { __DEV__, PROJECT_ROOT } from '../constants';

function getCSSLoaders(importLoaders: number) {
    const styleLoader = {
        loader: 'style-loader',
        options: {
            esModule: true,
        },
    };
    return [
        __DEV__ ? styleLoader : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: false,
                sourceMap: true,
                importLoaders,
            },
        },
    ];
}

const htmlMinifyOptions: HtmlMinifierOptions = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    useShortDoctype: true,
};
const renderer = resolve(PROJECT_ROOT, 'src/renderer/');
const commonConfig: Configuration = {
    cache: true,
    target: 'electron-renderer',
    context: PROJECT_ROOT,
    entry: ['react-hot-loader/patch', resolve(PROJECT_ROOT, 'src/renderer/index.tsx')],
    output: {
        publicPath: '/',
        path: resolve(PROJECT_ROOT, 'dist'),
        filename: 'js/[name].js',
    },
    watchOptions: {
        ignored: [/node_modules/, /dist/, /out/, /public/, /src\/main/, /src\/renderer\/assets/],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            'normalize.css$': resolve(PROJECT_ROOT, 'node_modules/normalize.css/normalize.css'),
            'react-dom': '@hot-loader/react-dom',
            '@': renderer,
            typings: resolve(renderer, 'typings'),
            api: resolve(renderer, 'api'),
            reducers: resolve(renderer, 'reducers'),
            hooks: resolve(renderer, 'hooks'),
            assets: resolve(renderer, 'assets'),
            components: resolve(renderer, 'components'),
            layouts: resolve(renderer, 'layouts'),
            lib: resolve(renderer, 'lib'),
            pages: resolve(renderer, 'pages'),
            styles: resolve(renderer, 'styles'),
            utils: resolve(renderer, 'utils'),
        },
    },
    plugins: [
        new WebpackBar({ name: 'renderer', color: '#3873fe' }),
        new FriendlyErrorsPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(PROJECT_ROOT, 'public/index.html'),
            minify: __DEV__ ? false : htmlMinifyOptions,
        }),
        ...(argv.analyze ? [new SizePlugin({ writeFile: false }), new BundleAnalyzerPlugin()] : []),
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: getCSSLoaders(0),
            },
            {
                test: /\.less$/,
                use: [
                    ...getCSSLoaders(1),
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: {
                                '@primary-color': 'rgb(56, 115, 254)',
                            },
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCSSLoaders(1),
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[contenthash].[ext]',
                            outputPath: 'images',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
        ],
    },
};

export default commonConfig;
