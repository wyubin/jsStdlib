/**
* setup useful function for SVGElement
* @constructs SVGElement
* @returns {Object} this SVGElement
*/
module.id='SVGElement.js';
/**
* create doms by json object(array that including {name:<tagname>,attr:{},child:[]}, or string as createTextNode)
* @param {Array} array_doms array including {name:<tagname>,attr:{},child:[]}
* @returns {Object} return this
*/
SVGElement.prototype.svg_string = function(){
	return new XMLSerializer().serializeToString(this);
}
SVGElement.prototype.svg_base64 = function(){
	return 'data:image/svg+xml;base64,'+btoa(this.svg_string());
}
SVGElement.prototype.png_base64 = function(callback){
	// get dimension of svg
	var width = this.style.width.split('px')[0],
		height = this.style.height.split('px')[0],
		canvas = document.createElement('canvas'),
		img = new Image(),
		t_body = document.getElementsByTagName('body')[0];
	var ctx = canvas.getContext("2d");
	// src svg_base64 in img
	img.style.width=width,
	img.style.height=height;
	canvas.width=width,
	canvas.height=height;
	t_body.appendChild(img);
	t_body.appendChild(canvas);
	img.onload = function(e){
		if(e.currentTarget.parentNode){
			var t_dom = e.currentTarget;
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, 400, 400);
			ctx.drawImage(t_dom, 0,0);
			t_dom.src = canvas.toDataURL("image/png");
			if(callback){
				callback(t_dom.src);
			}
			t_body.removeChild(img);
			t_body.removeChild(canvas);
		}
	}
	img.src = this.svg_base64();
	return img;
}
/**
* create svg node by input tag and attributes
* @param {String} tag - tag of create node
* @param {Object} attrs - including attr of this tag
* @returns {DOM} return created dom
*/
SVGElement.prototype.create_node = function(tag,attrs){
	var t_node = document.createElementNS('http://www.w3.org/2000/svg',tag);
	if(attrs){
		Object.keys(attrs).map(function(v){
			t_node.set_attr(v,attrs[v]);
		});
	}
	return t_node;
}
SVGElement.prototype.set_attr = function(key,value){
	var l_key = key.split(':'),
		ns = l_key.length == 2 ? l_key[0]:null,
		r_key = l_key.length == 2 ? l_key[1]:l_key[0];
	// change ns
	if(ns=='xlink'){
		ns='http://www.w3.org/1999/xlink';
	}
	this.setAttributeNS(ns,r_key,value);
	return this;
}
/**
* remove all node in DOM
* @returns {DOM} return this
*/
SVGElement.prototype.empty = function(){
	while (this.lastChild) {
		this.removeChild(this.lastChild);
	}
	return this;
}
