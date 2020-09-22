var pjson = require('./package.json'),
    d2builder = require('./lib/d2builder.js'),
    program = require('commander');

program
    .version(pjson.version)
    .usage('-s <path> -o <path>')
    .option('-s, --src <path>', 'directory path')
    .option('-o, --output <file>', 'output file')
    .parse(process.argv);

if (!program.output || !program.src) {
    program.outputHelp();
}

d2builder.merge(program.src, program.output);