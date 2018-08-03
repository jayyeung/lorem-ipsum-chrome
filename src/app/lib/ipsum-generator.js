import defaultTextfile from '../../assets/text/lorem.json';

export default class LoremIpsumGenerator {
	// pre-cond: textfile is .json file
	constructor(textfile, settings) {
		this.text = textfile || defaultTextfile;
		this.settings = settings || {};
	}

	// output X paragraphs, with Y words each
	generate(paragraphs, words) {
		const { text, settings, random, capitalize } = this;

		const minLen = 5;
		const maxLen = 12;
		const symbols = ['.', '!', '?', ','];

		let output = '';
		let randLen, randSymbol, word = '';

		for (let i = 0; i < paragraphs; i++) {
			randLen = random(minLen, maxLen);

			for (let j = 0; j < words; j++) {
				// Concat intro sentence
				if ((i === 0) && j <= (text.intro.length-1)) {
					word = text.intro[j];
				} else {
					const randWord = text.words[random((text.words).length-1)];
					word = randWord;
				}

				if (j === 0) {
					output += capitalize(word);
					continue;
				} else if (randLen <= 0) {
					randSymbol = symbols[random(symbols.length)];
					output += randSymbol;
					if (randSymbol !== ',') word = capitalize(word);
					randLen = random(minLen, maxLen);
				}

				randLen--;
				output += ' ' + word;
			}
			output = output.trim() + '.\n\n';
		}

		return output.trim();
	}

	random(min, max = min) {
		return Math.floor(Math.random() * ((max - min) + min));
	}

	capitalize(word) {
		return (word) ? word[0].toUpperCase() + word.substr(1) : '';
	}

	filter(settings) {

	}
}


/*
import loremIpsum from 'lorem-ipsum';

// TO-DO
// Finish generator, replace npm lorem-ipsum
const IpsumGenerator = (paragraphs, words) => {
	let output = '';
	for (let i = 0; i < paragraphs-1; i++) {
		output += loremIpsum({
			units: 'words',
			count: words
		})
		if (i+1 !== paragraphs) output += '\n\n';
	}
	return output;
}

export default IpsumGenerator;
*/

