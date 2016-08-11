const fs = require('fs');
const crypto = require('crypto');
const ssh2 = require('ssh2');
const StreamIO = require('../streamIO');
const Shell = require('../shell');

const config = require('../config/config');

new ssh2.Server({
    hostKeys: [fs.readFileSync('private.key')]
}, client => {
    console.log('Client connected!');

    client
        .on('authentication', ctx => ctx.accept())
        .on('ready', () => {
            console.log('Client authenticated!');

            client.on('session', (accept, reject) => {
                var session = accept();

                session.on('pty', (accept, reject, info) => {
                    accept();
                });

                session.on('shell', (accept, reject) => {
                    const stream = accept();
                    stream.setEncoding = 'utf8';
                    stream.pipe(stream);

                    const streamIO = new StreamIO(stream);
                    const shell = new Shell(streamIO);
                    shell.run().then(() => {
                        stream.exit(0);
                        stream.end();
                    });
                });

                session.on('error', () => console.log('error'));
            });
        })
        .on('end', () => console.log('Client disconnected'));
}).listen(config.port, '0.0.0.0', function () {
    console.log('Listening on port ' + this.address().port);
});