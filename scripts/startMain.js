const chalk = require('chalk');
const { command } = require('execa');
const { argv } = require('yargs');

const prefix = chalk.bgRed.black(' NODEMON ');

(async function startMain() {
    console.log(`${prefix} Compiling main...`);
    await command('npx tsc -p ./src/main');

    console.log(`${prefix} Starting main in ${chalk.yellow('development')} mode...`);
    await command(`npx cross-env NODE_ENV=development electron ${argv._}`);
})();
