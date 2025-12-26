function loadXML() {
	const schemamain = document.getElementById("schemaCts");
	var file = schemamain.dataset.xmlfile;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", file, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			parseXML(xhr.responseXML);
		}
	};
	xhr.send();
}

function parseXML(xmlDoc) {
	var output = document.getElementById("schemaMain");
	var items = xmlDoc.querySelectorAll("schema *");

	for (var i = 0; i < items.length; i++) {
		var secL = items[i].tagName;
		switch (secL) {
			case 'category':
				const section_element = document.createElement('section');
				let cat_name = items[i].getAttribute('name');
				section_element.setAttribute('id',cat_name);
				var title = '';
				switch (cat_name) {
					case 'item':
						title = '<h2>要素名</h2>';
						break;
					case 'description':
						title = '<h2>説明</h2>';
						break;
					case 'caution':
						title = '<h2>注意点</h2>';
						break;
					case 'recommend':
						title = '<h2>推奨例</h2>';
						break;
					case 'deprecate':
						title = '<h2>非推奨例</h2>';
						break;
					case 'mapping':
						title = '<h2>junii2からのマッピング</h2>';
						break;
				}
				section_element.innerHTML = title;
				output.appendChild(section_element);
				break;
			case 'attribute':
				const div_element = document.createElement('div');
				div_element.classList.add('attribute');
				let id_name = items[i].getAttribute('name');
				if(id_name) {
					div_element.setAttribute('id',id_name);
				}
				var titleAtt = '<h3>属性</h3>';
				div_element.innerHTML = titleAtt;
				var output_att = output;
				var parent = items[i].parentNode;
				var parentTag = parent.tagName;
				if(parentTag == 'category') {
					let cat_name = parent.getAttribute('name');
					output_att = document.getElementById(cat_name);
				}
				output_att.appendChild(div_element);
				break;
			default:
				tagMake(items[i]);
				break;
		}
	}

}

function tagMake(targetItem) {
	var output = document.getElementById("schemaMain");
	var parent = targetItem.parentNode;
	var secL = targetItem.tagName;
	if(parent) {
		var parentTag = parent.tagName;
		if(parentTag == 'attribute') {
			let id_name = parent.getAttribute('name');
			if(id_name) {
				output = document.getElementById(id_name);
			} else {
				output = document.querySelector('.attribute');
			}
		} else if(parentTag == 'category') {
			let cat_name = parent.getAttribute('name');
			output = document.getElementById(cat_name);
		}
	}
	switch (secL) {
		case 'h1':
			var h1 = targetItem.textContent;
			var htmlContent = '<h1>' + h1 + "</h1>";
			output.insertAdjacentHTML('beforeend', htmlContent);
			break;
		case 'border':
			var border = targetItem.textContent;
			var htmlContent = '<div class="border">' + border + "</div>";
			output.insertAdjacentHTML('beforeend', htmlContent);
			break;
		case 'label':
			var label = targetItem.textContent;
			var htmlContent = '<dl class="label"><dt>記入レベル:</dt><dd>' + label + "</dd></dl>";
			output.insertAdjacentHTML('beforeend', htmlContent);
			break;
		case 'repeat':
			var repeat = targetItem.textContent;
			var htmlContent = '<dl class="repeat"><dt>繰返回数:</dt><dd>' + repeat + "</dd></dl>";
			output.insertAdjacentHTML('beforeend', htmlContent);
			break;
		case 'above':
			var above = '<h4>統制語彙</h4>';
			above += '<dl class="above">';
			targetItem.querySelectorAll("glossary").forEach( function(element){
				var glossary = element.innerHTML;
				above += '<div>' + glossary + '</div>';
			});
			above += '</dl>';
			var htmlContent = above;
			output.insertAdjacentHTML('beforeend', htmlContent);
			break;
		case 'list':
			var list = '<div class="list"><ul>';
			targetItem.querySelectorAll("li").forEach( function(element){
				var li = element.innerHTML;
				list += '<li>' + li + '</li>';
			});
			list += '</ul></div>';
			var htmlContent = list;
			output.insertAdjacentHTML('beforeend', htmlContent);
			break;
		case 'codebox':
			var codebox = targetItem.innerHTML;
			var htmlContent = '<div class="codebox"><pre><code>' + codebox + "</code></pre></div>";
			output.insertAdjacentHTML('beforeend', htmlContent);
			break;
		case 'other':
			var other = targetItem.innerHTML;
			var htmlContent = '<div class="other">' + other + "</div>";
			output.insertAdjacentHTML('beforeend', htmlContent);
			break;
	}
}

loadXML();
