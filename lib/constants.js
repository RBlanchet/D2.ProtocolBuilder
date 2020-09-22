module.exports = {
  src: {
    enum: '/dofus/network/enums',
    type: '/dofus/network/types',
    message: '/dofus/network/messages',
    metadata: '/dofus/network/Metadata.as',
    protocolConstants: '/dofus/network/ProtocolConstantsEnum.as',
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
    booleanByteWrapper: '/boolean-byte-wrapper.tpl.js',
    customDataWrapper: '/custom-data-wrapper.js',
    int64: '/int64.js',
    networkMessage: 'network-message.js',
    uint64: '/uint64.js'
  }
}