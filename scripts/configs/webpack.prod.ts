import merge from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import SizePlugin from 'size-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import commonConfig from './webpack.common';

const mergedConfig = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new ProgressBarPlugin(),
        new ForkTsCheckerWebpackPlugin({ memoryLimit: 2048 }),
        new SizePlugin(),
        new HardSourceWebpackPlugin({
            info: { mode: 'none', level: 'error' },
        }),
        new BundleAnalyzerPlugin({ openAnalyzer: true }),
    ],
});

const smp = new SpeedMeasurePlugin();
const prodConfig = smp.wrap(mergedConfig);

export default prodConfig;
