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