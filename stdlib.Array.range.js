/**
* this is two layer array with range number pair, merge all into a represent range list
* @returns {Array} new Array of range list
*/
Array.prototype.range_merge = function(){
	this.sort(function(a,b){return a[0]>b[0] ? 1:-1});
	var map_ind,rg_last_i=0,rg_mg = this.slice(0,1);
	for(var i=1;i<this.length;i++){
		map_ind = this[i].reduce(function(a,b){return a+(b <= rg_mg[rg_last_i][1]);},0);
		if(map_ind==1){
			// overlap with one end
			rg_mg[rg_last_i] = [rg_mg[rg_last_i][0],this[i][1]];
		}else if(map_ind==0){
			rg_mg.push(this[i]);
			rg_last_i++;
		}
	}
	return rg_mg;
}
