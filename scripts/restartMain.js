const chalk = require('chalk');

(function restart() {
    const prefix = chalk.bgRed.black(' NODEMON ');
    console.log(`${prefix} ready to recompile and restart main`);
})();