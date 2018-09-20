/**
* return sum of array numbers
* @returns {Number} Number is sum of array
*/
Array.prototype.sum = function(){
	return this.reduce(function(a,b){return a+b;});
}
/**
* return mean
* @returns {Number} mean
*/
Array.prototype.mean = function(){
	return this.sum()/this.length;
}
/**
* return sum of varience
* @returns {Number} SS
*/
Array.prototype.ss = function(){
	var t_mean = this.mean();
	return this.map(function(v){return Math.pow(v-t_mean,2)}).sum();
}
/**
* return Standard Deviation
* @returns {Number} Standard Deviation
*/
Array.prototype.sd = function(){
	return Math.pow(this.ss()/this.length,0.5);
}
/**
* return Coefficient of Variation
* @returns {Number} Coefficient of Variation
*/
Array.prototype.cv = function(){
	return this.sd()/this.mean();
}
/**
* return z-score (if )
* @returns {Number} Coefficient of Variation
*/
Array.prototype.z_scores = function(){
	var t_mean = this.mean(),
		t_sd = this.sd();
	return t_sd ? this.map(function(v){return (v-t_mean)/t_sd}):
		Array.apply(null,new Array(this.length)).map(function(){return 0});
}
