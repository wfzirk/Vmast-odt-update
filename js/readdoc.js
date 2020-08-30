

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

/*
function chunkit(str) {
	var chunks = [];

	for (var i = 0, charsLength = str.length; i < charsLength; i += 2) {
		chunks.push(str.substring(i, i + 2));
	}
	return chunks
}
*/

function UTF8ToText(x){
	var result = "";
	//console.log(x)
	try {
		//if(chkutf8){
		//    x = x.toString();
		//    for (var i = 0; (i < x.length && x.substr(i, 2) !== '00'); i += 2)
		//        result += String.fromCharCode(parseInt(x.substr(i, 2), 16));
		//} else {
			x = x.replace(/\\x/gi,"");
			x = x.toString();
			for (var i = 0; (i < x.length && x.substr(i, 2) !== '00'); i += 2)
				result += String.fromCharCode(parseInt(x.substr(i, 2), 16));
	   // }
		result = decodeURIComponent(escape(result));
	} catch(err) {
		return err.message;
	} finally {
		return result;
	}
}


function getSelectionPosition () {
    var selection = window.getSelection();
	data = selection.focusNode.data[selection.focusOffset]

	offset = selection.focusOffset;
	console.log(data)
	
	//text = data.substring(0, 1)
	console.log('wordat', offset)

}

	
	
function popup(searchWords) {
	//dispModal(row, fontCol, uniCol);
	sel = dispModal(searchWords);
	console.log('dispmodal',sel);
	return sel;

}
	
	
function optionBox(searchWords) {	
	var modal = document.getElementById("myModal");
	var span = document.getElementsByClassName("close")[0];
	modal.style.display = "block";
	console.log("optionbox")

	var select = document.getElementById("selectElementId");
	select.size = 0;
	//select.onchange = re
	for (var i in searchWords) {
		var [newWord, unicode] =searchWords[i].split(' ');
		unicode = unicode.replace('(','').replace(')','');
		//var uchar = unescape('%u'+unicode)
		console.log(searchWords[i],newWord,  unicode)
		select[i] = new Option(newWord,unicode,false,false)
	}

	select.size=select.options.length;
	inp = document.getElementById("selBtn");
	inp.onclick = replaceText;
	cncl = document.getElementById("cnclBtn");
	cncl.onclick = function() {modal.style.display="none";}

	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}
	
	
function replaceText(sel) {
		var modal = document.getElementById("myModal");
		console.log('replaceText')
		var sel = document.getElementById("selectElementId");
		var text= sel.options[sel.selectedIndex].text;
		var val = sel.options[sel.selectedIndex].value;
		console.log(text, val);

		//if (!confirm("Are you sure you want to change "+selText+" with "+ text+"?")) {
		//	modal.style.display = "none";
	   //   return;
		//}
		console.log('replaceText',unicode, text);
		var uChar = unescape('%u'+val)
		var winSel = window.getSelection();
		if (winSel) {
		   if (winSel.rangeCount) {
				range = winSel.getRangeAt(0); 
				console.log(range)
				range.deleteContents();
				range.insertNode(document.createTextNode(uChar));
			}
		} else if (document.selection && document.selection.createRange) {
			range = document.selection.createRange();
			range.text = replacementText;
		}
		modal.style.display = "none";

		// remove onclick event	
		inp = document.getElementById("selBtn").onclick="";
		sel.innerHTML = "";
	}		
	
	
	
function replaceSelectedText(replacementText) {
	// https://stackoverflow.com/questions/3997659/replace-selected-text-in-contenteditable-div

	if (!table_loaded) { 
		alert("Dictionary file has not been loaded.");
		return;
	}	
	var  range;
	var winSel = window.getSelection();
	var selText = winSel.toString();
	var selHex = toHex(selText).toLowerCase();
	console.log(selHex.length)
	console.log(selHex[0]);
	console.log(selText, selText.length, toHex(selText));
	
	if (selHex.length === 0) {
		alert('Invalid selection.  Choose Ascii word');
		return;
	}
	
	if (selHex.length === 4 && selHex[0] ==='e') {
		alert('Invalid selection.  Choose Ascii word');
		return;
	}	
	var searchWords = []
	searchWords = search_Table(selText);
	
	//================================
	optionBox(searchWords);

}


		   
function getAllMatchesArray(needle, haystack) {
	console.log('allmatches',needle, typeof haystack)
	var index = [];   //, i = -1; 
	
	for (var i in haystack) {
		console.log(haystack[i].length, haystack[i][1])
		if (haystack[i].length < 3) continue
		console.log('haystack',i,haystack[i][1], needle, haystack[i][2], haystack[i][1].includes(needle))
		if (haystack[i][1].includes(needle)) {
			console.log('match at',i)
			index.push([i,needle, haystack[i][1], haystack[i][2]])
		}
	}
	console.log('getallmatchesarray index ', index)
	return index; 
} 

