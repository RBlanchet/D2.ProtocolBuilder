var glob = require('glob'),
  path = require('path'),
  fs = require('fs-extra'),
  beautify = require('js-beautify').js_beautify,
  map = require('./map.js');
var data = '',files = [];

var defaultStrategy = require('./strategies/js-strategy.js');

const depencies = (file) => {
    var parent;
    if(file.parent && (parent = map.find('name', file.parent)) && !files.includes(parent.file) ) {
        depencies(parent);
        var content = fs.readFileSync(parent.file).toString();
        data += '\n' + content;
        files.push(parent.file);
    }
};

module.exports = function(src, output, strategy) {
    strategy = strategy || defaultStrategy;

    files = glob.sync(path.join(src, '*.js'));
    files.forEach( (file, index) => {
        if (index !== 0) {
            data += '\n';
        }
        data += fs.readFileSync(file).toString();
    })

    const maps = map.load(src);

    maps.forEach( (row) => {
        depencies(row);
        var content = fs.readFileSync(row.file).toString();
        if(!files.includes(row.file)) {
            data += '\n' + content;
            files.push(row.file);
        }
    })

    data = beautify(strategy.build(data));
    fs.outputFileSync(output, data);
}
