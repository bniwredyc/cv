const chalk = require('chalk');
const fs = require('fs');
const CommandBase = require('./commandBase');
const commandsData = require('../commands/commands.json');

function getHelpItem (commandDescription) {
    const caption = commandDescription.caption;

    let hotkeyIndex = 0;

    if (commandDescription.hotkeyIndex) {
        hotkeyIndex = commandDescription.hotkeyIndex;
    }

    let part1 = caption.substr(0, hotkeyIndex);
    let part2 = caption.substr(hotkeyIndex, 1);
    let part3 = caption.substr(hotkeyIndex + 1, caption.length - 1);

    part2 = chalk.bold.underline(part2);

    return part1 + part2 + part3 + chalk.reset('');
}

class HelpCommand extends CommandBase {
    execute () {
        return new Promise((resolve, reject) => {
            const helpItems = [
                chalk.bold('Available commands:') + chalk.reset('')
            ];

            commandsData.forEach(commandDescription => {
                if (commandDescription.system) {
                    return;
                }

                if (commandDescription.divider) {
                    helpItems.push('');
                    return;
                }
                const helpItem = getHelpItem(commandDescription);
                helpItems.push(helpItem);
            });

            this.io.writeline(helpItems.join('\n'));

            resolve();
        });
    }
}

module.exports = HelpCommand;