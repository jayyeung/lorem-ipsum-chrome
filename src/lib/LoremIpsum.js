import Text from './text.json';

// INEFFICIENT
// Todo: Fix sentence
export default class LoremIpsum {
	generate(paragraphs, words) {
		let output = '';

		for (let i = 0; i < paragraphs; i++) {
			const paragraph = this.generateParagraph(words);
			output += paragraph + '\n\n';
		}
		return output;
	}

	generateParagraph(words) {
		const { capitalize, random, randomObj } = this;
		const endSymbols = ['.', '…', '!', '?', ';'];
		const minLength = 7, maxLength = 15;

		let sentenceLength = random(minLength, maxLength);
		let maxCommas = random(0, words/sentenceLength);
		let newSentence = true;

		let sentence = '';
		for (let i = 0; i < words; i++) {
			let word = randomObj(Text.words);
			const addComma = random(0, 2);

			// beginning word
			if (newSentence) {
				word = capitalize(word);
				newSentence = false;
			}

			// end word or new sentence
			if ((i % sentenceLength-1 === 0) || (i >= words-1)) {
				word += randomObj(endSymbols);

				sentenceLength = random(minLength, maxLength);
				maxCommas = random(0, words/sentenceLength);
				newSentence = true;
			}

			// add mid symbol
			else if (addComma && maxCommas) {
				word += ',';
				maxCommas--;
			}

			sentence += ' ' + word;
		}

		return sentence.trim();
	}

	random = (min, max) => {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	randomObj = (Arr) => {
		const randIndex = this.random(0, Arr.length);
		return Arr[randIndex];
	}

	capitalize = (word) => {
		const capital = word.charAt(0).toUpperCase();
		const remainder = word.slice(1);
		return capital + remainder;
	}
}
