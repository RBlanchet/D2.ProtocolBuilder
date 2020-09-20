var MessageReceiver = (function () {
  function MessageReceiver(){

  }
  MessageReceiver.parse = function (input, messageId, messageLength) {
    if (!messageId) {
        return this.parseHeader(input);
      }
    var _loc4_ = MessageReceiver._list[messageId];
    if (!_loc4_) {
      console.log('Unknown packet received (ID ' + messageId + ', length ' + messageLength + ')');
      return null;
    }
    var _loc5_ = _loc4_();
    _loc5_.unpack(input, messageLength);
    return _loc5_;
  };
  MessageReceiver.parseHeader = function (src, splitted, id, length, staticHeader) {
    if (splitted) {
      return this.parse(src, id, length);
    }
    if (src.bytesAvailable < 2) {
      throw new Error('Not enought data to read the header, byte available : ' + src.bytesAvailable + ' (needed : 2)');
    }
    staticHeader = staticHeader || src.readUnsignedShort();
    id = id || this.getMessageId(staticHeader);
    if (src.bytesAvailable < (staticHeader & NetworkMessage.BIT_MASK)) {
      throw new Error('Not enought data to read the message length, byte available : ' + src.bytesAvailable + ' (needed : ' + (staticHeader & NetworkMessage.BIT_MASK) + ')');
    }
    length = this.readMessageLength(staticHeader, src);
    return this.parseHeader(src, true, id, length);
  };
  MessageReceiver.getMessageId = function (firstOctet) {
    return ((firstOctet >> NetworkMessage.BIT_RIGHT_SHIFT_LEN_PACKET_ID));
  };
  MessageReceiver.readMessageLength = function (staticHeader, src) {
    var byteLenDynamicHeader = (staticHeader & NetworkMessage.BIT_MASK);
    var messageLength;

    switch (byteLenDynamicHeader) {
      case 0:
        break;
      case 1:
        messageLength = src.readUnsignedByte();
        break;
      case 2:
        messageLength = src.readUnsignedShort();
          break;
      case 3:
        messageLength = ((((src.readByte() & 0xFF) << 16) + ((src.readByte() & 0xFF) << 8)) + (src.readByte() & 0xFF));
          break;
    }

    return (messageLength);
  };
  MessageReceiver._list = {<list>}
});