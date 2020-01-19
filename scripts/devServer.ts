import { resolve } from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import logSymbols from 'log-symbols';

import devConfig from './configs/webpack.dev';

const HOSTNAME = 'localhost';
const PORT = 3600;
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
    console.log(
        // prettier-ignore
        `${chalk.bgYellow.black(' INFO ')} DevServer is running at ${chalk.magenta.bold.underline(address)} ${logSymbols.success}`
    );
});

process.on('exit', () => {
    console.log(chalk.greenBright.bold(`\n${Math.random() > 0.5 ? 'See you again' : 'Goodbye'}!`));
    process.exit();
});

process.on('unhandledRejection', err => {
    console.error('You may have promise forgot to catch!');
    console.error(err);
});
