var glob = require('glob'),
  asReader = require('./as-reader.js'),
  constants = require('./constants.js'),
  path = require('path'),
  fs = require('fs-extra'),
  beautify = require('js-beautify').js_beautify,
  map = require('./map.js');

var defaultStrategy = require('./strategies/js-strategy.js');

module.exports = function (src, output, strategy) {
  strategy = strategy || defaultStrategy;

  if (!strategy.enumConverter) {
    throw new Error('EnumConverter not implemented in strategy');
  }
  if (!strategy.messageConverter) {
    throw new Error('messageConverter not implemented in strategy');
  }
  if (!strategy.typeConverter) {
    throw new Error('typeConverter not implemented in strategy');
  }

  copy(strategy.staticFileConverter, constants.src.binary64, path.join(output, constants.output.binary64));
  copy(strategy.staticFileConverter, constants.src.booleanByteWrapper, path.join(output, constants.output.booleanByteWrapper));
  copy(strategy.staticFileConverter, constants.src.customDataWrapper, path.join(output, constants.output.customDataWrapper));
  copy(strategy.staticFileConverter, constants.src.int64, path.join(output, constants.output.int64));
  copy(strategy.staticFileConverter, constants.src.networkMessage, path.join(output, constants.output.networkMessage));
  copy(strategy.staticFileConverter, constants.src.uint64, path.join(output, constants.output.uint64));

  convert(strategy.enumConverter, path.join(src, constants.src.metadata), path.join(output, constants.output.metadata));
  convert(strategy.enumConverter, path.join(src, constants.src.protocolConstants), path.join(output, constants.output.protocolConstants));

  convertAll(strategy.enumConverter, path.join(src, constants.src.enum), path.join(output, constants.output.enum), strategy.ext)

  var asClassTypes = convertAll(strategy.typeConverter, path.join(src, constants.src.type), path.join(output, constants.output.type), strategy.ext)
  build(strategy.typeReceiverConverter, asClassTypes, path.join(src, constants.src.protocolTypeManager), path.join(output, constants.output.protocolTypeManager));
  
  var asClassMessages = convertAll(strategy.messageConverter, path.join(src, constants.src.message), path.join(output, constants.output.message), strategy.ext)
  build(strategy.messageReceiverConverter, asClassMessages, path.join(src, constants.src.messageReceiver), path.join(output, constants.output.messageReceiver))

  map.save(output);

  return this;
};

function copy(strategy, src, output) {
  var data = strategy(src);
  fs.outputFileSync(output, data, { indent_size: 2 });
}

function build(converter, list, filename, output) {
  var data = beautify(converter(list));
  var pathResolved = output.replace(path.basename(filename, '.as'), defaultStrategy.resolveFilename(filename));
  fs.outputFileSync(pathResolved, data, { indent_size: 2 });
}

function convert(converter, filename, output) {
  var asClass = asReader(filename);
  var data = beautify(converter(asClass));
  var pathResolved = output.replace(path.basename(filename, '.as'), defaultStrategy.resolveFilename(filename));
  map.add(pathResolved, asClass.class, asClass.super);
  fs.outputFileSync(pathResolved, data, { indent_size: 2 });
  return asClass;
};

function convertAll(converter, src, output, ext) {
  var asClassList = [];
  var files = glob.sync(path.join(src, '**/*.as'));
  files.forEach((file) => {
    var o = output + file.replace(src.split('\\').join('/'), '').replace('.as', '.' + ext);
    asClassList.push(convert(converter, file, o));
  });
  return asClassList;
};
