var pnir;
var document;
var id;
var window;

pnir     = new ActiveXObject("Sleipnir.API");
id       = pnir.GetDocumentID(pnir.ActiveIndex);
document = pnir.GetDocumentObject(id);
window = pnir.GetWindowObject(id);

if (document == null)  {
	pnir.MessageBox("Document オブジェクトを作成できません");
}
else {
	str = "[[" + document.title + "|" + document.URL + "]]";
	window.clipboardData.setData( "Text", str );
	document = null;
	window = null;
}

pnir = null;
