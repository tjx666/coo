import webpack from 'webpack';
import { argv } from 'yargs';

import dllConfig from './configs/webpack.dll';
import prodConfig from './configs/webpack.prod';

const compiler = webpack(argv.dll ? dllConfig : prodConfig);
compiler.run((error, stats) => {
    if (error) {
        console.error(error);
        return;
    }

    const prodStatsOpts = {
        preset: 'normal',
        colors: true,
    };

    console.log(stats.toString(prodStatsOpts));
});
