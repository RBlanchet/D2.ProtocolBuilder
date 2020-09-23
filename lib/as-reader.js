var fs = require('fs-extra'),
    _ = require('underscore');
var AsReader = function (filename) {
  var data = fs.readFileSync(filename).toString();
  var asClass = {};
  var info = getClassInfo(data);
  if(info.class){
    asClass.class = info.class;
  }
  if(info.super){
    asClass.super = info.super;
  }
  if(info.interface){
    asClass.interface = info.interface;
  }
  asClass.imports = getImports(data);
  var ns;
  if((ns = getNamespace(data)))
  {
    asClass.namespace = ns;
  }
  asClass.properties = getProperties(data);
  asClass.constants = getConstants(data);
  asClass.functions = getFunctions(data);
  return asClass;
};

module.exports = AsReader;

function getClassInfo (data) {
  var loc = data.match(/public class [\w| ]+/g) || [];
  var result = loc ? loc[0].split(' ') : [];
  var info = {};
  
  for(var i = 0; i < result.length; i++){
    switch(result[i]) {
      case 'class':
        info.class = result[i + 1];
        break;
      case 'extends':
        info.super = result[i + 1];
        break;
      case 'implements':
        info.interface = result[i + 1];
        break;
    }
  }
  
  return info;
}

function getNamespace (data) {
  var result = data.match(/package [\w|.]+/g);
  return result ? result[0].replace('package ', '') : undefined;
}

function getImports (data) {
  var result = data.match(/import [\w|.]+;/g) || [];
  return result.map(function (e) {
    var loc = e.replace('import ', '').replace(';', '').split('.');
    return {
      class: _.last(loc),
      namespace: _.without(loc, _.last(loc)).join('.')
    };
  });
}

function getProperties (data) {
  var result = data.match(/(private|public) var (.)+;/g) || [];
  var properties = result.map(function (p) {
    var visibility = p.indexOf('public') > -1 ? 'public' : 'private';
    p = p.replace(/(private|public)/g, '').replace(' var ', '');
    p = parseVariable(p);
    p.visibility = visibility;
    return p;
  })

  return properties;
}

function parseVariable (data) {
  var loc = data.replace(';', '').split(' = ');
  var loc1 = loc[0].split(':');
  var variable = {};
  variable.name = loc1[0];
  variable.type = loc1[1];
  if(loc.length > 1){
    variable.value = loc[1];
  }
  return variable;
}

function getConstants (data) {
  var result = data.match(/(private|public) static const (.)+;/g) || [];
  var constants = result.map(function (p) {
    var visibility = p.indexOf('public') > -1 ? 'public' : 'private';
    p = p.replace(/(private|public)/g, '').replace(' static const ', '');
    p = parseVariable(p);
    p.visibility = visibility;
    return p;
  })

  return constants;
}

function getFunctions (data) {
  var result = data.match(/(override)* (private|public) function (.)+/g) || [];
  var arrData = data.split('\n').map(function (str) {
    return str.trim();
  });
  var functions = result.map(function (f) {
    return parseFunction(f, arrData);
  });
  return functions;
}

function parseFunction (data, odata) {
  var f = {};
  f.body = parseFunctionBody(data, odata);
  if(data.indexOf('override') > -1){
    data = data.replace('override ', '');
    f.override = true;
  }
  f.visibility = data.indexOf('public') > -1 ? 'public' : 'private';
  data = data.replace(f.visibility + ' function ', '');
  f.name = data.match(/\w+\(/g)[0].replace('(', '');
  data = data.replace(f.name, '');
  f.params = parserFunctionParams(data);
  data = data.replace(/\((.)*\)/g, '');
  f.type = data.split(':')[1] ? data.split(':')[1].trim() : 'constructor';
  return f;
}

function parserFunctionParams (data) {
  var result = data.match(/\((.)*\)/g) || [];
  var loc = result[0].replace(/[\(\)]/g, '').split(',');
  return loc.map(function (e) {
    var loc1 = e.split(':');
    return {
      name: loc1[0],
      type: loc1[1]
    }
  });
}

function parseFunctionBody (fdata, data) {
  fdata = fdata.trim();
  var count = 1, i = data.indexOf(fdata) + 2, str = '';
  while(count !== 0){
    if(data[i] === '{'){
      count++;
    }
    else if(data[i] === '}'){
      count--;
    }
    str += data[i];
    i++;
  }
  return str.substring(0, str.length - 1);
}
