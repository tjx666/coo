declare module 'speed-measure-webpack-plugin' {
    import { Configuration, Plugin } from 'webpack';

    interface SpeedMeasurePluginOptions {
        disable: boolean;
        outputFormat: 'json' | 'human' | 'humanVerbose' | ((outputObj: object) => void);
        outputTarget: string | ((outputObj: string) => void);
        pluginNames: object;
        granularLoaderData: boolean;
    }

    class SpeedMeasurePlugin extends Plugin {
        constructor(options?: Partial<SpeedMeasurePluginOptions>);
        wrap(webpackConfig: Configuration): Configuration;
    }

    export = SpeedMeasurePlugin;
}

declare module 'size-plugin' {
    import { Plugin } from 'webpack';

    interface SizePluginOptions {
        pattern: string;
        exclude: string;
        filename: string;
        publish: boolean;
        writeFile: boolean;
        stripHash: Function;
    }

    class SizePlugin extends Plugin {
        constructor(options?: Partial<SizePluginOptions>);
    }

    export = SizePlugin;
}

declare module 'antd-dayjs-webpack-plugin' {
    import { Plugin } from 'webpack';

    class WebpackDayjsPlugin extends Plugin {}

    export = WebpackDayjsPlugin;
}

declare module 'thread-loader';
