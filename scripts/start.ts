import { resolve } from 'path';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getPort from 'get-port';

import devConfig from './configs/webpack.index';

(async function startDevServer() {
    const host = '127.0.0.1';
    const port = await getPort({ host, port: 3000 });
    if (port !== 3000) {
        console.log(`port: ${port} was occupied, please kill that application first!`);
        process.exit(1);
    }

    const address = `http://${host}:${port}`;
    const devServerConfig: WebpackDevServer.Configuration = {
        host,
        port,
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

    server.listen(port, host, () => {
        console.log(
            `DevServer is running at ${chalk.magenta.underline(address)} ${logSymbols.success}`,
        );
    });

    process.on('exit', () => server.close());
})();
