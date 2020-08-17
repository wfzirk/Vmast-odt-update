
// uint array to string


// read amd detect unicode fileCreatedDate
// https://stackoverflow.com/questions/1410334/filesystemobject-reading-unicode-files
/*
'Detect Unicode Files
Set Stream = FSO.OpenTextFile(ScriptFolderObject.Path & "\" & FileName, 1, False)
intAsc1Chr = Asc(Stream.Read(1))
intAsc2Chr = Asc(Stream.Read(1))
Stream.Close
If intAsc1Chr = 255 And intAsc2Chr = 254 Then 
    OpenAsUnicode = True
Else
    OpenAsUnicode = False
End If

'Get script content
Set Stream = FSO.OpenTextFile(ScriptFolderObject.Path & "\" & FileName, 1, 0, OpenAsUnicode)
TextContent = Stream.ReadAll()
Stream.Close
*/

(function(window){
		// https://ourcodeworld.com/articles/read/188/encode-and-decode-html-entities-using-pure-javascript
	window.htmlentities = {
		/**
		 * Converts a string to its html characters completely.
		 *
		 * @param {String} str String with unescaped HTML characters
		 **/
		encode : function(str) {
			var buf = [];
			
			for (var i=str.length-1;i>=0;i--) {
				buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
			}
			
			return buf.join('');
		},
		/**
		 * Converts an html characterSet into its original character.
		 *
		 * @param {String} str htmlSet entities
		 **/
		decode : function(str) {
			return str.replace(/&#(\d+);/g, function(match, dec) {
				return String.fromCharCode(dec);
			});
		}
	};
})(window);


function typedArrayToUnicodeString(ua) {
    var binstr = Array.prototype.map.call(ua, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    var escstr = binstr.replace(/(.)/g, function (m, p) {
        var code = p.charCodeAt(p).toString(16).toUpperCase();
        if (code.length < 2) {
            code = '0' + code;
        }
        return '%' + code;
    });
    return decodeURIComponent(escstr);
}


  function Uint8Array2Hex(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
	console.log('toHex', str, result);
	 return result;
  }
  
  function mixedUnicodeAscii2String(str) {
	// https://stackoverflow.com/questions/6400778/how-to-convert-mixed-ascii-and-unicode-to-a-string-in-javascript
	var enc=encodeURIComponent(str)
	//console.log('enc', enc)

	var dec = decodeURIComponent(enc)
	return dec
  }
  
  
	String.prototype.replaceString = function (index, string) {
		//https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index
		if (index > 0)
			return this.substring(0, index) + string + this.substring(index, this.length);

		return string + this;
	};
  
  
  
  function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    {       case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return out;
}
  
  
  
  
   function xxxxxxtoHexArray(str) {
    var result = [];
    for (var i=0; i<str.length; i++) {
      result.push(str.charCodeAt(i).toString(16));
    }
	//console.log('toHexArr', str, result);
	 return result;
  }
  

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

function hex2ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }
 
function hex2char(str) {
	//#String.fromCharCode(i)
	var str = '';
	for (var n = 0; n < str.length; n += 2) {
		str += String.fromCharCode(substr(n, 2));
	}
	console.log(str)
	return str;
}

 
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Int8Array(buf));
} 
 
 
function arrayToString(arr) {
  let str = '';
  arr.forEach(function(i, index) {
    str += i;
    if (index != (arr.length - 1)) {
      str += ',';
    };
  });
  return str;
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

//var str = "my name is 'xyz' and my school name is 'xyz' and my area name is 'xyz' ";
//var  searchToken ="my";
//var preIndex = 0;

//console.log(getIndexOfSubStr(str, searchToken, preIndex, []));
 
function matchAll(needle, haystack) {
	return [...haystack.matchAll(new RegExp(needle, 'gi'))].map(a => a.index);
}

function readDoc(docStr, csvArray) {
	sepstr = "#"
	console.log('readdoc',docStr.length, csvArray.length);
	var allIndexArray = []
	var wordList = {}
	//try{
		//docStr = docStr.replace(/[\x00-\x20]/g, "#");
		docStr = docStr.replace(/ /g, "#");
		console.log(docStr)
		console.log(csvArray)
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

			if (i < 40) {
				console.log('searchword',searchword, unicode);
			}
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
	
	//} catch(err) {
	//	console.log('error',err.message);
	//	console.log('   ',i, csvArray[i], csvArray[i].length,searchword, unicode);
	//}
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
				console.log(p,word,toHex(inner))
				inner = inner.replaceAll(word, '<mark>'+unicode+'</mark>');
			//}
		}	

		document.getElementById("output").innerHTML = inner;
		console.log(inner)
		
	} catch(err) {
		console.log('error',err.message);
		//console.log('   ',i, csvArray[i], csvArray[i].length,searchword, unicode);
	}
		

}	
