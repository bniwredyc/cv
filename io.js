const _ = require('lodash');
const readline = require('readline');
const deferred = require('deferred');

class IO {
    constructor () {
        this.readlineDeferred = null;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.rl.on('line', line => {
            if (!this.readlineDeferred) {
                return;
            }

            this.readlineDeferred.resolve(line);
            this.readlineDeferred = null;
        });
    }

    setPrompt (prompt) {
        this.rl.setPrompt(prompt);
    }

    readline () {
        this.readlineDeferred = deferred();
        this.rl.prompt();
        return this.readlineDeferred.promise;
    }

    close () {
        this.rl.close();
    }

    addCloseHandler (handler) {
        this.rl.on('close', handler);
    }

    writeline (str) {
        console.log(_.isUndefined(str) ? '' : str);
    }
}

module.exports = new IO();