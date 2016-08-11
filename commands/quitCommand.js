const CommandBase = require('./commandBase');

class QuitCommand extends CommandBase {
    execute () {
        return new Promise((resolve, reject) => {
            this.io.close();
            resolve();
        })
    }
}

module.exports = QuitCommand;