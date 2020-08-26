var fontCol = 0;
var uniCol = 2;
var nameCol = 1;
//var synCol = 4;
//var xrefCol = 3;
refCol = 3;
var noCols = 3;
	
// find font column and unicode column	
function findCol(arry) {
	console.log('findcol',arry.length);
	var t0 = performance.now();
	var found = false;
	var rowx = 0;
	for (var i = 4; i < arry.length; i ++) {
		rowx = arry[i]
		console.log(i, rowx.length, rowx);
		for (var j = 0;  j < rowx.length; j++) {  //  eeac8d = eb0d
			//	https://stackoverflow.com/questions/17267329/converting-unicode-character-to-string-format
			var	uni = rowx[j].charCodeAt(0).toString(16).toUpperCase();
			console.log(i, j, '|'+uni+'|', uni.length);
		    if (uni.length == 4) { 
				fontCol = j;
				for (var k = 0;  k < rowx.length; k++){
					if (k === fontCol) continue;
					//console.log(j,k,uni, rowx[k], rowx[k].length, fontCol);
					if (rowx[k].toUpperCase() === uni) {
						console.log('found')
						uniCol = k;
						found = true;
						break;
					}
				}
			}	
		}
		if (i > 16) break;   
		if (found) break;
	}
	noCols = arry[5].length;
	if (fontCol === 0 && uniCol == 3) {
		nameCol = 2
		refcol = 4

	} 	
		
	console.log("noCols %d font %d name %d uni %d, ref %d",noCols,fontCol, nameCol, uniCol, refCol);
	var t1 = performance.now();
	console.log("findCol " + (t1 - t0) + " milliseconds.");
}

function generateTable(lines){
	//Clear previous data
	findCol(lines)
	console.log('generateTable');
	var t0 = performance.now();
	document.getElementById("dict").innerHTML = "";
	var table = document.createElement("table");
	table.id = "searchtable";
	table.className = 'xreftable';
	var len = 0;
	for (var i = 0; i < lines.length; i++) {
	  // find longest row
		if (lines[i].length > len) {
			len = lines[i].length;
		}
	}
	console.log(lines[5].length)

	table.createCaption();
	table.caption.innerHTML = lines[0];
	// make header
	var row = document.createElement('TR');
	for (var j = 1; j < len; j++) {
		var th = document.createElement("TH");
		th.appendChild(document.createTextNode('col '+j));
		var fontCol = 0;
		/*
		if (j === fontCol) {
			th.className = "fonticon";
			th.innerHTML = "Font";
		}*/
		if (j != nameCol) continue;
		if (j === uniCol) {
			th.className = "unicol";
			th.innerHTML = "Unicode";
		}
		if (j === nameCol) {
			th.className = "nameCol";
			th.innerHTML = "Name";
		}
		/*
		if (j === refCol) {
			th.className = "refCol";
			th.innerHTML = "Reference";
		}
		*/
		row.appendChild(th);
	}

	
	table.appendChild(row);
	var tbody = document.createElement('TBODY');
	for (var i = 1; i < lines.length; i++) {  // get line
		if (lines[i].length > 1) {	// process row
			var row = document.createElement('TR');
			row.className = "item";
			//var mismatch = false;
			var td = document.createElement("TD");
			text = lines[i][nameCol]+' ('+lines[i][uniCol].toUpperCase()+')';
			td.appendChild(document.createTextNode(text));
			row.appendChild(td)
			row.style.display = "";
			
			
		}	// end row process
		tbody.appendChild(row);
	}  // end process line
	table.appendChild(tbody);
	document.getElementById("dict").appendChild(table);
	console.log(table)
	var t1 = performance.now();
	console.log("generateTable " + (t1 - t0) + " milliseconds.");
	
	/*
	table.addEventListener('click', function(event) {
		const row = event.target.parentNode; 
		console.log(row.textContent)
	}); */
	return table;
}


function toHex(str) {
	var result = '';
	for (var i=0; i<str.length; i++) {
		result += str.charCodeAt(i).toString(16);
	}
	//console.log('toHex', str, result);
	return result;
}

