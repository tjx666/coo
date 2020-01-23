const envPreset = [
    '@babel/preset-env',
    {
        useBuiltIns: 'usage',
        targets: {
            // eslint-disable-next-line global-require
            electron: require('electron/package.json').version,
        },
        corejs: 3,
    },
];

const importPlugin = [
    'import',
    {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    },
];

module.exports = api => {
    api.cache(true);

    return {
        presets: ['@babel/preset-typescript', envPreset],
        plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-optional-chaining', importPlugin],
        env: {
            development: {
                presets: [['@babel/preset-react', { development: true }]],
                plugins: ['react-hot-loader/babel'],
            },
            production: {
                presets: ['@babel/preset-react'],
                plugins: [
                    'babel-plugin-dev-expression',
                    '@babel/plugin-transform-react-constant-elements',
                    '@babel/plugin-transform-react-inline-elements',
                ],
            },
        },
        sourceMaps: true,
        retainLines: true,
    };
};
