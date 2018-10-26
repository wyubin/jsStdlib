/**
* setup useful function for FileList
* @constructs FileList
* @returns {Object} this FileList
*/
module.id='FileList.js';
/**
* read all files into a array of string
* @returns {Promise} return this
*/
FileList.prototype.readPromise = function(){
	var p,self=this;
	var reader = function(file){
		return new Promise(function (resolve, reject){
			var tReader = new FileReader();
			tReader.onload = function (e) {
				resolve(e.target.result);
			};
			tReader.onerror = reject;
			if (!file.type || /^text\//i.test(file.type)) {
				tReader.readAsText(file);
			} else {
				tReader.readAsDataURL(file);
			}
		});
	};
	p = Promise.all(Array.prototype.slice.apply(this).map(function(v,ind){
		return reader(v);
	}));
	return p;
};
