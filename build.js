const buildify = require('buildify');

buildify()
  .concat(['src/protocol/enum-manager.js','src/protocol/message-receiver.js'])
  .wrap('template.js', { version: '1.0' })
  .save('build/protocol.js')