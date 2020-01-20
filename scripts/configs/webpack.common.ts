import { resolve } from 'path';
import { argv } from 'yargs';
import { command } from 'execa';

import { Configuration, HashedModuleIdsPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

const projectRoot = resolve(__dirname, '../../');
const renderer = resolve(projectRoot, 'src/renderer/');

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
            pages: resolve(renderer, 'pages'),
            components: resolve(renderer, 'components'),
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
                            modifyVars: { '@primary-color': 'rgb(65, 184, 131)' },
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

if (argv.devtools) {
    (commonConfig.entry as string[]).unshift('react-devtools');
    command('npx react-devtools').catch(err => {
        console.error('Startup react-devtools occur error');
        console.error(err);
    });
}

export default commonConfig;
