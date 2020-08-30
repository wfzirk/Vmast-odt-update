	
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
	
	
	function xreplaceText(xsel) {
		var sel = document.getElementById("selectElementId");
		var text= sel.options[sel.selectedIndex].text;
		console.log(text);
		return;
		if (!confirm("Are you sure you want to change "+selText+" with "+ unicode+"?")) {
	      return;
		}
		console.log('replaceSelectedTExt',unicode);
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
	
	
function dispModal(selText, wordList) {	
	
		// Get the modal
	var modal = document.getElementById("myModal");
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	//var txtBtn = document.getElementById("optText")
	
	function replaceText(sel) {
		console.log(sel)
		var sel = document.getElementById("selectElementId");
		var text= sel.options[sel.selectedIndex].text;
		var val = sel.options[sel.selectedIndex].value;
		console.log(text, val);

		if (!confirm("Are you sure you want to change "+selText+" with "+ newWord+':'+unicode+"?")) {
			modal.style.display = "none";
	      return;
		}
		console.log('replaceSelectedText',unicode, newWord);
		var uChar = unescape('%u'+unicode)
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
	}	
	
	console.log('dspmodal')
	
		modal.style.display = "block";

		//var mdisp = document.getElementById("mdisp");
		var select = document.getElementById("selectElementId");
	    //select.onchange = re
		for (var i in wordList) {
			var [newWord, unicode] =wordList[i].split(' ');
			unicode = unicode.replace('(','').replace(')','');
			var uchar = unescape('%u'+unicode)
			console.log(wordList[i],newWord,  unicode)
				select[i] = new Option(newWord,unicode,false,false)
		}
		
		 select.size=select.options.length;
		 //if(select.options.length>1) select.style.width='470px';

		//var modInp = document.getElementById("selBtn");
		//modInp.onclick = replaceText(this);

	
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

