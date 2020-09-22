var pjson = require('./package.json'),
  d2builder = require('./lib/d2builder.js'),
  program = require('commander');

program
  .version(pjson.version)
  .usage('-s <path> -o <path>')
  .option('-s, --src <path>', 'directory path')
  .option('-o, --output <path>', 'output path')
  .parse(process.argv);

if (!program.output || !program.src) {
  program.outputHelp();
}

d2builder(program.src, program.output);