
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
 
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Int8Array(buf));
} 
 
 
function getAllMatchesArray(needle, haystack) {
	console.log('allmatches',needle)
	var index = [];   //, i = -1; 
	
	for (var i in haystack) {
		if (haystack[i].length < 3) continue
		//console.log(haystack[i][1], needle, haystack[i][2], haystack[i][1].includes(needle))
		if (haystack[i][1].includes(needle)) {
			console.log('match at',i)
			index.push([i,needle, haystack[i][1], haystack[i][2]])
		}
	}
	console.log('index', index)
	return index; 
} 

function getAllMatchesStr(str, searchToken, preIndex, output){
	var result = str.match(searchToken);
	if(result){
		output.push(result.index +preIndex);
		str=str.substring(result.index+searchToken.length);
		getAllMatchesStr(str, searchToken, preIndex, output)
	}
     return output;
};

//var str = "my name is 'xyz' and my school name is 'xyz' and my area name is 'xyz' ";
//var  searchToken ="my";
//var preIndex = 0;

//console.log(getIndexOfSubStr(str, searchToken, preIndex, []));
 
function readDoc(docStr, csvArray) {
	sepstr = "#"
	console.log('readdoc',docStr.length, csvArray.length);
	var allIndexArray = []
	var wordList = {}
	try{
		
		docStr = docStr.replace(/ /g,'#')
		docStr = docStr.replace(/'/g,"#@'")
		console.log(docStr)
		for (var i in csvArray) {
			if (i === 0) continue
			if (csvArray[i].length < 3) continue
			//console.log('length of array', csvArray[i].length, csvArray[i])
			searchword  = '#'+csvArray[i][1]+'#'
			
			unicode = csvArray[i][2].toUpperCase()
			if (i === 0) continue;
			if (unicode === 'E390') continue;
			if (unicode === 'E316') continue;
			if (unicode === 'E37E') continue;

			if (i < 10) {
				console.log(searchword, unicode);
			}
			if (searchword.includes('_')) {
				c = searchword.split('_')
				//console.log('split',c[0], c[1])
				searchword = c[0]+'#'
				//console.log('contains _',searchword);
			}

			var n = docStr.indexOf(searchword);
			//console.log('after n', n)
			if (n > -1) {
				//wordList.push(searchword)
				wl =getAllMatchesStr(docStr,searchword,0, [])
				wordList[searchword] = wl
				console.log('wordmatchesstr',searchword, wordList)
				
				str = docStr.substring(n, n+ searchword.length).replace(/#/g,'')
				index = getAllMatchesArray(str, csvArray)
				//console.log(srchword)
				console.log('allmatchesarray',searchword,n, index)
				//txt = document.getElementById("output").innerHTML
				for (var i in index) {
					allIndexArray.push(index[i])
				}
				
			}
		}
		console.log(allIndexArray)
		console.log(wordList)
	
	} catch(err) {
		console.log('error',err.message);
		console.log('   ',i, csvArray[i], csvArray[i].length,searchword, unicode);
	}
	markAllWords(wordList, allIndexArray)
}	
		
String.prototype.replaceAll = function(search, replacement) {
	console.log(search, replacement)
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};	
	
function markAllWords(wordList, arrayLis) {	
	try {
		var docStr = document.getElementById("output").innerHTML;
		docStr = docStr.replace(/ /g,'#');
		docStr = docStr.replace(/'/g,"#@'");
		//var tn = document.createTextNode(docStr);
		//var txt = tn.textContent;
		for (var wrd in wordList) {
			console.log('word',wrd, wordList[wrd]); 
			docStr = docStr.replaceAll(wrd, "<mark>"+wrd+"</mark>")
			//txt = txt.replace(/wrd/g, "<mark>"+wrd+"<\mark>");	
		}	

		document.getElementById("output").innerHTML = docStr;
		console.log(docStr)
		
	} catch(err) {
		console.log('error',err.message);
		//console.log('   ',i, csvArray[i], csvArray[i].length,searchword, unicode);
	}
		
	/*
	searchword  = 'Tarshish'
	var n = str.search(searchword)
	if (n) {
		console.log(n)
		console.log(str.substring(n, n+ searchword.length)) 
	}
	*/
}	
	
	/*
	
	console.log(buf2hex(txt))
	var hexbuf = buf2hex(txt)
	console.log('len',hexbuf.length)
	str = hexbuf.split(\x20)
	console.log(str)
	*/
	/*
	for (var j = 0;  j < 100; j+=2) { 
		var hb = hexbuf[j]+hexbuf[j+1]
		console.log(hb, hex2ascii(hb))
	}
	*/

	