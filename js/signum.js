/*! SigNum.js v1.0.0: numbers supporting calculations with
 *                    significant figures
 *  Copyright 2017 Alex Yu (U-Hill Secondary)
 *  License: MIT
 *  Created for use with Hexane (hexane.tk)*/

 
// Polyfill for log10, sign
Math.log10 || (Math.log10 = function(d) {
	return Math.log(d) / Math.log(10);
});

Math.sign || (Math.sign = function(d) {
    if (d > 0) return 1;
    else if (d < 0) return -1;
    return 0;
});
	
/** value: may be any one of the following
 *        1. numerical value
 *        2. string representing a number (sig figs auto computed)
 *        3. another SigNum (sig figs copied over)
 *        default is 0
 * sf: # of sig figs, use Infinity if the number should be infinitely precise
 *        default is Infinity if "value" is set to a numerical value. 
 *        otherwise uses the sig figs derived from the "value"
 *        (string or SigNum) by default.
 *        Setting this overrides any of these derived values.
 * creatingOp: the operator used to create this SigNum, if any. If this was c   reated directly then this should be ''
 *        For internal use, mostly
 */
function SigNum (value, sf, creatingOp) {
    if (value === undefined || value === null) value = 0;
    if (creatingOp === undefined || creatingOp === null) creatingOp = '';

    // the actual value of this signum
    this.value = 0;

    // how many sig figs this SigNum contains
    this.sf = sf; 
    if (sf === undefined) this.sf = Infinity;

    // records the last operator used on this SigNum.
    var lastOp = creatingOp;

    // allow creating one SigNum from another
    if (value.constructor == SigNum){
        this.value = value.value;
        if (sf === undefined)
            this.sf = value.sf;
    }
    // allow creating SigNum from string
    else if (typeof(value) == 'string'){
        // sig figs detection algorithm
        var sigfigs = 0;
        var num = '';
        var carrytopt = 0;
        var foundpt = false;
        var nonzero = false;

        for (var i=0; i<value.length; ++i){
            if (value[i] == '0'){
                if (nonzero){
                    if (foundpt) ++ sigfigs;
                    else{
                        ++carrytopt;
                    }
                }
                num += '0';
            }
			
            else if (value[i] == '.'){
                if (foundpt){
                    // >1 decimal pt found! Complain but let it be
                    console.log(
                        "Warning: invalid number format." + 
                        " More than one decimal point detected.");
                }
                else{
                    foundpt = true;
                    sigfigs += carrytopt;
                    carrytopt = 0;
                }
                num += value[i];
            }
			
            else if (value[i] > '0' && value[i] <= '9'){
                nonzero = true;
                ++sigfigs;
                num += value[i];
                if (!foundpt){
                    sigfigs += carrytopt;
                    carrytopt=0;
                }
            }
			
            // if we encounter the symbol # this SigNum should be
            // considered infinitely precise
            else if (value[i] == '#'){
                sigfigs = Infinity;
            }
			
            else if (value[i] == ','){} // ignore
			
            else {
                // Non-numerical character! Complain but let it be.
                console.log(
                    "Warning: invalid number format. Character '" + 
                    value[i] + "' at position " + i + " is not valid. Only 0-9 and .,# are accepted.");
            }
        }
        this.value = Number(num);
        if (sf === undefined)
            this.sf = sigfigs;
    }
    // allow creating SigNum from number and #sigfigs
    else{
        this.value = value;
    }

    /**
     * generic round-to-decimal-place function from SO
	 */
    var round = function(value, exp) {
        if (typeof exp === 'undefined' || +exp === 0)
            return Math.round(value);

        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
            return NaN;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    };

    /**
     * Round the actual value of the SigNum to significant figures it
     * should contain (normally the actual value does not change)
	 */
    this.roundToSF = function(){
        if (this.sf <= 0){
            // console.log('Warning: invalid negative sig fig value ignored');
            this.sf = Infinity; 
        }
        if (this.sf == Infinity) return this;

        this.value = round(this.value, this.decimalPlaces());
        return this;
    };

    /**
     * Helper function for rounding SigFigs according to the rounding mode
	 */
    var roundIfNotOp = function(op, c){
        // Never round if Sig Figs are off in the first place
        if (SigNum.enableSF == false) return;

        var rm = SigNum.roundingMode;
        // Always round if AFTER_EACH_OP mode
        if (rm == SigNum.EnumRoundingMode.AFTER_EACH_OP){
            c.roundToSF();
        }
        // Only round when operator type changed for AFTER_EACH_OP_TYPE
        else if (rm == SigNum.EnumRoundingMode.AFTER_EACH_OP_TYPE){
            if (lastOp != '' && lastOp != op) c.roundToSF();
        }

        // Set the last operator's type
        lastOp = op;
    };

    /**
     * Make a deep copy of this SigNum object
	 */
    this.copy = function(){
        return new SigNum(this.value, this.sf, lastOp);
    };

	/**
     * The number of decimal places this number is precise to. Used for +,-
     * More specifically, thisreturns x where 10^(-x) is the
     * most precise digit contianed within this number
     * (returns 0 if number is only precise to ones, a negative number
     * if it is precise to some higher digit.)
	 */
    this.decimalPlaces = function(){
        if (this.sf <= 0){
            // console.log('Warning: invalid negative sig fig value ignored');
            this.sf = Infinity; 
        }
        if (this.sf == Infinity) return Infinity;

        var lg = Math.floor(Math.log10(Math.abs(this.value)));     
        lg -= this.sf-1;
        return -lg;
    };

	/**
     * Add this to another number (SigNum or normal)
     * and return a new SigNum.
	 */
    this.plus = function(b){
        roundIfNotOp('+', this);

        var c = new SigNum(0, Infinity, lastOp);
        if (b.constructor == SigNum){
            c.value = this.value + b.value; 
            var decpl = Math.min(b.decimalPlaces(), this.decimalPlaces());
            var lg = Math.floor(Math.log10(Math.abs(c.value)));
            c.sf = decpl + lg+1;
        }
        else{
            c.value = this.value + b;
            var lg = Math.floor(Math.log10(Math.abs(c.value)));
            c.sf = this.decimalPlaces() + lg+1;
        }
    
        return c;
    };

	/**
     * Subtract this from another number (SigNum or normal)
     * and return a new SigNum.
	 */
    this.minus = function(b){
        roundIfNotOp('+', this);

        var c = new SigNum(0, Infinity, lastOp);
        if (b.constructor == SigNum){
            c.value = this.value - b.value; 
            var decpl = Math.min(b.decimalPlaces(), this.decimalPlaces());
            var lg = Math.floor(Math.log10(Math.abs(c.value)));
            c.sf = decpl + lg+1;
        }
        else{
            c.value = this.value - b;
            var lg = Math.floor(Math.log10(Math.abs(c.value)));
            c.sf = this.decimalPlaces() + lg+1;
        }

        return c;
    };
	
    /**
     * Multiply this with another number (SigNum or normal)
     * and return a new SigNum.
	 */
    this.times = function(b){
        roundIfNotOp('*', this);
        var c = new SigNum(0, Infinity, lastOp);

        if (b.constructor == SigNum){
            c.value = this.value * b.value; 
            if (this.sf == Infinity && Math.abs(this.value) > 1 && Math.log10(Math.abs(this.value)) % 1 > 1e-300){
                var lg = Math.floor(Math.log10(Math.abs(c.value)));
                c.sf = lg + b.decimalPlaces() + 1;
            }
            else if (b.sf == Infinity && Math.abs(b.value) > 1 && Math.log10(Math.abs(b.value)) % 1 > 1e-300){
                var lg = Math.floor(Math.log10(Math.abs(c.value)));
                c.sf = lg + this.decimalPlaces() + 1;
            }
            else{
                c.sf = Math.min(this.sf, b.sf);
            }
        }
        else{
            c.value = this.value * b;
            var lg = Math.floor(Math.log10(Math.abs(c.value)));
			
			if (Math.log10(Math.abs(b) % 1 > 1e-300)){
				c.sf = this.sf;
			}
			else{
				c.sf = lg + this.decimalPlaces() + 1;
			}
        } 

        return c;
    };

    /**
     * Divide this by another number (SigNum or normal)
     * and return a new SigNum.
	 */
    this.div = function(b){
        roundIfNotOp('*', this);
        var c = new SigNum(0, Infinity, lastOp);

        if (b.constructor == SigNum){
            c.value = this.value / b.value; 
            c.sf = Math.min(b.sf, this.sf);
        }
        else{
            c.value = this.value / b;
            c.sf = this.sf;
        }
        return c;
    };
	
    /**
     * Compute the modulo of this and another number (SigNum or normal)
     * and return the result in a new SigNum.
	 */
    this.mod = function(b){
        roundIfNotOp('*', this);
        var c = new SigNum(0, Infinity, lastOp);

        if (b.constructor == SigNum){
            c.value = this.value % b.value; 
            c.sf = Math.min(b.sf, this.sf);
        }
        else{
            c.value = this.value % b;
            c.sf = this.sf;
        } 

        return c;
    };

    /**
     * Raise this to the power of another number (SigNum or normal)
     * and return a new SigNum.
	 */
    this.expo = function(b){
        roundIfNotOp('^', this);

        var c = new SigNum(0, Infinity, lastOp);
        if (b.constructor == SigNum){
            c.value = Math.pow(this.value, b.value); 
			
			if (this.value == 10 && b.decimalPlaces() <= 0) {
				c.sf = Infinity;
				return c;
			}
			
            var decpc = b.decimalPlaces();
            if (decpc <= 0){
                c.sf = this.sf;
            }
            else{
                c.sf = decpc;
            }
            if (c.sf == -Infinity) c.sf = Infinity;
        }
        else{
            c.value = Math.pow(this.value, b);
            c.sf = this.sf;
        }

        return c;
    };
    
    /**
     * Compute the log of this number with another number as the base.
     * and return a new SigNum.
     * If no other number is specified, ln is used by default.
	 */
    this.log = function(b){
        roundIfNotOp('log', this);

        var c = new SigNum(0, Infinity, lastOp);

        if (b === undefined) c.value = Math.log(this.value);
        else if (b == 10 && Math.log10) c.value = Math.log10(this.value);
        else if (b == 2 && Math.log2) c.value = Math.log2(this.value);
        else c.value = Math.log(this.value) / Math.log(b);
            
        c.sf = this.sf + Math.floor(Math.log10(Math.abs(c.value))) + 1;

        return c;
    };

    /**
     * Compute the ln of this number and return a new SigNum.
     * If no other number is specified, log base 10 is used by default.
     */
    this.ln = function(){
        roundIfNotOp('log', this);

        var c = new SigNum(0, Infinity, lastOp);

        c.value = Math.log(this.value);
        c.sf = this.sf + Math.floor(Math.log10(Math.abs(c.value))) + 1;

        return c;
    };

    // Compute the bth root of this number and 
    // return the result in a new SigNum.
    this.root = function(b){
        roundIfNotOp('^', this);

        var c = new SigNum(0, Infinity, lastOp);

        if (b.constructor != SigNum || b.sf == Infinity){
            c.value = Math.pow(this.value, 1 / b);
            c.sf = this.sf;
        }
        else{
            c.value = Math.pow(this.value, 1 / b.value);
            c.sf = b.decimalPlaces();
        }

        return c;
    };

    // Bitwise shift left
    this.shl = function(b){
        roundIfNotOp('shift', this);

        var c = new SigNum(0, Infinity, lastOp);
        c.value = c.value << b;
        c.sf = this.decimalPlaces();

        return c;
    };

    // Bitwise shift right
    this.shr = function(b){
        roundIfNotOp('bitwise', this);

        var c = new SigNum(0, Infinity, lastOp);
        c.value = c.value >> b;
        c.sf = this.sf;

        return c;
    };

    // Bitwise and
    this.and = function(b){
        roundIfNotOp('bitwise', this);

        var c = new SigNum(0, Infinity, lastOp);
        c.value = this.value & b;
        c.sf = this.sf;

        return c;
    };

    // Bitwise or
    this.or = function(b){
        roundIfNotOp('bitwise', this);

        var c = new SigNum(0, Infinity, lastOp);
        c.value = this.value | b;
        c.sf = this.decimalPlaces();

        return c;
    };

    // Bitwise xor
    this.or = function(b){
        roundIfNotOp('bitwise', this);

        var c = new SigNum(0, Infinity, lastOp);
        c.value = this.value ^ b;
        c.sf = this.decimalPlaces();

        return c;
    };

    // Bitwise not
    this.not = function(){
        roundIfNotOp('bitwise', this);

        var c = new SigNum(0, Infinity, lastOp);
        c.value = ~this.value;
        c.sf = this.decimalPlaces();

        return c;
    };
}

