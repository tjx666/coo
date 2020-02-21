import { resolve } from 'path';
import WebpackBar from 'webpackbar';
import { HashedModuleIdsPlugin, BannerPlugin, Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

const projectRoot = resolve(__dirname, '../../');
const renderer = resolve(projectRoot, 'src/renderer/');

function getCSSLoaders(importLoaders: number) {
    return [
        process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                importLoaders,
            },
        },
    ];
}

const commonConfig: Configuration = {
    cache: true,
    target: 'electron-renderer',
    context: projectRoot,
    entry: ['react-hot-loader/patch', './src/renderer'],
    output: {
        publicPath: '/',
        path: resolve(projectRoot, './dist'),
        filename: 'js/[name].js',
    },
    watchOptions: {
        ignored: [/node_modules/, /dist/, /out/, /test/, /src\/main/],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.json', '.js'],
        alias: {
            'normalize.css$': resolve(projectRoot, './node_modules/normalize.css/normalize.css'),
            'react-dom': '@hot-loader/react-dom',
            assets: resolve(renderer, 'assets/'),
            styles: resolve(renderer, 'styles'),
            lib: resolve(renderer, 'lib'),
            utils: resolve(renderer, 'utils'),
            pages: resolve(renderer, 'pages'),
            layouts: resolve(renderer, 'layouts'),
            components: resolve(renderer, 'components'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'coo',
            template: resolve(projectRoot, 'public/index.html'),
            inject: 'body',
            cache: true,
        }),
        new BannerPlugin({
            banner: `/** @preserve This coo project is develop by YuTengjing under MIT license */`,
            raw: true,
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
        new CaseSensitivePathsPlugin(),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: projectRoot,
        }),
        new HardSourceWebpackPlugin({
            info: { mode: 'none', level: 'error' },
        }),
        new AntdDayjsWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
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
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
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
