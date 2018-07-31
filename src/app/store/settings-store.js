import { observable, action, computed } from 'mobx';

class SettingsStore {
	constructor() {
		this.loadSettings();
	}

	// Settings
	@observable settings = {};

	loadSettings() {
		chrome.storage.sync.get('changes', (data) => {
			this.settings = data;
		});
	}

	// Changes made to settings
	@observable changes = {};

	@action commitChange(key, value) {
		this.changes[key] = value;
	}

	@action resetChanges() {
		this.changes = {};
	}

	@computed get hasChanges() {
		return Object.keys(this.changes).length > 0;		
	}

	@action saveChanges(callback) {
		const { settings, changes } = this;

		chrome.storage.sync.set({
			changes: {...settings, ...changes}
		}, () => {
			this.loadSettings();
			this.resetChanges();
			if (callback) callback();
		});
	}
}

const settingsStore = new SettingsStore();
export default settingsStore;
