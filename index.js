var pjson = require('./package.json'),
  d2builder = require('./lib/d2builder.js'),
  program = require('commander'),
  jpxes = require('./lib/jpexs.js'),
  compiler = require('./lib/compiler.js'),
  constants = require('./lib/constants.js'),
  path = require('path');

  program
  .version(pjson.version)
  .usage('-c <command>')
  .option('-c, --command <command>', 'command name to execute')
  .parse(process.argv);

if (!program.command) {
  program.outputHelp();
}

switch(program.command) {
  case 'extract' :
      jpxes(constants.jpexs.output, constants.jpexs.file, constants.jpexs.classname);
    break;
  case 'build' :
      d2builder(path.join(__dirname,constants.jpexs.output), path.join(__dirname, constants.build.output));
    break;
  case 'compile' :
      compiler(path.join(__dirname, constants.build.output), path.join(__dirname, constants.build.file))
    break;
}
