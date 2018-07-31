chrome.browserAction.onClicked.addListener((tab) => {
	chrome.tabs.sendMessage(tab.id, {INJECT:'?'}, (res = {}) => {
		if (!res.HAS_INJECTED) {
			chrome.tabs.executeScript(null, {
				file: 'main.js'
			});
		}
	});
});
