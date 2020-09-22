var Binary64 = (function () {
    function Binary64(low, high) {
        if (low === void 0) {
            low = 0;
        }
        if (high === void 0) {
            high = 0;
        }
        this.high = high;
        this.low = low;
    }
    Binary64.prototype.div = function (n) {
        var modHigh = 0;
        modHigh = (this.high % n);
        var mod = (((this.low % n) + (modHigh * 6)) % n);
        this.high = (this.high / n);
        var newLow = (((modHigh * 4294967296) + this.low) / n);
        this.high = (this.high + Number((newLow / 4294967296)));
        this.low = newLow;
        return mod;
    };;
    Binary64.prototype.mul = function (n) {
        var newLow = (Number(this.low) * n);
        this.high = (this.high * n);
        this.high = (this.high + Number((newLow / 4294967296)));
        this.low = (this.low * n);
    };;
    Binary64.prototype.add = function (n) {
        var newLow = (Number(this.low) + n);
        this.high = (this.high + Number((newLow / 4294967296)));
        this.low = newLow;
    };;
    Binary64.prototype.bitwiseNot = function () {
        this.low = ~(this.low);
        this.high = ~(this.high);
    };;
    Binary64.CHAR_CODE_0 = '0'.charCodeAt(0);
    Binary64.CHAR_CODE_9 = '9'.charCodeAt(0);
    Binary64.CHAR_CODE_A = 'a'.charCodeAt(0);
    Binary64.CHAR_CODE_Z = 'z'.charCodeAt(0);
    return Binary64;
})();
<object>.Binary64 = Binary64;