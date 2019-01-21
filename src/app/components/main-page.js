import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import IpsumGenerator from '../lib/ipsum-generator';
import Anims from '../lib/animations';

@inject('routeStore', 'settingsStore', 'toggleModal')
@observer
export default class MainPage extends Component {
	state = {
		selectedCopy: false,
		copyOutput: '',

		...(this.props.settingsStore).settings
	};

	ipsumGenerator = new IpsumGenerator();
	textArea = React.createRef();

	componentDidMount() {
		// onSelect doesn't work with ShadowDOM due to
		// event bubbling issues — Manually adding event
		(this.textArea).current.addEventListener('select', this.onSelectCopy);
		document.addEventListener('copy', this.onCopy);

		// load settings
		const checkSettings = setInterval(() => {
			let settingsStore = this.props.settingsStore;
			if (!settingsStore.loaded) return;
			clearInterval(checkSettings);
			this.setState({...settingsStore.settings});
			this.generateIpsum();
			this.selectAllCopy();
		}, 100);

		// select text on modal open
		chrome.runtime.onMessage.addListener((msg, sender, res) => {
			if (msg.INJECT) setTimeout(this.selectAllCopy, 100);
		});
	}

	componentWillUnmount() {
		// remove listeners
		document.removeEventListener('select', this.onSelectCopy);
		document.removeEventListener('copy', this.onCopy);
	}

	// Ipsum functions
	generateIpsum = () => {
		const { paragraphs, words } = this.state;
		const output = this.ipsumGenerator.generate(paragraphs, words);
		this.setState({copyOutput: output});
	}

	inputChanged = ({target}) => {
		if (typeof(this.state[target.name]) !== 'undefined') {
			let value = (typeof(target.checked) !== 'undefined') ?
				target.checked : target.value;

			if (target.type === 'number') {
				value = Math.max(Math.min(target.value, target.max), target.min);
				this.setState({
					[target.name]: value
				},
				this.generateIpsum);

			} else this.setState({[target.name]: value});
		}
	}

	inputSelect = ({target}) => {target.select();}

	// Copy functions
	selectAllCopy = () => { (this.textArea).current.select(); }
	unselectCopy = () => {
		if (window.getSelection)
			window.getSelection().removeAllRanges();
		this.onUnselectCopy();
	}

	onUnselectCopy = () => { this.setState({selectedCopy: false}); }
	onSelectCopy = ({target}) => {
		const copyLen = (this.state.copyOutput).length;
		const selStart = target.selectionStart;
		const selEnd = target.selectionEnd;

		if ((selStart === 0 && selEnd === copyLen) || (selStart === selEnd))
			this.setState({selectedCopy: false});
		else this.setState({selectedCopy: true});
	}

	copyText = () => {
		// if user not selecting any particular copy
		if (!this.state.selectedCopy)
			this.selectAllCopy();
		document.execCommand('copy');
	}

	onCopy = (e) => {
		// check if copied text is from textarea
		if (e.path[0] && (e.path[0] === (this.textArea).current)) {
			e.preventDefault();
			let copyText = window.getSelection().toString();

			// uppercase first letter
			copyText = copyText.charAt(0).toUpperCase() + copyText.substr(1);

			// if wants <p> tags
			if (this.state['include-ptags'])
				copyText = copyText.replace(/(.+?)(\n|$)+/g, '<p>$1</p>\n\n');

			if (e.clipboardData)
				e.clipboardData.setData('Text', copyText);

			// auto close modal if selected option
			let cb = null;
			if (this.state['auto-close'])
				cb = () => { this.props.toggleModal(false) };

			// blink animation
			Anims.blink(this.textArea.current, cb);
		}
	}

	render() {
		const { routeStore } = this.props;
		const { selectedCopy, copyOutput } = this.state;

		return (
			<div className='c-modal-main'>
				<div className='c-modal__panel u-pr-28'>
					<div className='o-media__fluid'>
						<input id='pgraphs' type='number' min='1' max='20'
						name='paragraphs' value={this.state['paragraphs']}
						onChange={this.inputChanged} onFocus={this.inputSelect}/>
						<label htmlFor='pgraphs'>Paragraphs</label>

						<input id='words' type='number' min='1' max='500' step='50'
						name='words' value={this.state['words']}
						onChange={this.inputChanged} onFocus={this.inputSelect}/>
						<label htmlFor='words'>Words</label>
					</div>

					<button className={`c-modal-main__copy
					${(selectedCopy) ? 'c-modal-main__copy--selected' : ''}`}
					onClick={this.copyText}>
						<img className='u-mr-8' src={chrome.extension.getURL('icons/copy-icon.svg')}/>
						{(selectedCopy) ? 'Copy select' : 'Copy all'}
					</button>
				</div>

				<div className='c-modal__panel u-pv-8 u-pr-28'>
					<div className='o-media__fluid'>
						<input id='include-p' type='checkbox' name='include-ptags' value={!this.state['include-ptags']}
						checked={this.state['include-ptags']} onClick={this.inputChanged}/>
						<label htmlFor='include-p' className='u-mr-32'>include &lt;p&gt; tags</label>
					</div>

					<button className='c-modal-main__settings u-ph-12'
					onClick={() => routeStore.setRoute('/settings')}>
						<img className='u-mr-8' src={chrome.extension.getURL('icons/gear-icon.svg')}/>
						Settings
					</button>
				</div>

				<div className={`c-modal-main__textarea
					${(selectedCopy) ? 'c-modal-main__textarea--selected' : ''}`}>

					<div className='c-modal-main__label'>
						<img className='u-mr-12' src={chrome.extension.getURL('icons/clip-icon.svg')}/>
						{`${this.state['paragraphs']} paragraphs with ${this.state['words']} words each`}
					</div>

					<textarea readOnly spellCheck='false'
					ref={this.textArea}
					onFocus={this.selectAllCopy}
					onBlur={() => setTimeout(this.unselectCopy, 125)}
					onMouseUp={this.onUnselectCopy}
					value={copyOutput}>
					</textarea>
				</div>
			</div>
		);
	}
}