SigNum.EnumRoundingMode = 
    Object.freeze({"NONE":0, "AFTER_EACH_OP":1, "AFTER_EACH_OP_TYPE":2});

/**
 * How to round after operations (if not rounded then sig figs 
 * are preserved but actual numerical value is not modified)
 */
SigNum.roundingMode = SigNum.EnumRoundingMode.AFTER_EACH_OP_TYPE;

/**
 * If false, sig figs are not used while displaying numbers and
 * numbers are never rounded during operations 
 * (note that the numbers may continue to keep track of 
 * how many sig figs they have).
 */
SigNum.enableSF = true;

/**
 * Helper function for creating really simple functions calling 
 * functions in the Math object
 */
var autoMapFunction = function(fn, t){
    if (t.constructor == SigNum){
        t.roundToSF();

        var c = new SigNum(0, Infinity, '');
        c.value = fn(t.value);
        c.sf = t.sf;
        return c;
    }
    else{
        var c = new SigNum(0, Infinity, '');
        c.value = fn(t);
        return c;
    }
};

SigNum.root = function(a, ind){
    if (a.constructor != SigNum) a = new SigNum(a);
    return a.expo((new SigNum(1)).div(ind));
};


// Simple functions directly mapped to those in the JS Math object
SigNum.sqrt = function(c){ return autoMapFunction(Math.sqrt, c); };
SigNum.cbrt = function(c){ return autoMapFunction(Math.cbrt, c); };

