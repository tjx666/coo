import { argv } from 'yargs';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

import { __DEV__ } from '../constants';
import devConfig from './webpack.dev';
import prodConfig from './webpack.prod';

// eslint-disable-next-line import/no-mutable-exports
let webpackConfiguration = __DEV__ ? devConfig : prodConfig;
if (argv.analyze) {
    const smp = new SpeedMeasurePlugin();
    webpackConfiguration = smp.wrap(webpackConfiguration);
}

export default webpackConfiguration;
