/**
* setup useful function for Array
* @constructs String
* @returns {Object} this String
*/
module.id='String.js';
/**
* Return binary from base64
* @returns {Binary} binary for image/png
*/
String.prototype.b64tobin =function(){
	var bin = atob(this),
		length = bin.length,
		buf = new ArrayBuffer(length),
		arr = new Uint8Array(buf);
	for (var i = 0; i < length; i++) {
		arr[i] = bin.charCodeAt(i);
	}
	return buf;
};
// string with line break and remove space
String.prototype.list2array = function(){
	var a = this.match(/[^\r\n]+/g);
	var b = [];
	for(var i=0;i<a.length;i++){
		var c= a[i].trim();
		if(c){
			b.push(c);
		}
	}
	return b;
}
/**
* parse string with tab to arrays
* @returns {Array} Array including each row array
*/
String.prototype.to_tab_array = function(){
	return this.list2array().map(function(v){
		return v.split('\t');
	});
}
// treat seq string to fasta format
String.prototype.fasta = function(name,sep){
	var t_seq_a = ['>'+name];
	for (var i = 0; i < this.length; i+=70) {
		t_seq_a.push(this.slice(i,i+70));
	};
	return t_seq_a.join(sep ? sep : '\n');
}
// remove space at two side
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g, '');
}
// treat window.location.search to query dict
String.prototype.query2dict = function(){
	var a = this.substr(1).split('&');
	if (a == "") return {};
	var b = {};
	for(var i=0;i<a.length;i++){
		var c= a[i].split('=');
		if (c.length != 2) continue;
		b[c[0]]=decodeURIComponent(c[1].replace(/\+/g, " "));
	}
	return b;
}
// treat query dict to query string
dict2query = function(query_dict){
	return '?'+Object.keys(query_dict).reduce(function(a,b){return a.concat( [b+'='+encodeURIComponent(query_dict[b])] )},[]).join('&');
}