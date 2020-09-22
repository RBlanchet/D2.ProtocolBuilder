var Int64 = (function (_super) {
    __extends(Int64, _super);

    function Int64(low, high) {
        if (low === void 0) {
            low = 0;
        }
        if (high === void 0) {
            high = 0;
        }
        _super.call(this, low, high);
    }
    Int64.fromNumber = function (n) {
        return new Int64(n, Math.floor((n / 4294967296)));
    };
    Int64.prototype.parseInt64 = function (str, radix) {
        radix = radix || 0;
        var digit = 0;
        var negative = (str.search(/^\-/) === 0);
        var i = ((negative) ? 1 : 0);
        if (radix === 0) {
            if (str.search(/^\-?0x/) === 0) {
                radix = 16;
                i = (i + 2);
            } else {
                radix = 10;
            };
        };
        if ((((radix < 2)) || ((radix > 36)))) {
            throw new Error('ArgumentError');
        };
        str = str.toLowerCase();
        var result = new Int64();
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
        if (negative) {
            result.bitwiseNot();
            result.add(1);
        };
        return (result);
    };;
    Int64.prototype.toNumber = function () {
        return (((this.high * 4294967296) + this.low));
    };;
    Int64.prototype.toString = function (radix) {
        radix = radix || 10;
        var _local_4 = 0;
        if ((((radix < 2)) || ((radix > 36)))) {
            throw new Error('ArgumentError');
        };
        switch (this.high) {
            case 0:
                return (this.low.toString(radix));
            case -1:
                if ((this.low & 0x80000000) === 0) {
                    return ((Number((this.low | 0x80000000)) - 0x80000000).toString(radix));
                };
                return (Number(this.low).toString(radix));
        };
        if ((((this.low === 0)) && ((this.high === 0)))) {
            return ('0');
        };
        var digitChars = [];
        var copyOfThis = new Int64(this.low, this.high);
        if (this.high < 0) {
            copyOfThis.bitwiseNot();
            copyOfThis.add(1);
        };
        do {
            _local_4 = copyOfThis.div(radix);
            if (_local_4 < 10) {
                digitChars.push((_local_4 + Binary64.CHAR_CODE_0));
            } else {
                digitChars.push(((_local_4 - 10) + Binary64.CHAR_CODE_A));
            }
        } while (copyOfThis.high !== 0);
        if (this.high < 0) {
            return ((('-' + copyOfThis.low.toString(radix)) + String.fromCharCode.apply(String, digitChars.reverse())));
        };
        return ((copyOfThis.low.toString(radix) + String.fromCharCode.apply(String, digitChars.reverse())));
    };;
    return Int64;
})(Binary64);
<object>.Int64 = Int64;