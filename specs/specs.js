'use strict';

const assert = require('assert');
const _ = require('lodash');
const commandsData = require('../commands/commands.json');
const commandFactory = require('../commandFactory');
const commands = require('../commands');

const fakeIO = {
    writeline: _.noop,
    close: _.noop
};

describe('Commands', () => {

    _.each(commands, Command => {
        const command = new Command(fakeIO);
        it(`should execute ${command.constructor.name} without errors`, done => {
            command.execute().then(done).catch(done);
        });
    });
});

describe('CommandFactory', () => {
    _.each(commandsData, commandDescription => {
        it(`should be able to create ${commandDescription.command}`, () => {
            _.each(commandDescription.respondTo, response => {
                const command = commandFactory.create(response);
                assert(command);
            })
        });
    });

    it('should return command for empty input', () => {
        assert(commandFactory.create('').execute);
    });

    it('should return command for unknown input', () => {
        assert(commandFactory.create('and now something completely different').execute);
    });
});