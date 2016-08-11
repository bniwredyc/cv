const CommandBase = require('./commandBase');
const fs = require('fs');

class ContactsCommand extends CommandBase {
    execute () {
        return new Promise((resolve, reject) => {
            const text = fs.readFileSync('data/contacts.tpl', 'utf-8');
            this.io.writeline(text)
            resolve();
        });
    }
}

module.exports = ContactsCommand;