function toHexArray(str) {
	var result = [];
	for (var i=0; i<str.length; i++) {
		result.push(str.charCodeAt(i).toString(16));
	}
	//console.log('toHexArr', str, result);
	return result;
}


function jscsvToArray(text) {
	console.log('xcsv...')
	row = [];
	lines = text.split('\n');
	for (var i in lines){
		//l = lines[i].replace(/|/g, ",");
		l = lines[i].split('|')
		for (var j in l) {
			l[j] = l[j].substring(1, l[j].length - 1)
		}
		row.push(l);
	}
	console.log(row[2])
	return row;
}

function csvToArray(text) {
	var t0 = performance.now();
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, line;
   for (line of text) {
	    if ('"' === line) {
            if (s && line === p) {
				row[i] += line;
			}
            s = !s;
        } else if (',' === line && s) {
      		line = row[++i] = '';
		} else if ('\n' === line && s) {
            if ('\r' === p) {
				row[i] = row[i].slice(0, -1);
			}
            row = ret[++r] = [line = '']; i = 0;
        } else {
			row[i] += line;
		}
        p = line;
    }
	//console.log('csv2array',ret[4]);
	var t1 = performance.now();
	console.log("csvToArray " + (t1 - t0) + " milliseconds.");
    return ret;
};

function search_Table(input){
	search_words = []
	srchType = 'char';
	input = input.toUpperCase()
	console.log('searchTable', input);
	//var input = document.getElementById('xsearch').value.toUpperCase();
	var filter =  input.split(' '); 
	console.log('searchtable',srchType, input, filter)	
	table = document.getElementById("searchtable");
	tr = table.getElementsByTagName("tr");
	for (i = 1; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td") ; 
		var txt = "+";
		for(j=0 ; j < td.length ; j++) {
			  let tdata = td[j] ;
			  if (tdata) {
				 txt = txt +'+'+ tdata.innerHTML.toUpperCase();
			  }
			  //console.log('td.length',td.length, txt)
		}
		//console.log('srch',txt, 'filter',filter);
		if (srchType === 'word') {  // word search
			txt = txt +'+';
			txt = txt.replace(/ /g,'+')
			txt = txt.replace(/:/g,'+')
			txt = txt.replace(/,/g,'+')
			//txt = txt.split('+')
			
			var found = true;
			for(var f = 0; f < filter.length; f++) {
				if (txt.indexOf('+'+filter[f]+'+')  === -1) { 
					found = false;
				}
			}
		} else {			// char search
			var found = true;
			for(var f = 0; f < filter.length; f++) {
				//console.log('filter[f]', filter[f],'txt', txt,'input', input)
				if (txt.indexOf(filter[f])  === -1) { 
					found = false;
				}
			}
		}	
		//found = arrayContains(txt, filter)
		//console.log(i,input, txt, found)
		if (found) {
				//tr[i].style.display = "";	
				search_words.push(tr[i].textContent);
		} else {
				tr[i].style.display = "none";
		}
		
	}
	//console.log('search_words',search_words);
	table.style.display="none";
	return search_words;
}

/*
function xshowError() {
	//table_mismatch();
	var input =  document. getElementById("showerr");
	if (input.checked) {
		input.checked = false;
		input.value = "  ";
	} else {
		input.checked = true;
		input.value = "\u2713";  //    ✓ ✓
	}
	console.log(input.checked);
	var table = document.getElementById("searchtable");
	var tr = table.getElementsByTagName("tr");
	for (var i = 0; i < tr.length; i++) {
		if (input.checked) {
			if (tr[i].classList.contains("uerror") || tr[i].classList.contains("nameerror")) {
				tr[i].style.display = "";
			} 	else {
				tr[i].style.display = "none";
			}
		} else {
			tr[i].style.display = "";
		}
	}

	console.log(input.checked);
}   
*/
function clearTable() {
    var input, filter, found, srchtable, tr, td, i, j;
    document.getElementById('xsearch').value = "";
	search_Table();
//	document.getElementById('xlf').value = ""; 
	console.log("clearall");
}