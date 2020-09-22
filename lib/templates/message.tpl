var <classname> = (function (<super>) {
  <extends>
  function <classname>(){
    <vars>
    <call>
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
  <classname>.prototype.pack = function(param) {
    var loc2 = new ByteArray();
    this.serialize(new CustomDataWrapper(loc2));
    NetworkMessage.writePacket(param, this.getMessageId(), loc2);
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
})(<parent>);
<object>.<classname> = <classname>;

