const _ = require('lodash');
const commands = require('./commands');
const commandsData = require('./commands/commands.json');
const io = require('./io');

class CommandFactory {
    create (input) {
        if (!input) {
            return new commands.EmptyInputCommand(io);
        }

        let cleanInput = input.trim().toLowerCase();

        const commandData = _.find(
            commandsData,
            commandDescription => _.some(commandDescription.respondTo, r => r.toLowerCase() === cleanInput)
        );

        if (!commandData) {
            return new commands.UnknownCommand(io);
        }

        const command = new commands[commandData.command](io);

        if (!commandData) {
            return new commands.UnknownCommand(io);
        }

        return command;
    }

    getHelpCommand() {
        return new commands.HelpCommand(io);
    }
}


module.exports = new CommandFactory();