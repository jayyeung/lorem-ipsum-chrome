import { observable, actions, computed } from 'mobx';

class ConfigStore {
	@observable defaultParams = {
		paragraphs: 5,
		words: 10
	};

	@observable contextMenuSettings = [];

	constructor() {
		this.paramTypes = Object.keys(this.defaultParams);
	}
}

const store = new ConfigStore();
export default store;
