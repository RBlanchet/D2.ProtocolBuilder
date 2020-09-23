d2builder
============

protocol dofus 2.0 builder using js to output

## Extract Files ##
First you need to extract some AS files (around 1500) from the dofus Invoker on your computer

Extract file from dofus invoker :
```sh
npm run-script extract || node index.js -c "extract"
```
By default the script take  `C:/Users/${user}/AppData/Local/Ankama/zaap/dofus/DofusInvoker.swf` as path
And outuput the content in `./tmp/protocol/as/`
See [constants.js](./lib/constant.js) for more details

## Build JS Files ##
For the second step with need to parse and convert the AS files into javascript files

Convert AS files to JS files :
```sh
npm run-script build|| node index.js -c "build"
```
By default the script will output files in`./tmp/protocol/js/`
See [constants.js](./lib/constant.js) for more details
## Compile JS into one file ##
For the third step with need to do is merging all JS files into one (more easier to use)

Merge JS files into one :
```sh
npm run-script compile|| node index.js -c "compile"
```
By default the script will output file as `./build/protocol.js`
See [constants.js](./lib/constant.js) for more details
