const user = require("os").userInfo().username;
module.exports = {
  src: {
    enum: '/enums',
    type: '/types',
    message: '/messages',
    metadata: 'Metadata.as',
    protocolConstants: 'ProtocolConstantsEnum.as',
    protocolTypeManager: '/templates/protocol-type-manager.tpl',
    messageReceiver: '/templates/message-receiver.tpl',
    binary64: '/templates/binary64.tpl',
    booleanByteWrapper: '/templates/boolean-byte-wrapper.tpl',
    customDataWrapper: '/templates/custom-data-wrapper.tpl',
    int64: '/templates/int64.tpl',
    networkMessage: '/templates/network-message.tpl',
    uint64: '/templates/uint64.tpl'
  },
  output: {
    enum: '/enums',
    type: '/types',
    message: '/messages',
    metadata: '/metadata.js',
    protocolConstants: '/protocol-constants-enum.js',
    protocolTypeManager: '/protocol-type-manager.js',
    messageReceiver: '/message-receiver.js',
    binary64: '/binary64.js',
    booleanByteWrapper: '/boolean-byte-wrapper.js',
    customDataWrapper: '/custom-data-wrapper.js',
    int64: '/int64.js',
    networkMessage: 'network-message.js',
    uint64: '/uint64.js'
  },
  build: {
    map: 'maps.json',
    output: 'tmp/protocol/js',
    file: 'build/protocol.js'
  },
  jpexs: {
    classname : 'com.ankamagames.dofus.network.++',
    file: `C:/Users/${user}/AppData/Local/Ankama/zaap/dofus/DofusInvoker.swf`,
    output: 'tmp/protocol/as/scripts/com/ankamagames/dofus/network'
  }
}
