'use strict';

const chalk = require('chalk');
const _ = require('lodash');
const io = require('./io');
const config = require('./config/config');
const commandFactory = require('./commandFactory');
const welcome = require('./welcome');

function handleInput(line) {
    let command = commandFactory.create(line);
    command.execute().then(() => {
        io.readline().then(handleInput);
    });
}

io.addCloseHandler(() => {
    io.writeline('\nSo long, and thanks for all the fish!');
    io.writeline('Source code of this thing: ' + chalk.underline(config.repositoryUrl));
    process.exit(0);
});

io.setPrompt('> ');

io.writeline(welcome);
io.writeline();

commandFactory.getHelpCommand().execute().then(() => {
    io.writeline();
    io.writeline('What do you want to know?');
    io.readline().then(handleInput)
});