SigNum.sin = function(c){ return autoMapFunction(Math.sin, c); };
SigNum.cos = function(c){ return autoMapFunction(Math.cos, c); };
SigNum.tan = function(c){ return autoMapFunction(Math.tan, c); };
SigNum.asin = function(c){ return autoMapFunction(Math.asin, c); };
SigNum.acos = function(c){ return autoMapFunction(Math.acos, c); };
SigNum.atan = function(c){ return autoMapFunction(Math.atan, c); };

SigNum.sinh = function(c){ return autoMapFunction(Math.sinh, c); };
SigNum.cosh = function(c){ return autoMapFunction(Math.cosh, c); };
SigNum.tanh = function(c){ return autoMapFunction(Math.tanh, c); };
SigNum.asinh = function(c){ return autoMapFunction(Math.asinh, c); };
SigNum.acosh = function(c){ return autoMapFunction(Math.acosh, c); };
SigNum.atanh = function(c){ return autoMapFunction(Math.atanh, c); };

SigNum.floor = function(c){ return autoMapFunction(Math.floor, c); };
SigNum.ceil = function(c){ return autoMapFunction(Math.ceil, c); };
SigNum.round = function(c){ return autoMapFunction(Math.round, c); };
SigNum.trunc = function(c){ return autoMapFunction(Math.trunc, c); };

