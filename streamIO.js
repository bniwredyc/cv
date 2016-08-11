const _ = require('lodash');
const readline = require('readline');
const deferred = require('deferred');

class StreamIO {
    constructor (stream) {
        this.readlineDeferred = null;
        this.stream = stream;
        this.rl = readline.createInterface({
            input: this.stream,
            output: this.stream
        });

        this.rl.on('line', line => {
            if (!this.readlineDeferred) {
                return;
            }

            this.stream.write('\r\n');
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
        const line = `${_.isUndefined(str) ? '' : str}\r\n`;
        this.stream.write(line);
    }
}

module.exports = StreamIO;