function getAllMatchesStr(str, searchToken, preIndex, output){
	var result = str.match(searchToken);
	console.log('getallmatchesstr',searchToken,'preindex',preIndex)
	if(result){
		output.push(result.index +preIndex);
		str=str.substring(result.index+searchToken.length);
		getAllMatchesStr(str, searchToken, preIndex, output)
	}
	console.log('getallmatchesstr',result, output)
    return output;
};

function matchAll(needle, haystack) {
	return [...haystack.matchAll(new RegExp(needle, 'gi'))].map(a => a.index);
}

function onmouseoverspan(){
		this.style.backgroundColor = "red";
	}
function onmouseoutspan(){
		this.style.backgroundColor = "transparent";
	}

	
function readDoc(docStr, csvArray) {
	sepstr = "#"
	console.log('readdoc',docStr.length, csvArray.length);
	var allIndexArray = []
	var wordList = {}
	//try{
	docStr = docStr.replace(/\s/g, '#')
	docStr = docStr.replace(/'s/g, '#@')
		//console.log(docStr)
		//console.log(csvArray)
		for (var i in csvArray) {
			//if (i === 0) continue
			if (csvArray[i].length < 3) continue
			//console.log(csvArray[i].length, csvArray[i])
			line = csvArray[i]   //.split(',')
			word = line[1]
			unicode = line[2]
			//console.log(i, word, unicode)
			//if (i === 0) continue;
			if (unicode === 'E390') continue;
			if (unicode === 'E316') continue;
			if (unicode === 'E37E') continue;
			
			searchword  = '#'+word+'#'
			

			//if (i < 10) {
			//	console.log('searchword',searchword, unicode);
			//}
			if (searchword.includes('_')) {
				c = searchword.split('_')
				//console.log('split',c[0], c[1])
				searchword = c[0]+'#'
				//console.log('contains _',searchword);
			}

			var n = docStr.indexOf(searchword);
			//console.log(docStr)
			if (n > -1) {
				indexes = []
				indexes.push(unicode)
				//indexes.push([...docStr.matchAll(new RegExp(searchword, 'gi'))].map(a => a.index);
				 // [2, 25, 27, 33]
				indexes.push(matchAll(searchword, docStr))

				wordList[searchword] = indexes
				console.log('wordmatchesstr',searchword, wordList)
				
			}
		}

		console.log(wordList)

	markAllWords(wordList, allIndexArray)
}	
		
String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};

function markAllWords(wordList, arrayList) {
console.log('markallwords', wordList, arrayList)	
	try {
		var inner = document.getElementById("output").innerHTML;
		for (var word in wordList) {
			console.log(word, wordList[word])
			wrd = wordList[word]
			uni = wrd[0]
			var unicode = unescape('%u' + uni);
			offsets = wrd[1]
			//for (var i in offsets){
				word = word.replace(/#/g,'')
				console.log("word",word, "unicode", uni, "offsets",offsets)
				p = inner.indexOf(word)
				//console.log(p,word,toHex(inner))
				//inner = inner.replaceAll(word, '<mark>'+unicode+'</mark>');
				inner = inner.replaceAll(word, '<mark>'+word+'</mark>');
			//}
		}	
		//console.log(inner)
		document.getElementById("output").innerHTML = inner;
		//console.log(inner)
		
	} catch(err) {
		console.log('error',err.message);
		//console.log('   ',i, csvArray[i], csvArray[i].length,searchword, unicode);
	}
		

}	
