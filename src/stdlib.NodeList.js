/**
* setup useful function for RadioNodeList
* @constructs RadioNodeList
* @returns {Object} this RadioNodeList
*/
module.id='NodeList.js';
/**
* offer a interface to get or set value of checkbox val
* @param {array} args - array of select value that will be indexing(if null, will be get value of indexed dom)
* @param {String} index - attr that will be index(true or false)
* @returns {Object} return values
*/
NodeList.prototype.ind_val = function(index,args){
	var doms = Array.prototype.slice.call(this);
	if(args){
		doms.map(function(v){
			v[index] = (args.indexOf(v.value)!=-1);
		});
		return args;
	}else{
		return doms.reduce(function(a,b){
			if(b[index]){
				a.push(b.value);
			}
			return a;
		},[]);
	}
}
/**
* change attributes by ind_key map_o val_key
* @param {String} key_attr - find key by the attr name
* @param {Object} map_o - get value with the key from the object(function)
* @param {String} val_attr - fill the value with the attr name
* @returns {Object} return self
*/
NodeList.prototype.attr_map = function(key_attr,map_o,val_attr){
	var doms = Array.prototype.slice.call(this),
		t_key,t_val;
	doms.map(function(v){
		t_key = key_attr ? v.getAttribute(key_attr):true;
		if(t_key){
			// get val
			if(typeof(map_o)==="function"){
				t_val = map_o(t_key);
			}else if(typeof(map_o)==="object"){
				t_val = map_o[t_key];
			}else if(typeof(map_o)==="string"){
				t_val = map_o;
			}
			if(t_val){
				// change the attr
				v.setAttribute(val_attr,t_val);
			}
		}
	});
	return this;
}
