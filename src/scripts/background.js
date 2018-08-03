let loading = false;
chrome.browserAction.onClicked.addListener((tab) => {
	chrome.tabs.sendMessage(tab.id, {INJECT:'?'}, (res = {}) => {
		if (!res.HAS_INJECTED && !loading) {
			loading = true;
			chrome.tabs.executeScript(null, {
				file: 'main.js'
			}, () => {loading = false});
		}
	});
});
