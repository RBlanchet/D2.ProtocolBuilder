var ProtocolTypeManager = (function () {
  function ProtocolTypeManager() {
  }
  ProtocolTypeManager.getInstance = function (networkType, typeId) {
    var _loc3_ = ProtocolTypeManager._list[typeId];
    if (!_loc3_) {
      throw new Error('Type with id ' + typeId + ' is unknown.');
    }
    return _loc3_();
  };

  ProtocolTypeManager._list = {<list>}
  return ProtocolTypeManager;
})();
<object>.ProtocolTypeManager = ProtocolTypeManager;
