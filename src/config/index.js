const fs = require('fs');
const path = require('path');

const combineConfig = {};
const files = fs.readdirSync(__dirname);
for (let file of files) {
    if (file === 'index.js') {
        continue;
    }
    const contents = require(`./${file}`);
    const key = file.replace('.js', '');
    combineConfig[key] = { ...contents };
}

module.exports = {
    port: process.env.PORT || 1984,
    ...combineConfig,
};
