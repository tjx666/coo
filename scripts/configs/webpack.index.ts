import { argv } from 'yargs';
import merge from 'webpack-merge';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import SizePlugin from 'size-plugin';

import { __DEV__ } from '../constants';
import devConfig from './webpack.dev';
import prodConfig from './webpack.prod';

// eslint-disable-next-line import/no-mutable-exports
let webpackConfiguration = __DEV__ ? devConfig : prodConfig;
if (argv.analyze) {
    webpackConfiguration = merge(webpackConfiguration, {
        plugins: [new SizePlugin({ writeFile: false }), new BundleAnalyzerPlugin()],
    });

    if (!__DEV__) {
        const smp = new SpeedMeasurePlugin();
        webpackConfiguration = smp.wrap(webpackConfiguration);
    }
}
export default webpackConfiguration;
