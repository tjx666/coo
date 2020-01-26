import { resolve } from 'path';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import detect from 'detect-port';

import devConfig from './configs/webpack.dev';

(async function startDevServer() {
    const HOSTNAME = 'localhost';
    const PORT = 3600;
    const port = await detect(PORT);

    if (PORT !== port) {
        console.log(`port: ${PORT} was occupied, try port: ${port}`);
        process.exit(1);
    }

    const address = `http://${HOSTNAME}:${PORT}`;
    const devServerConfig: WebpackDevServer.Configuration = {
        host: HOSTNAME,
        port: PORT,
        publicPath: devConfig.output!.publicPath,
        contentBase: resolve(__dirname, '../dist'),
        historyApiFallback: true,
        hot: true,
        overlay: true,
        quiet: true,
    };

    WebpackDevServer.addDevServerEntrypoints(devConfig, devServerConfig);
    const compiler = webpack(devConfig);
    const server = new WebpackDevServer(compiler, devServerConfig);

    server.listen(PORT, HOSTNAME, () => {
        const infoPrefix = chalk.bgYellow.black(' INFO ');
        console.log(
            `${infoPrefix} DevServer is running at ${chalk.magenta.bold.underline(address)} ${logSymbols.success}`
        );
    });
    process.on('exit', () => server.close());
})();

process.on('unhandledRejection', err => {
    console.error('You may have promise forgot to catch!');
    console.error(err);
});
