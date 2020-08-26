

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
	
function replaceSelectedText(replacementText) {
	// https://stackoverflow.com/questions/3997659/replace-selected-text-in-contenteditable-div
	//getSelectionPosition();
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
	if (selHex.length === 4 && selHex[0] ==='e') {
		alert('Invalid selection.  Choose Ascii word');
		return;
	}	
	
	if (!confirm("Are you sure you want to change "+selText+"?")) {
	      return;
	}

	console.log(winSel.toString());
    if (winSel) {
       if (winSel.rangeCount) {
            range = winSel.getRangeAt(0); 
			console.log(range)
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
	
	var searchWords = search_Table(selText);
	//================================
	
	dispModal(searchWords);
	var ws = window.getSelection();
	var st = ws.toString();
	console.log(st);
	/*
	table.addEventListener('click', function() {
			
			var tableRow = event.target.parentNode.textContent;

			console.log(document.activeElement.tagName);
			// change focus get back selection
			document.getElementById("output").focus()
			console.log(document.activeElement.tagName);

			
			
			var [newWord, unicode] = tableRow.split(' ')
			unicode = unicode.replace('(','').replace(')','');
			var char = unescape('%u'+unicode)
			console.log('unicode',unicode, replacementText);
			
			var inner = document.getElementById("output").innerHTML;
			inner = inner.replace(replacementText, char);
			document.getElementById("output").innerHTML = inner;
			table.removeEventListener('click', this, false);
		}, false);
		*/
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


/*
function xreadDoc(docStr, csvArray) {
	console.log('readDoc')
	// https://stackoverflow.com/questions/10590098/javascript-regexp-word-boundaries-unicode-characters
	//wordBndryStart = (?<=^|\P{L});	// for unicode text
	//wordBndryEnd = (?i)(?<=^|\P{L})xxx(?=\P{L}|$); // xxx is main pattern
	//wordBndry = (
	//unicodeString = docStr;
	//var regexpBMPWord = /([\u0000-\u0019\u0021-\uFFFF])+/gu;

	docStr = docStr.replace(/\s/g, '#')
	//console.log('mtch', mtch)
	console.log(docStr)
	//console.table(unicodeString.match(regexpBMPWord));
}	
	
function spanDoc(docStr, csvArray) {
	
		function onmouseoverspan(){
		this.style.backgroundColor = "red";
	}
	function onmouseoutspan(){
		this.style.backgroundColor = "transparent";
	}
	var spans,d = document.getElementById("output");
	var newText = d.innerHTML.replace(/([\s])([^\s]+)/g, "$1<span>$2</span>");
         newText = newText.replace(/^([^\s]+)/g, "<span>$1</span>");
		 newText = newText.replace(/&nbsp;/g, "<span>&nbsp;</span>")
   for (i in newText) console.log(i, newText[i])
    d.innerHTML = newText;

	spans = d.getElementsByTagName("span")

	for(var a=0;a<spans.length;a++) {
		spans[a].onmouseover = onmouseoverspan;
		spans[a].onmouseout = onmouseoutspan;
	}

}	



function xreadDoc(docStr, csvArray) {
	spanDoc();
}	
*/	
	
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
