import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import devConfig from './configs/webpack.dev';

const compiler = webpack(devConfig);

const devServerOptions: WebpackDevServer.Configuration = {
    quiet: true,
};

const server = new WebpackDevServer(compiler, devServerOptions);
const HOSTNAME = 'localhost';
const PORT = 1027;
const address = `http://${HOSTNAME}:${PORT}`;

server.listen(PORT, HOSTNAME, () => {
    // prettier-ignore
    console.log(`${chalk.bgYellow.black.bold(' INFO ')} DevServer is running at ${chalk.magenta.bold.underline(address)} ${logSymbols.success}`);
});

process.on('unhandledRejection', err => {
    console.error('You may have promise forgot to catch!');
    console.error(err);
});
