const CommandBase = require('./commandBase');

class EmptyInputCommand extends CommandBase {
    execute () {
        return new Promise((resolve, reject) => {
            this.io.writeline('Hey, write something!');
            resolve();
        });
    }
}

module.exports = EmptyInputCommand;