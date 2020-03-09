import { resolve } from 'path';
import WebpackBar from 'webpackbar';
import { HashedModuleIdsPlugin, Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Options as HtmlMinifierOptions } from 'html-minifier';

import { __DEV__, PROJECT_ROOT } from '../constants';

function getCSSLoaders(importLoaders: number) {
    return [
        __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
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

const renderer = resolve(PROJECT_ROOT, 'src/renderer/');
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
const commonConfig: Configuration = {
    cache: true,
    target: 'electron-renderer',
    context: PROJECT_ROOT,
    entry: ['react-hot-loader/patch', './src/renderer'],
    output: {
        publicPath: '/',
        path: resolve(PROJECT_ROOT, './dist'),
        filename: 'js/[name].js',
    },
    watchOptions: {
        ignored: [/node_modules/, /dist/, /out/, /test/, /src\/main/],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            'normalize.css$': resolve(PROJECT_ROOT, './node_modules/normalize.css/normalize.css'),
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(PROJECT_ROOT, 'public/index.html'),
            minify: __DEV__ ? false : htmlMinifyOptions,
        }),
        new WebpackBar({
            name: 'renderer',
            color: '#3873fe',
        }),
        new FriendlyErrorsPlugin(),
        new HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20,
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: PROJECT_ROOT,
        }),
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
                            modifyVars: { '@primary-color': 'rgb(56, 115, 254)' },
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
