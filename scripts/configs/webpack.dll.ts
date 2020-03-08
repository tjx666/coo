import { resolve } from 'path';
import webpack, { Configuration } from 'webpack';

import { PROJECT_ROOT } from '../constants';

const outputPath = resolve(PROJECT_ROOT, 'public/vendor');
const dllConfig: Configuration = {
    mode: 'development',
    context: PROJECT_ROOT,
    entry: {
        vendors: [
            'faker',
            '@hot-loader/react-dom',
            'ajv',
            'uri-js',
            '@reduxjs/toolkit',
            'axios',
            'dayjs',
            'tinycolor2',
            'react',
            'react-router',
            'react-router-dom',
            'classnames',
            'react-redux',
            'react-use',
            'redux-thunk',
        ],
    },
    output: {
        path: outputPath,
        filename: `[name].dll.js`,
        library: '[name]_dll',
    },
    plugins: [
        new webpack.DllPlugin({
            path: resolve(outputPath, '[name]-manifest.json'),
            name: '[name]_dll',
        }),
    ],
};

export default dllConfig;
