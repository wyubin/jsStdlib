/**
* setup useful function for HTMLFormElement
* @constructs HTMLFormElement
* @returns {Object} this HTMLFormElement
*/
module.id='HTMLFormElement.js';
//var mytooltip = require('./mytooltip.js');
require('./stdlib.NodeList.js');
require('./stdlib.HTMLCollection.js'); // for compatible IE
require('./stdlib.HTMLSelectElement.js');

/**
* offer a validate handler for Form element, just check validity by validators and write result on
* @param {Object} event object
* @returns {boolean} return Validity
*/
HTMLFormElement.prototype.validate_handler = function(e){
	var t_valid_cb;
	// check if custom validator available
	t_valid_cb = this.validators[e.target.name];
	if(t_valid_cb){
		// restore validity when no custom to check native validity
		e.target.setCustomValidity('');
		// if native valid pass
		if(e.target.validationMessage == ''){
			e.target.setCustomValidity(t_valid_cb(e));
		}
	}
	return e.target.form.checkValidity();
};
/**
* offer a validator object(hash) for validate handler to return valid massage with event object as argument
*/
HTMLFormElement.prototype.validators = {};
/**
* offer a interface to get or set value of form's children
* @param {Object} [args] hash including keys of input name
* @returns {Object} return this
*/
HTMLFormElement.prototype.val = function(args){
	// check names
	var names = Array.prototype.slice.call(this).reduce(function(a,b){
		var t_name = b.getAttribute('name');
		if(a.indexOf(t_name)==-1 && t_name){
			a.push(t_name);
		}
		return a;
	},[]);
	var t_val,self=this;
	return names.reduce(function(a,b){
		t_val = args ? (args[b] || null):null;
		a[b] = self.elem_val(b,t_val);
		return a;
	},{});
}
/**
* set value for single element
* @param {String} name - element name
* @param {String or Array} [value] element value
* @returns {String or Array} return this
*/
HTMLFormElement.prototype.elem_val = function(name,value){
	// return null if can not assign it
	if(!this[name]){
		return null;
	}
	var self=this,t_elem,
		ex_selector = ['[type=checkbox]','select[multiple]','[type=radio]'];
	var general_ind = ex_selector.reduce(function(a,b){
		t_elem = self[name].DOCUMENT_NODE ? self[name] : self[name][0];
		return a+t_elem.matches(b);
	},0)==0;
	if(!general_ind){
		if(self[name].length){
			return self[name].ind_val('checked',value);
		}else{
			if(value){
				self[name].checked = (value.indexOf(self[name].value)!=-1);
			}
			return self[name].checked ? [self[name].value]:[];
		}
	}
	if(value){
		self[name].value = value;
	}
	return self[name].value;
}
/**
* pop valid massage for safari
* @param {Object} e event object

HTMLFormElement.prototype.safari_validity = function(e,style){
	var i,self=this;
	if(!this.tip_obj){
		var t_dom = document.createElement('span');
		this.appendChild(t_dom)
		this.tip_obj = new mytooltip(t_dom);
	}
	for(i=0;i<this.length;i++){
		if(this[i].validationMessage != ""){
			// popup message
			this.tip_obj.show_dom(this[i],[this[i].validationMessage]);
			setTimeout(function(){self.tip_obj.hide()},3000);
			return false;
		}
	}
	return true;
}
*/