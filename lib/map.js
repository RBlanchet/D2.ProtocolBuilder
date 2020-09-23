const fs = require('fs-extra'), constants = require('./constants.js');
var data = [];

module.exports = {
    save: (path) => fs.outputFile(path + '/' + constants.build.map, JSON.stringify(data, null, 2)),
    add : (file, name, parent) => data.push({file, name, parent}),
    load: (path) => data = JSON.parse(fs.readFileSync(path + '/' + constants.build.map)),
    find: (property, value) => data.find( row => row[property] === value)
}