/**
* setup useful function for Navigator
* @constructs Navigator
* @returns {Object} this Navigator
*/
module.id='Navigator.js';
/**
* Generate name and version of browser
* @returns {Array} Array with 2 item including browser name and version
*/
Navigator.prototype.browser_version = function(){
	var t_ver,res;
	res = this.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if(res && (t_ver = this.userAgent.match(/version\/([\.\d]+)/i))!= null){
		res[2] = t_ver[1];
	}
	res = res? res.slice(1,3) : [this.appName, this.appVersion,'-?'];
	return res;
}
