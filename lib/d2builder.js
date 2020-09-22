var glob = require('glob'),
  asReader = require('./as-reader.js'),
  constants = require('./constants.js'),
  path = require('path'),
  fs = require('fs-extra'),
  beautify = require('js-beautify').js_beautify;

var defaultStrategy = require('./strategies/js-strategy.js');
var file = '';

module.exports = function (src, output, strategy, files = false) {
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
    .catch(err => console.error(err))
  convertAll(strategy.typeConverter, path.join(src, constants.src.type), path.join(output, constants.output.type), strategy.ext)
    .then(list => build(strategy.typeReceiverConverter, list, path.join(src, constants.src.protocolTypeManager), path.join(output, constants.output.protocolTypeManager)))
    .catch(err => console.error(err))
  convertAll(strategy.messageConverter, path.join(src, constants.src.message), path.join(output, constants.output.message), strategy.ext)
    .then(list => build(strategy.messageReceiverConverter, list, path.join(src, constants.src.messageReceiver), path.join(output, constants.output.messageReceiver)))
    .catch(err => console.error(err))

  return this;
};

module.exports.merge = function (src, output, strategy) {

  glob(path.join(src, '**/*.js'), (err, files) => {

    strategy = strategy || defaultStrategy;
    var data = '';
    for (var i = 0; i < files.length; i++) {
      if (i !== 0) {
        data += '\n';
      }
      data += fs.readFileSync(files[i]).toString();
    }
    data = beautify(strategy.build(data));
    if (fs.existsSync(output)) {
      fs.unlinkSync(output);
    }
    fs.writeFileSync(output, data);
  });
}

function append(data) {
  file += '\n' + data;
}

function copy(strategy, src, output) {
  var data = strategy(src);
  fs.outputFile(output, data, {
    indent_size: 2
  }, function (err) {
    if (err) {
      throw err;
    }
  });
}

function build(converter, list, filename, output) {
  var data = beautify(converter(list));
  var pathResolved = output.replace(path.basename(filename, '.as'), defaultStrategy.resolveFilename(filename));
  fs.outputFile(pathResolved, data, {
    indent_size: 2
  }, function (err) {
    if (err) {
      throw err;
    }
  });
}

function convert(converter, filename, output) {
  var asClass = asReader(filename);
  var data = beautify(converter(asClass));
  var pathResolved = output.replace(path.basename(filename, '.as'), defaultStrategy.resolveFilename(filename));
  fs.outputFile(pathResolved, data, {
    indent_size: 2
  }, function (err) {
    if (err) {
      throw err;
    }
  });
  return asClass;
};

function convertAll(converter, src, output, ext) {
  return new Promise((resolve, reject) => {
    glob(path.join(src, '**/*.as'), (err, files) => {
      var asClassList = [];
      files.forEach((file) => {
        var o = output + file.replace(src.split('\\').join('/'), '').replace('.as', '.' + ext);
        asClassList.push(convert(converter, file, o));
      });
      resolve(asClassList);
    });
  });
};

function merge() {
  glob(path.join(src, '**/*.as'), (err, files) => {
    var asClassList = [];
    files.forEach((file) => {
      var o = output + file.replace(src.split('\\').join('/'), '').replace('.as', '.' + ext);
      asClassList.push(convert(converter, file, o));
    });
    resolve(asClassList);
  });
}