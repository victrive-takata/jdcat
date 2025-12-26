let url = window.location.pathname;
let url_nofile = url.replace(/\/[^/]+\.[^/]+$/, "");
let directories = url_nofile.split("/").filter(dir => dir.length > 0);

function loadMenuXML(file) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", file, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			parseMenuXML(xhr.responseXML);
		}
	};
	xhr.send();
}

function parseMenuXML(xmlDoc) {
	var output = document.getElementById("schemaMenuList");
	var htmlContent = "";
	var sitePath = "/schema/";
	if(document.querySelector('#mainCts').classList.contains('en')) {
		sitePath += 'en/';
	}
	var thisdrc = directories[directories.length-1];
	var items = xmlDoc.querySelectorAll("item");

	htmlContent += "<ul>";
	for (var i = 0; i < items.length; i++) {
		var name = items[i].getElementsByTagName("name")[0].textContent;
		if(document.querySelector('#mainCts').classList.contains('en')) {
			name = items[i].getElementsByTagName("english")[0].textContent;
		}
		var directory = items[i].getElementsByTagName("directory")[0].textContent;
		var link = sitePath + directory;
		var onclass = "";
		if (directory == thisdrc) {
			onclass = " class='set'";
		}
		htmlContent += '<li' + onclass + '><a href="' + link + '/">' + name + '</a></li>';
	}
	htmlContent += "</ul>";

	output.innerHTML = htmlContent;

}

// XMLファイルを指定して読み込み
loadMenuXML("https://cdn.jsdelivr.net/gh/victrive-takata/jdcat/@/f2f2832af0cc1d5cd103e9ed2b8767780589cea8/static/schema/menu.xml");

document.querySelector('#schemaMenuTitle a').addEventListener('click', function(e){
	e.preventDefault();
	document.querySelector('#schemaMenu').classList.toggle('open');
});

document.querySelector('#lang-code').addEventListener('change', function(e){
	const new_link= e.target.value;
	location.href = new_link;
});

