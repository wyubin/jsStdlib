/**
* setup useful function for Number
* @constructs Number
* @returns {Object} this Number
*/
module.id='Number.js';
/**
* Return thousands-separators string of number
* @returns {String} thousands separators string
*/
Number.prototype.to_k_sep =function(){
	var t_str = this.toString().split(".");
	t_str[0] = t_str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return t_str.join(".");
}
