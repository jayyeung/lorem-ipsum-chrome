import { observable, action, computed } from 'mobx';

class SettingsStore {
	constructor() {
		this.loadSettings();
	}

	// Default Settings
	@observable settings = {
		paragraphs: 3,
		words: 100,
		'include-ptags': false,
		'auto-close': false
	};

	loadSettings() {
		chrome.storage.sync.get('settings', (data) => {
			if (data) this.settings = data.settings;
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
			settings: {...settings, ...changes}
		}, () => {
			this.loadSettings();
			this.resetChanges();
			if (callback) callback();
		});
	}
}

const settingsStore = new SettingsStore();
export default settingsStore;
