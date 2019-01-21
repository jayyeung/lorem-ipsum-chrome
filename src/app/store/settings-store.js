import { observable, action, computed } from 'mobx';

class SettingsStore {
	constructor() {
		this.loadSettings();
	}

	// Default Settings
	@observable loaded = false;
	@observable settings = {
		paragraphs: 3,
		words: 100,
		'include-ptags': false,
		'auto-close': false
	};

	loadSettings() {
		this.loaded = false;
		chrome.storage.sync.get('settings', (data) => {
			if (data.settings) this.settings = data.settings;
			this.loaded = true;
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
