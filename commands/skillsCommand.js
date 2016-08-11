const CommandBase = require('./commandBase');
const fs = require('fs');

class SkillsCommand extends CommandBase {
    execute () {
        return new Promise((resolve, reject) => {
            const text = fs.readFileSync('data/skills.tpl', 'utf-8');
            this.io.writeline(text);
            resolve();
        });
    }
}

module.exports = SkillsCommand;