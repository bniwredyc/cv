'use strict';

const chalk = require('chalk');
const _ = require('lodash');
const deferred = require('deferred');
const config = require('./config/config');
const CommandFactory = require('./commandFactory');
const welcome = require('./welcome');

class Shell {
    constructor(io) {
        this.io = io;
        this.commandFactory = new CommandFactory(this.io);

        this.io.addCloseHandler(() => {
            this.io.writeline('\r\nSo long, and thanks for all the fish!');
            this.io.writeline('Source code of this thing: ' + chalk.underline(config.repositoryUrl));

            if (this.runDeferred) {
                this.runDeferred.resolve();
            }
        });

        this.io.setPrompt('> ');
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(line) {
        let command = this.commandFactory.create(line);
        command.execute().then(() => {
            this.io.readline().then(this.handleInput);
        });
    }

    run() {
        this.io.writeline(welcome);
        this.io.writeline();
        this.runDeferred = deferred();

        const helpCommand = this.commandFactory.getHelpCommand();

        helpCommand.execute().then(() => {
            this.io.writeline();
            this.io.writeline('What do you want to know?');
            this.io.readline().then(this.handleInput)
        });

        return this.runDeferred.promise;
    }
}

module.exports = Shell;