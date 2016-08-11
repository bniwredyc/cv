const CommandBase = require('./commandBase');
const chalk = require('chalk');

class UnknownCommand extends CommandBase {
    execute () {
        return new Promise((resolve, reject) => {
            const message = `WUT? Please type a valid command or ${chalk.bold.underline('H')}elp for the command list`;
            this.io.writeline(message);
            resolve();
        });
    }
}

module.exports = UnknownCommand;