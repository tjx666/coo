import { resolve } from 'path';
import { Configuration, HashedModuleIdsPlugin, DefinePlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

const projectRoot = resolve(__dirname, '../../');

function getCSSLoaders(importLoaders: number) {
    return [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                importLoaders,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: [autoprefixer()],
            },
        },
    ];
}

const commonConfig: Configuration = {
    target: 'electron-renderer',
    context: projectRoot,
    entry: './src/renderer/index.tsx',
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
            'normalize.css': resolve(
                projectRoot,
                './node_modules/normalize.css/normalize.css'
            ),
        },
    },
    plugins: [
        new AntdDayjsWebpackPlugin(),
        new FriendlyErrorsPlugin(),
        new HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20,
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'coo',
            template: resolve(projectRoot, 'public/index.html'),
            inject: 'body',
            cache: true,
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
        }),
        new DefinePlugin({
            __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
        }),
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
                use: getCSSLoaders(1),
            },
            {
                test: /\.less$/,
                use: [
                    ...getCSSLoaders(2),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true,
                            modifyVars: { '@primary-color': '#1DA57A' },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCSSLoaders(2),
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader',
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                        },
                    },
                ],
            },
        ],
    },
};

export default commonConfig;
