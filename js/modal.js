	
function GetSelectedValue(){
		var e = document.getElementById("selectElementId");
		var result = e.options[e.selectedIndex].value;

	}

	function GetSelectedText(){
		//var e = document.getElementById("selectElementId");
		//var result = e.options[e.selectedIndex].text;
		text = document.getElementById("selectElementId").selectedOptions[0].text;
		console.log('GetSelectedText',text);
		document.getElementById("myModal").style.display = "none";
		var ws = window.getSelection();
		var st = ws.toString();
		console.log(st)
		return text;
	}
	
	
	function replaceText(replacementText) {
		console.log('replaceSelectedTExt',replacementText);
		var winSel = window.getSelection();
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
	}	
	
	
function dispModal(wordList) {	
	
		// Get the modal
	var modal = document.getElementById("myModal");
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	var txtBtn = document.getElementById("optText")

	console.log('dspmodal')
	//btn.onclick = function(e) {
		modal.style.display = "block";

		//var mdisp = document.getElementById("mdisp");
		select = document.getElementById('selectElementId');
	    //select.onchange = re
		for (var i in wordList) {
			var opt = document.createElement('option');
			var [newWord, unicode] =wordList[i].split(' ');
			unicode = unicode.replace('(','').replace(')','');
			var char = unescape('%u'+unicode)
			console.log(wordList[i],newWord,  unicode)
			opt.value = unicode;
			opt.innerHTML =newWord
			select.appendChild(opt);
		}
		
		 select.size=select.options.length;
		 //if(select.options.length>1) select.style.width='470px';
		 select.onchange = replaceText(char);
		modal.style.display = "none";
		//mdisp.innerHTML =wordList;
	//}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	
	
	
	//return wordList[0]
} //if modal

