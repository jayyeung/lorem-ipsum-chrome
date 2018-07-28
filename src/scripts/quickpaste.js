const common = {
	contexts: ['editable'],
	onclick: quickPaste
}

function quickPaste() {
	alert('yes');
}

// Context Menus
const menuConfig = {
	title: 'Lorem Clipsum - Quick Paste',
	id: 'quick-paste',
	...common
};

const separator = {
	type: 'separator',
	parentId: 'quick-paste',
	id: 'separate'
};

const defaultPaste = {
	title: 'Paste with current settings',
	parentId: 'quick-paste',
	id: 'default-paste',
	...common
};

chrome.contextMenus.create(menuConfig);
chrome.contextMenus.create(defaultPaste);
chrome.contextMenus.create(separator);

// Custom Options
let customPaste = {
	title: '5 paragraphs, 50 words each',
	parentId: 'quick-paste',
	id: 'custom-paste',
	...common
};

const storageArea = chrome.storage.sync;
storageArea.get('quick_paste_options', (data) => {
	data.forEach(() => {
		chrome.contextMenus.create(customPaste);
	});
});


let open = false;
chrome.browserAction.onClicked.addListener((tab) => {
	alert('yes');
	fetch(chrome.extension.getURL('/popup.html'))
	.then((data) => {
		document.body.innerHTML += data;

	});
});
