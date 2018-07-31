import { observable, action } from 'mobx';

class SettingsStore {
	constructor() {
		this.loadSettings();
	}

	@observable settings = {};
	@observable changes = {};

	loadSettings() {
		chrome.storage.sync.get('changes', (data) => {
			this.settings = data;
		});
	}

	@action commitChange(params = {}) {
		this.changes = {...this.changes, ...params};
	}

	@action saveChanges(callback) {
		const { settings, changes } = this;

		chrome.storage.sync.set({
			changes: {...settings, ...changes}
		}, () => {
			this.loadSettings();
			if (callback) callback();
		});
	}
}

const settingsStore = new SettingsStore();
export default settingsStore;
