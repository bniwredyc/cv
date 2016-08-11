const Color = require('color');
const gg = require('gradient-generator');
const pjson = require('./package.json');
const fs = require('fs');
const _ = require('lodash');
const colors = require('ansi-256-colors');
const chalk = require('chalk');

/*

 Pantone colors of the year 2016

 #F2DDDE - Rose Quartz
 #89ABE3 - Serenity

 Glob forgive me for what I'm doing with them below.

 */

function convertToConsoleColor (value) {
    return Math.round(value * 5 / 255);
}

let result = [];

const logo = fs.readFileSync('ascii/logo.ascii', 'utf-8');

const serenity = Color('#89ABE3');
const roseQuartz = Color('#F2DDDE');

const logoLines = logo.split('\n');

const step = _.maxBy(logoLines, line => line.length).length;

const gradientIterator = gg.getGradientIterator(roseQuartz.hexString(), serenity.hexString(), step);

const gradient = [];

_.times(step, () => {
    let gradientColor = Color(gradientIterator());

    gradient.push({
        red: convertToConsoleColor(gradientColor.red()),
        green: convertToConsoleColor(gradientColor.green()),
        blue: convertToConsoleColor(gradientColor.blue())
    });
});

_.each(logoLines, line => {
    let colorfulLine = '';

    for (let i = 0; i < line.length; i++) {
        let gradientColor = gradient[i];
        colorfulLine += colors.fg.getRgb(gradientColor.red, gradientColor.green, gradientColor.blue) + line[i];
    }

    result.push(colorfulLine);
});

result.push('');
result.push(`Igor Lobanov\'s CV v${pjson.version}`);

module.exports = result.join('\r\n');

