// ==UserScript==
// @name          2ch URL Modify 0.1
// @namespace     http://sappari.org
// @description   ttpをhttpのリンクにする。ime.nuやime.stを除去。画像へのリンクをサムネイル表示。
// @include       http://*.2ch.net/*
// ==/UserScript==

(function(){
	window.addEventListener("load", function(e){
		// ttpをhttpのリンクに
		var dd = document.getElementsByTagName("dd");
		var ttp = /([^h])(ttp:\/\/[\x21-\x7E]+)/ig;
		for (var i=0; i<dd.length; i++) {
			var str = dd[i].innerHTML;
			str = str.replace(ttp, "$1<a href=h$2>$2</a>");
			dd[i].innerHTML = str;
		}
		// ime.nuやime.stを除去
		var aTags = document.getElementsByTagName("a");
		for (var i=0; i<aTags.length; i++) {
			var href = aTags[i].href;
			href = href.replace(/(ime\.nu|(www\d\.|)ime\.st)\//, "");
			aTags[i].href = href;
			// 画像へのリンクをサムネイル表示
			if (href.match(/\.(gif|jpeg|jpg|png)$/i)) {
				var img = document.createElement("img");
				img.src = href;
				img.width = "150";
				img.style.verticalAlign = "text-top";
				aTags[i].appendChild(img);
			}
		}
	}, false);
})();