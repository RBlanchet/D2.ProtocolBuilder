var <classname> = (function (_super) {
  __extends(AdminCommandMessage, _super);
  function <classname>(){
    <vars>
    _super.call(this);
  }
  <classname>.prototype.getMessageId = function () {
    return <classname>.ID;
  };
  <classname>.prototype.reset = function() {
    <vars>
  };
  <classname>.prototype.unpack = function(param1, param2) {
    this.deserialize(param1);
  }
  <classname>.prototype.pack = function() {
    var loc2 = new ByteArray();
    this.serialize(new CustomDataWrapper(loc2));
    NetworkMessage.writePacket(param1, this.getMessageId(), loc2);
  };
  <classname>.prototype.serialize = function (output) {
    this.serializeAs_<classname>(output);
  };
  <classname>.prototype.deserialize = function (input) {
    this.deserializeAs_<classname>(input);
  };

  <classname>.prototype.serializeAs_<classname> = function (output) {
    <serialize>
  };

  <classname>.prototype.deserializeAs_<classname> = function (input) {
    <deserialize>
  };
  <classname>.ID = <id>;
  return <classname>;
})(NetworkMessage);

