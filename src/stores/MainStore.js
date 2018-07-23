class MainStore {
	loremSettings = {
		paragraphs: 10,
		words: 50
	};

	get loremSettings() {
		return this.loremSettings;
	}
}

export const mainStore = new MainStore();
