var glob = require('glob'),
    asReader = require('./as-reader.js'),
    constants = require('./constants.js'),
    path = require('path'),
    fs = require('fs-extra'),
    beautify = require('js-beautify').js_beautify;

var defaultStrategy = require('./strategies/js-strategy.js');

module.exports = function (src, output, strategy) {
  strategy = strategy || defaultStrategy;
  if(!strategy.enumConverter){
    throw new Error('EnumConverter not implemented in strategy');
  }
  if(!strategy.messageConverter){
    throw new Error('messageConverter not implemented in strategy');
  }
  if(!strategy.typeConverter){
    throw new Error('typeConverter not implemented in strategy');
  }
  
  convert(strategy.enumConverter, path.join(src, constants.src.metadata), path.join(output, constants.output.metadata));
  convert(strategy.enumConverter, path.join(src, constants.src.protocolConstants), path.join(output, constants.output.protocolConstants));
  convert(strategy.enumConverter, path.join(src, constants.src.metadata), path.join(output, constants.output.metadata));
  convertAll(strategy.enumConverter, path.join(src, constants.src.enum), path.join(output, constants.output.enum), strategy.ext)
  .catch()
  convertAll(strategy.typeConverter, path.join(src, constants.src.type), path.join(output, constants.output.type), strategy.ext)
  .catch()
  convertAll(strategy.messageConverter, path.join(src, constants.src.message), path.join(output, constants.output.message), strategy.ext)
  .then( list => build(strategy.messageReceiverConverter, list, path.join(src, constants.src.messageReceiver), path.join(output, constants.output.messageReceiver)) )
  .catch( err => console.error(err))
  fs.copySync(path.join(__dirname, constants.src.protocolTypeManager), path.join(output, constants.output.protocolTypeManager));
  fs.copySync(path.join(__dirname, constants.src.enumManager), path.join(output, constants.output.enumManager));
  return this;
};

function build(converter, list, filename, output) {
  var data = beautify(converter(list));
  var pathResolved = output.replace(path.basename(filename, '.as'), defaultStrategy.resolveFilename(filename));
  fs.outputFile(pathResolved, data, { indent_size: 2 }, function (err) {
    if(err){
      throw err;
    }
  });
}

function convert(converter, filename, output) {
  var asClass = asReader(filename);
  var data = beautify(converter(asClass));
  var pathResolved = output.replace(path.basename(filename, '.as'), defaultStrategy.resolveFilename(filename));
  fs.outputFile(pathResolved, data, { indent_size: 2 }, function (err) {
    if(err){
      throw err;
    }
  });
  return asClass;
};

function convertAll(converter, src, output, ext) {
  return new Promise( (resolve, reject) => {
    glob(path.join(src, '**/*.as'), ( err, files ) => {
      var asClassList = [];
      files.forEach( (file) => {
        var o = output + file.replace(src.split('\\').join('/'), '').replace('.as', '.' + ext);
        asClassList.push(convert(converter, file, o));
      });
      resolve(asClassList);
    });
  });
};