SigNum.sign = function(c){ return autoMapFunction(Math.sign, c); };
SigNum.abs = function(c){ return autoMapFunction(Math.abs, c); };

SigNum.exp = function(c){ return autoMapFunction(Math.exp, c); };
SigNum.expm1 = function(c){ return autoMapFunction(Math.expm1, c); };
SigNum.log1p = function(c){ return autoMapFunction(Math.log1p, c); };

SigNum.log = function(a, b){ 
    if (a.constructor != SigNum) a = new SigNum(a); 
    return a.log(b); 
};

SigNum.log10 = function(a){
    return SigNum.log(a, 10);
};

SigNum.log2 = function(a){
    return SigNum.log(a, 2);
};


SigNum.pow = function(a, b){ 
    if (a.constructor != SigNum) a = new SigNum(a); 
    return a.expo(b); 
};

SigNum.max = function(a, b){ 
    if (a.constructor != SigNum) a = new SigNum(a); 
    if (b.constructor != SigNum) b = new SigNum(b); 
    if (a.value > b.value) return a;
    return b;
};

SigNum.min = function(a, b){ 
    if (a.constructor != SigNum) a = new SigNum(a); 
    if (b.constructor != SigNum) b = new SigNum(b); 
    if (a.value < b.value) return a;
    return b;
};

SigNum.random = function(c){ return new SigNum(Math.random()); };
SigNum.PI = new SigNum(Math.PI.toString());
SigNum.E = new SigNum(Math.E.toString());

/**
 * Convert a SigNum object to a string representing the full number 
 * (no exponents, fractions etc.) with the appropriate number of sigfigs
 * @return {string} string representation
 */
