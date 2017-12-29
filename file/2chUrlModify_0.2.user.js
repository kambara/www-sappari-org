// ==UserScript==
// @name          2ch URL Modify 0.2
// @namespace     http://sappari.org
// @description   ttp to http
// @include       http://*.2ch.net/*
// ==/UserScript==

(function(){
	function hideIframe(e) {
		var a = e.target;
		var div = a.parentNode;
		var parent = div.parentNode;
		var newA = document.createElement("a");
		newA.innerHTML = a.innerHTML;
		newA.href = a.href;
		newA.onclick = showIframe;
		parent.replaceChild(newA, div);
		return false;
	}
	function showIframe(e) {
		var a = e.target;
		
		var iframe = document.createElement("iframe");
		iframe.src = a.href;
		iframe.width = "90%";
		iframe.height = "0";
		iframe.style.verticalAlign = "top";
		iframe.style.border = "3px solid #cccccc";
		iframe.onload = function(e) {
			var doc = this.contentWindow.document;
			var dl = doc.getElementsByTagName("dl");
			this.height = dl[0].offsetHeight;
			doc.body.scrollTop = parseInt(dl[0].offsetTop);
		}
		
		var aTag = document.createElement("a");
		aTag.href = a.href;
		aTag.innerHTML = a.innerHTML;
		aTag.onclick = hideIframe;
		aTag.style.border = "3px solid #cccccc";
		aTag.style.backgroundColor = "#cccccc";
		
		var div = document.createElement("div");
		div.appendChild(aTag);
		div.appendChild(document.createElement("br"));
		div.appendChild(iframe);
		
		var parent = a.parentNode;
		parent.replaceChild(div, a);
		return false;
	}
	window.addEventListener("load", function(e){
		// ttpをhttpのリンクに
		var dd = document.getElementsByTagName("dd");
		var ttp = /([^h])(ttp:\/\/[\x21-\x7E]+)/ig;
		for (var i=0; i<dd.length; i++) {
			var str = dd[i].innerHTML;
			str = str.replace(ttp, "$1<a href=h$2>$2</a>");
			dd[i].innerHTML = str;
		}
		var aTags = document.getElementsByTagName("a");
		for (var i=0; i<aTags.length; i++) {
			// ime.nuやime.stを除去
			var href = aTags[i].href;
			aTags[i].href = href.replace(/(ime\.nu|(www\d\.|)ime\.st)\//, "");
			// 画像へのリンクをサムネイル表示
			if (href.match(/\.(gif|jpeg|jpg|png)$/i)) {
				var img = document.createElement("img");
				img.src = href;
				img.width = "150";
				img.style.verticalAlign = "text-top";
				aTags[i].appendChild(img);
			}
			// >>100とかをiframe表示
			if (aTags[i].innerHTML.match(/&gt;&gt;\d+/))
				aTags[i].onclick = showIframe;
		}
	}, false);
})();