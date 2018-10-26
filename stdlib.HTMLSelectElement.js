/**
* setup useful function for HTMLSelectElement
* @constructs HTMLSelectElement
* @returns {Object} this HTMLSelectElement
*/
module.id='HTMLSelectElement.js';
/**
* offer a interface to get or set value of select val(if is multiple)
* @param {array} [array] array of select options
* @returns {Object} return this
*/
HTMLSelectElement.prototype.ind_val = function(args){
	if(args){
		Array.prototype.slice.call(this.options).map(function(v){
			v.selected = (args.indexOf(v.value)!=-1);
		});
		return this;
	}else{
		return Array.prototype.slice.call(this.selectedOptions).map(function(v){
			return v.value;
		});
	}
}
