/*! Hexane.Balance.js: JS Chemical Equation Balancer. Depends on vectorious by mateogianolio: https://github.com/mateogianolio/vectorious.
 *  Copyright 2017 Alex Yu (U-Hill Secondary)
 *  License: Apache 2.0
 *  Created for use with Hexane (hexane.tk)*/
 
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'g'), replacement);
};
 
Hexane || (Hexane = {});
 
/**
 *  Helper function for tokenizing chemical formulae into individual elements & polyatomic ions
 */
Hexane.tokenizeChemFormula = function(formula){
	formula = formula.replaceAll('\\left', '').replaceAll('\\right', '').replaceAll(']',')');
	
	var res = [];

	formula += 'E';

	var curElem = '';
	var num = null;
	var chrg = null;
	
	var isChrg = false;

	var stack = [res];
	var txtStack = [''];

	var curLvl = res;

	var brktEnd = false;

	for (var i=0; i<formula.length; ++i){

		var c = formula[i];
		
		if ('{}'.indexOf(c) != -1) continue;
		
		if (i < formula.length-1) txtStack[txtStack.length-1] += c;

		if (brktEnd && !(c >= '0' && c <= '9') && c != '_' && c != '^'){
			brktEnd = false;

			stack.pop();
			if (num === null) num = 1;
			if (chrg === null) chrg = 0;

			var txt = txtStack.pop();

			var innerTxt = txt.substring(0, txt.lastIndexOf(')'));
			stack[stack.length-1].push({ 'type':'polyatomic', 'name': innerTxt, 'items':curLvl , 'count':num, 'charge': chrg });
			txtStack[txtStack.length-1] += txt;

			curLvl = stack[stack.length-1];

			num = null;
			isChrg = false;
			chrg = null;
		}

		if (c >= 'A' && c <= 'Z'){
			if (curElem && curElem.length > 0){
				if (num === null) num = 1;
				if (chrg === null) chrg = 0;
				curLvl.push({ 'type':'element', 'name':curElem, 'count':num, 'charge': chrg });

				curElem = '';
			}
			num = null;
			isChrg = false;
			chrg = null;
			curElem += c; 
		}
		else if (c >= 'a' && c <= 'z'){
			curElem += c; 
		}
		
		else if (c >= '0' && c <= '9'){
			if (isChrg){
				if (chrg === null) chrg = 0;
				chrg = chrg * 10 + (c - '0');
			}
			else{
				if (num === null) num = 0;
				num = num * 10 + (c - '0');
			}
		}
		
		else if (c == '+'){
			if (isChrg){
				if (!chrg) chrg = 1;
			}
			else if (num){
				if (!num) num = 1;
			}
		}
		
		else if (c == '-'){
			if (isChrg){
				if (chrg) chrg = -chrg;
				else chrg = -1;
			}
			else if (num){
				if (num) num = -num;
				else num = -1;
			}
		}
		
		else if (c == '^'){
			isChrg = true;
		}
		
		else if (c == '_'){
			isChrg = false;
		}

		else if (c == '(' || c == '['){
			if (curElem && curElem.length > 0){
				if (num === null) num = 1;
				if (chrg === null) chrg = 0;
				curLvl.push({ 'type':'element', 'name':curElem, 'count':num, 'charge': chrg });
				curElem = ''
				num = null;
				isChrg = false;
				chrg = null;
			}
			
			curLvl = [];
			stack.push(curLvl);
			txtStack.push('');
		}

		else if (c == ')'){
			if (curElem && curElem.length > 0){
				if (num === null) num = 1;
				if (chrg === null) chrg = 0;
				curLvl.push({ 'type':'element', 'name':curElem, 'count':num, 'charge': chrg });
				curElem = ''
			}
			num = null;
			isChrg = false;
			chrg = null;
			brktEnd = true;
		}
	}

	return res;
}

/**
 *  Helper function that decomposes a chemical formula into counts of elements
 */
