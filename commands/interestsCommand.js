const CommandBase = require('./commandBase');
const fs = require('fs');

class InterestsCommand extends CommandBase {
    execute () {
        return new Promise((resolve, reject) => {
            const text = fs.readFileSync('data/interests.tpl', 'utf-8');
            this.io.writeline(text);
            resolve();
        });
    }
}

module.exports = InterestsCommand;