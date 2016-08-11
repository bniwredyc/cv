const ConsoleIO = require('../consoleIO');
const Shell = require('../shell');

const consoleIO = new ConsoleIO();

const shell = new Shell(consoleIO);
shell.run().then(() => process.exit(0));