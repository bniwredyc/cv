const _ = require('lodash');
const commands = require('./commands');
const commandsData = require('./commands/commands.json');

class CommandFactory {
    constructor(io) {
        this.io = io;
    }

    create (input) {
        if (!input) {
            return new commands.EmptyInputCommand(this.io);
        }

        let cleanInput = input.trim().toLowerCase();

        const commandData = _.find(
            commandsData,
            commandDescription => _.some(commandDescription.respondTo, r => r.toLowerCase() === cleanInput)
        );

        if (!commandData) {
            return new commands.UnknownCommand(this.io);
        }

        const command = new commands[commandData.command](this.io);

        if (!commandData) {
            return new commands.UnknownCommand(this.io);
        }

        return command;
    }

    getHelpCommand() {
        return new commands.HelpCommand(this.io);
    }
}


module.exports = CommandFactory;