SigNum.prototype.toFullNumber = function(){
    if (this.sf <= 0){
        // console.log('Warning: invalid negative sig fig value ignored');
        this.sf = Infinity; 
    }

    var c = this.copy(); c.value = Math.abs(c.value);

    // Temporary measure to simply use the system toString function
    if (SigNum.enableSF == false || this.sf == Infinity)
        return (Math.sign(this.value) * c.value).toString();

    c.roundToSF();

    // this doesn't work for zero (log is -Infinity), Infinity, etc, 
    // so we make special cases
    if (this.value == 0) return '0';
    if (this.value == Infinity) return 'Infinity';
    if (this.value == -Infinity) return '-Infinity';

    var high = Math.floor(Math.log10(c.value));
    var low = -c.decimalPlaces(); 
    var res = this.value < 0 ? '-' : '';
    var val = c.value;

    var cutoff = Math.max(Math.pow(10, low-high-1), 1e-15);
    var haspt = false;

    if (high < 0) {
        res = res.concat('0.');
        haspt = true;
    }
    var ct = 0;

    for (var i=-1; i>high; --i){
        ++ct; if (ct > 650){ console.log("Warning: forced to break out of infinite loop.");  break;}
        res = res.concat('0');
    } 
    var endzeroct = 0;

    ct = 0;
    for (var i=high; i>=Math.max(low, high-15); --i){
		// prevent potential infinite loops
        ++ct; if (ct > 650){ console.log("Warning: forced to break out of infinite loop.");  break;}
        var tmp = val/Math.pow(10, i) % 10;
 
        var dist = Math.abs(Math.ceil(tmp) - tmp);
        if (dist < cutoff && dist !== 0) tmp += 1;
        if (tmp >= 10) tmp %= 10;

        if (tmp == 0) ++endzeroct;
        else endzeroct = 0;

        tmp = Math.floor(tmp);

       //if (i == low) { if (Math.floor(val/Math.pow(10, i-1)) >= 5) ++tmp; }

        res = res.concat(tmp.toString()); 

        if (!(isFinite(low)) && (val%Math.pow(10, i) < Math.pow(10, i)*1e-15)){
            low = i-1;
            break;
        }

        if (i == 0 && (i != Math.max(low, -16) || endzeroct > 0)) {
            res = res.concat('.');
            haspt = true;
        }
    }

    if (haspt && !(isFinite(low))){
        res = res.substring(0, res.length-endzeroct);
    }
    else{
        ct = 0;
        for (var i=Math.max(low, high-15)-1; i >= 0; --i){
            ++ct; if (ct > 1000){ console.log("Warning: forced to break out of infinite loop.");  break;}
            res = res.concat('0');
        }
    }

    if (endzeroct > 0 && !haspt &&
        SigNum.enableSF === true && isFinite(c.sf))
        res = res.concat('(' + c.sf + 'sf)');

    return res;
};

/**
 * Convert a SigNum object to its scientific notation representation
 * (e.g. 6.02e+23) with the appropriate number of sigfigs
 */
SigNum.prototype.toExponential = function(){
    if (this.sf <= 0){
        // console.log('Warning: invalid negative sig fig value ignored');
        this.sf = Infinity; 
    }

    if (this.sf == Infinity || SigNum.enableSF == false) 
        return this.value.toExponential();

    var c = this.copy(); c.value = Math.abs(c.value);
    c.roundToSF();

    var high = Math.floor(Math.log10(c.value));
    var low = -c.decimalPlaces(); 
    var res = this.value < 0 ? '-' : '';
    var val = c.value;

    var cutoff = Math.pow(10, low-high-1)
    var ct = 0;

    for (var i=high; i>=low; --i){
        var tmp = val/Math.pow(10, i) % 10;
        ++ct; if (ct > 1000){ console.log("Warning: forced to break out of infinite loop.");  break;}

        var dist = Math.abs(Math.ceil(tmp) - tmp);
        if (dist < cutoff && dist !== 0) tmp += 1;
        if (tmp >= 10) tmp %= 10;

        tmp = Math.floor(tmp);

/*      if (i == low) { if (Math.floor(val/Math.pow(10, i-1)) >= 5)++tmp;}*/ 
        res = res.concat(tmp.toString()); 

        if (i == high && high != low) res = res.concat('.');
    }

    if (res.trim() == '') return '0';
    res = res.concat('e').concat(high > 0 ? '+' : '').concat(high);
    return res;
};

/**
 * power of ten above which numbers are represented with scientific notation.
 */
var NUM_SCI_SPLIT=5; 

/**
 * Convert a SigNum object to a string,
 * automatically chosing an appropriate conversion method.
 */
SigNum.prototype.toString = function(){
    if (this.value != 0 && (
	    Math.abs(this.value) >= Math.pow(10, NUM_SCI_SPLIT) ||
        Math.abs(this.value) <= Math.pow(10, -NUM_SCI_SPLIT)))
        return this.toExponential();
    else
        return this.toFullNumber();
};

/**
 * Automatically convert this to a number when requested. 
 * Caution: this will cause the sig figs data to be lost!
 */
SigNum.prototype.valueOf = function(){
    var c = this.copy();
    c.roundToSF();
    return c.value;
};

/**
 * Convert a string or number to a SigNum object
 */
SigNum.create = function(obj){
    return new SigNum(obj);
};
