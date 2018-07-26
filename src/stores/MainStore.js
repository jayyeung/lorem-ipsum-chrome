import { observable, action, computed } from 'mobx';

import LoremIpsum from '../lib/LoremIpsum';

class MainStore {
	generator = new LoremIpsum();

	@observable params = {
		paragraphs: 5,
		words: 10
	};

	@observable lorem = '';

	@action getLorem() {
		const { paragraphs, words } = this.params;
		console.log(this.generator.generate(paragraphs, words));
		this.lorem = this.generator.generate(paragraphs, words);
	}
}

const store = new MainStore();
export default store;
