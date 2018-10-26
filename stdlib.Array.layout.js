/**
* based this array and a input colnames to generate table string
* @returns {string} string of table layout
*/
Array.prototype.to_table = function(colnames){
	var header = colnames && '#'+colnames.join('\t')+'\n' || '';
	return header+(this.reduce(
		function(a,b){
			return a.concat(b.join('\t'));
		},[]).join('\n'));
}
/**
* based this array and a input colnames to generate table html
* @returns {string} string of table html
*/
Array.prototype.html_table = function(colnames){
	var header = colnames ? '<thead><tr><th>'+colnames.join('</th><th>')+'</th></tr></thead>' : '';
	return '<table>'+header+'<tbody>'+
		(this.reduce(
			function(a,b){
				return a.concat('<tr><td>'+b.join('</td><td>')+'</td></tr>');
			},[]).join(''))+
		'</tbody></table>';
}
