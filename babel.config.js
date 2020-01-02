module.exports = function(api) {
    api.cache(true);

    const babelEnvPreset = [
        "@babel/env",
        {
            "targets": {
                "browsers": [
                    "last 2 version",
                    "Firefox ESR",
                    "> 1%",
                    "ie >= 9"
                ]
            },
            "useBuiltIns": "usage",
            "corejs": 3
        }
    ]

    const presets = ['@babel/preset-typescript', "@babel/preset-react", babelEnvPreset];
    const plugins = ['@babel/plugin-transform-runtime'];

    return {
        presets,
        plugins,
        sourceMaps: true,
        retainLines: true,
    };
};