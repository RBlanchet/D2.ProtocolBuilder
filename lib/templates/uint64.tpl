var UInt64 = (function (_super) {
    __extends(UInt64, _super);

    function UInt64(low, high) {
        if (low === void 0) {
            low = 0;
        }
        if (high === void 0) {
            high = 0;
        }
        _super.call(this, low, high);
        this.parseInt64 = function (str, radix) {
            radix = radix || 0;
            var digit = 0;
            var i = 0;
            if (radix === 0) {
                if (str.search(/^0x/) === 0) {
                    radix = 16;
                    i = 2;
                } else {
                    radix = 10;
                };
            };
            if ((((radix < 2)) || ((radix > 36)))) {
                throw new Error('ArgumentError');
            };
            str = str.toLowerCase();
            var result = new UInt64();
            while (i < str.length) {
                digit = str.charCodeAt(i);
                if ((((digit >= Binary64.CHAR_CODE_0)) && ((digit <= Binary64.CHAR_CODE_9)))) {
                    digit = (digit - Binary64.CHAR_CODE_0);
                } else {
                    if ((((digit >= Binary64.CHAR_CODE_A)) && ((digit <= Binary64.CHAR_CODE_Z)))) {
                        digit = (digit - Binary64.CHAR_CODE_A);
                        digit = (digit + 10);
                    } else {
                        throw new Error('ArgumentError');
                    };
                };
                if (digit >= radix) {
                    throw new Error('ArgumentError');
                };
                result.mul(radix);
                result.add(digit);
                i++;
            };
            return (result);
        };
    }
    UInt64.fromNumber = function (n) {
        return new UInt64(n, Math.floor((n / 4294967296)));
    };;
    UInt64.prototype.toNumber = function () {
        return (((this.high * 4294967296) + this.low));
    };;
    UInt64.prototype.toString = function (radix) {
        radix = radix || 10;
        var _local_4 = 0;
        if ((((radix < 2)) || ((radix > 36)))) {
            throw new Error('ArgumentError');
        };
        if (this.high === 0) {
            return (this.low.toString(radix));
        };
        var digitChars = [];
        var copyOfThis = new UInt64(this.low, this.high);
        do {
            _local_4 = copyOfThis.div(radix);
            if (_local_4 < 10) {
                digitChars.push((_local_4 + Binary64.CHAR_CODE_0));
            } else {
                digitChars.push(((_local_4 - 10) + Binary64.CHAR_CODE_A));
            };
        } while (copyOfThis.high !== 0);
        return ((copyOfThis.low.toString(radix) + String.fromCharCode.apply(String, digitChars.reverse())));
    };;
    return UInt64;
})(Binary64);
<object>.UInt64 = UInt64;