/**
* setup useful function for Array
* @constructs Array
* @returns {Object} this Array
*/
module.id='Array.js';
/**
* Return new array with duplicate values removed
* @returns {Array} array without duplication
*/
Array.prototype.unique =function(){
	var a = [];
	var l = this.length;
	for(var i=0; i<l; i++) {
		for(var j=i+1; j<l; j++) {
		// If this[i] is found later in the array
			if (this[i] === this[j]){j = ++i;}
		}
		a.push(this[i]);
	}
	return a;
};
/**
* Compute the intersection of n arrays
* @param {Array} Arrays
* @returns {Array} single array concurrent in all Arrays
*/
Array.prototype.intersect = function() {
	if (!arguments.length) return [];
	var a1 = this,
		a = [],
		a2,
		n = 0;
	while(n < arguments.length) {
		a = [];
		a2 = arguments[n];
		var l = a1.length;
		var l2 = a2.length;
		for(var i=0; i<l; i++) {
			for(var j=0; j<l2; j++) {
				if (a1[i] === a2[j]) a.push(a1[i]);
			}
		}
		a1 = a;
		n++;
	}
	return a.unique();
}
/**
* Return elements which are in A but not in arg0 through argn
* @param {Array} Arrays
* @returns {Array} single array in A but absent in input Arrays
*/
Array.prototype.diff =function(){
	var a1 = this,
		a = [],
		a2,
		n = 0;
	while(n < arguments.length){
		a = [];
		a2 = arguments[n];
		var l = a1.length;
		var l2 = a2.length;
		var diff = true;
		for(var i=0; i<l; i++) {
			for(var j=0; j<l2; j++) {
				if (a1[i] === a2[j]){
					diff = false;
					break;
				}
			}
			diff ? a.push(a1[i]) : diff = true;
		}
		a1 = a;
		n++;
	}
	return a.unique();
}
/**
* return a range array based on input int or this array
* @returns {Array} array with range
*/
Array.prototype.range = function(n){
	var a_len = n || this.length;
	return Array.apply(null, Array(a_len)).map(function (_, i) {return i;});
}
/**
* return min and max of this
* @returns {Array} array with min and max
*/
Array.prototype.limit = function(){
	return [Math.min.apply(null,this),Math.max.apply(null,this)];
}
/**
* return all group that select len_g items from this
* @param {int} len_g - item count of single group
* @param {Array} [arr_col] - for recall
* @returns {Array} groups
*/
Array.prototype.ncombine = function(len_g,arr_col){
	arr_col = arr_col || [];
	if(len_g==0){
		return [arr_col];
	}else{
		var self=this;
		return self.reduce(function(a,b,i){
			return a.concat(self.slice(i+1).ncombine(len_g-1,arr_col.concat(b)));
		},[]);
	}
}
/**
* return index of range that Arr[ind]<=N<Arr[ind+1]
* @param {int} val - value to find the range index
* @returns {int} ind
*/
Array.prototype.range_ind = function(val){
	var i;
	for(i=0;i<this.length;i++){
		if(val<this[i]){
			break;
		}
	}
	return i-1;
}
/**
* return 2 layer array transpose
* @returns {Array} array that transpose of this array
*/
Array.prototype.transpose = function(){
	var a = this;
	var len_s = a.map(function(v){return v.length}).sort();
	if(len_s[0]<len_s[len_s.length-1]){console.log('arrays dimesion are not equal when transpose');}
	return a[0].slice(0,len_s[0]).map(
		function(col,i){
			return a.map(
				function(row){
					return row[i]
				}
			)
		}
	);
}
/**
* toggle input item in this array
* @param {Object} item - item may exist in this array
* @returns {Array} this array
*/
Array.prototype.toggle = function(item){
	var tInd = this.indexOf(item);
	if(tInd == -1){
		this.push(item);
	}else{
		this.splice(tInd,1);
	}
	return this;
}
/**
* re scale array
* @param {number} scale - max value of new array
* @param {array} val_range - available data range
* @returns {Array} normalized array
*/
Array.prototype.scale_norm = function(scale,val_range){
	var this_a = this,
		val_min = Math.min.apply(this, val_range || this_a),
		val_max = Math.max.apply(this, val_range || this_a),
		ratio = (val_max-val_min) / scale;
	return this_a.reduce(function(a,b){return a.concat(Math.round((b-val_min)/ratio))},[]);
}
/**
* read 2 level array to an obj with colnames,rownames,data(only number)
* @returns {Object} obj with colnames,rownames,data(number matrix)
*/
Array.prototype.to_matrix = function(){
	// transform 1: arrays
	var t_aa = this.slice(1).transpose();
	return {
		colnames: this[0].slice(1),
		rownames: t_aa[0],
		data:t_aa.slice(1).map(function(v1){return v1.map(function(v2){return Number(v2)})}).transpose()
	};
}
/**
* count repeat time of specific item in this array
* @param {item of array} item - max value of new array
* @returns {integer} count of item
*/
Array.prototype.count = function(item){
	var ind=this.indexOf(item),
		cnt=0;
	while(ind != -1){
		cnt++;
		ind = this.indexOf(item,ind+1);
	}
	return cnt;
}