Hexane.decomposeChemFormula = function(formula){
	var tokens = Hexane.tokenizeChemFormula(formula);
	var ans = {};
	
	for (var i=0; i<tokens.length; ++i){
		var t = tokens[i];
		if (t.type == 'element'){
			if (ans[t.name]) ans[t.name] += t.count;
			else ans[t.name] = t.count;
			ans['charge'] = t.charge;
		}
		else{ // if t.type == 'polyatomic'
			var sub = Hexane.decomposeChemFormula(t.name);
			for (var k in sub){
				if (ans[k]) ans[k] += sub[k] * t.count;
				else ans[k] = sub[k] * t.count;
			}
			ans['charge'] = t.charge;
		}
	}
	
	return ans;
}

 Hexane.Balance = (function(){
	var obj = {};
	
	/**
	 *  Find the LCM of two numbers, a and b, by computing a * b / gcd. The GCD is found using the Euclidean algorithm.
	 */
	var lcm = function(a, b){
		var lcm = a * b;
		
		if (b < a) { var tmp = a; a = b; b = tmp; }
		while (b > 1e-128){
			var r = a % b;
			a = b;
			b = r;
		}
		
		return lcm / a;
	};

	
	/**
	 *  Balance a chemical equation of the form A + ... + B = C + ... + D . 
	 *  @returns {Array} An array consisting of two subarrays each containing appropriate coefficients for the compounds on each side of the equation.
	 */
	obj.balanceNumerical = function(equation){
		equation = equation.replaceAll('->', '=').replaceAll('>', '=').replaceAll('<', '');
		var spl = equation.replaceAll('{', '').replaceAll('}', '').replace(/\+$/, '').replaceAll('+=', '=').replaceAll('++', '+').split('='); 	
		
		if (spl.length != 2) return null; // not 2 sides
		
		var ele = {}; // set of elements
		var h = 0, w = 0;
		
		var left = spl[0].split('+');
		for (var i=0; i<left.length; ++i) {
			left[i] = Hexane.decomposeChemFormula(left[i].trim());
			for (var k in left[i]){
				if (!(ele[k])) {
					++h;
					ele[k] = true;
				}
			}
		}
		
		var right = spl[1].split('+');

		for (var i=0; i<right.length; ++i) {
			right[i] = Hexane.decomposeChemFormula(right[i].trim());
			for (var k in right[i]){
				if (!(ele[k])) {
					++h;
					ele[k] = true;
				}
			}
		}
		
		w = left.length + right.length;
		
		// put into a matrix
		
		var mat = new Matrix(h+1, w);
		
		var ct = 0;
		for (var k in ele){
			for (var i=0; i<left.length; ++i){
				mat.set(ct, i, left[i][k] || 0);
			}
			for (var i=0; i<right.length; ++i){
				mat.set(ct, left.length + i, -right[i][k] || 0);;
			}
			++ct;
		}
		
		for (var i=0; i<left.length; ++i){
			mat.set(h, i, left[i]['charge'] || 0);
		}
		for (var i=0; i<right.length; ++i){
			mat.set(h, left.length + i, -right[i]['charge'] || 0);
		}
		
		// gaussian elimination
		
		var rref = mat.gauss().toArray();
		var sov = mat.solve(new Matrix(w, 1));
		var sol = new Matrix(1, w);
		var lastpivot = -1;
		var noSolution = true;
		
		for (var i=0; i<rref.length; ++i){
			var pvt = -1;
			for (var j=lastpivot+1; j<rref[i].length; ++j){
				if (Math.abs(rref[i][j]) > 1e-10){
					if (pvt === -1){
						pvt = j;
						lastpivot = pvt;
						sol.data[j] = 0;
					}
					else{
						sol.data[pvt] -= rref[i][j];
						sol.data[j] = 1;
						noSolution = false;
					}
				}
			}
		}		
		
		if (noSolution) return null;
		
		var mul = 1;
		var MAX = 100001;
		var EPSI = 1e-10;
		var denom = new Matrix(1, w);
		// console.log(sol.toString());
		
		// brute force for denominator (problem is trivial)
		for (var i=0; i<w; ++i){
			for (var j=1; j<MAX; ++j){
				if (Math.abs(sol.data[i] * j - Math.round(sol.data[i] * j)) < EPSI){
					denom.data[i] = j;
					break;
				}
			}
		}
		// console.log(denom.toString());
		
		// find lcm of all numbers 
		for (var i=0; i<w; ++i){
			var d = denom.data[i];
			mul = lcm(mul, d);
		}
		
		for (var i=0; i<w; ++i){
			sol.data[i] = Math.round(sol.data[i] * mul);
		}
		
		return sol.toArray()[0];
	};
	
	/**
	 *  Balance a chemical equation of the form A + ... + B = C + ... + D . 
	 *  @returns {String} A string representing the balanced equation.
	 */
	obj.balance = function(equation){
		var sol = obj.balanceNumerical(equation);
		if (!sol) return "Error";
		
		var eqsign = '';
		
		for (var i=0; i<equation.length; ++i){
			var c = equation[i];
			if ('=<>'.indexOf(c) != -1) eqsign += c;
		}
		
		equation = equation.replaceAll('->', '=').replaceAll('>', '=').replaceAll('<', '');
		var spl = equation.replaceAll('{', '').replaceAll('}', '').replace(/\+$/, '').replaceAll('+=', '=').replaceAll('++', '+').split('=');
		var left = spl[0].split('+');
		var right = spl[1].split('+');
		
		var ans = '';
		for (var i=0; i<left.length; ++i){
			if (i != 0) ans += ' + ';
			if (left[i].indexOf('^') != -1) {
				if (!(left[i].endsWith('-')))
					left[i] += '+';
				left[i] = left[i].replace('^', '^{') + '}'
			}
			ans += sol[i] + ' ' + left[i].trim();
		}
		
		ans += ' ' + eqsign + ' ';
		
		for (var i=0; i<right.length; ++i){
			if (i != 0) ans += ' + ';
			if (right[i].indexOf('^') != -1) {
				if (!(right[i].endsWith('-')))
					right[i] += '+';
				right[i] = right[i].replace('^', '^{') + '}'
			}
			ans += sol[i + left.length] + ' ' + right[i].trim();
		}
		
		return ans;
	};
	
	return obj;
 })();