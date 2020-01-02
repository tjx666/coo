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
const PORT = 3600;
const address = `http://${HOSTNAME}:${PORT}`;

server.listen(PORT, HOSTNAME, () => {
    // prettier-ignore
    console.log(`${chalk.bgYellow.black.bold(' INFO ')} DevServer is running at ${chalk.magenta.bold.underline(address)} ${logSymbols.success}`);
});

process.on('SIGINT', () => {
    console.log(
        chalk.greenBright.bold(
            `\n${Math.random() > 0.5 ? 'See you again' : 'Goodbye'}!`
        )
    );
    process.exit();
});

process.on('unhandledRejection', err => {
    console.error('You may have promise forgot to catch!');
    console.error(err);
});
