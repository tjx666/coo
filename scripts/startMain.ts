import { command } from 'execa';
import chalk from 'chalk';
import { argv } from 'yargs';

async function startMain() {
    const prefix = chalk.bgRed.black(' NODEMON ');

    console.log(`${prefix} Compiling main...`);
    await command('npx tsc -p ./src/main');

    console.log(
        `${prefix} Starting main in ${chalk.yellow('development')} mode...`
    );
    await command(`npx cross-env NODE_ENV=development electron ${argv._}`);
}

startMain();
