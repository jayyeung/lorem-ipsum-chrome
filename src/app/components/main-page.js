import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import IpsumGenerator from '../lib/ipsum-generator';

@inject('routeStore', 'settingsStore', 'closeModal')
@observer
export default class MainPage extends Component {
	state = {
		selectedCopy: false,
		copyOutput: '',

		// map default settings to state
		...(this.props.settingsStore).settings
	};

	ipsumGenerator = new IpsumGenerator();
	textArea = React.createRef();

	/*
	componentWillMount() {
		// load any sessional settings
		chrome.storage.local.get('session', (data) => {
			this.setState({ ...data.session });
		});
	}
	*/

	componentDidMount() {
		// onSelect doesn't work with ShadowDOM due to
		// event bubbling issues — Manually adding event
		(this.textArea).current.addEventListener('select', this.onSelectCopy);
		document.addEventListener('copy', this.onCopy);

		this.generateIpsum();
		this.selectAllCopy();
	}

	componentWillUnmount() {
		// remove listeners
		document.removeEventListener('select', this.onSelectCopy);
		document.removeEventListener('copy', this.onCopy);

		// save sessional settings
		// chrome.storage.local.set({session: this.state});
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

	// Copy functions
	selectAllCopy = () => { (this.textArea).current.select(); }
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
				copyText = copyText.replace(/(.+?)(\n|$)+/g, '<p>$1</p>\n');

			// auto close modal if selected option
			if (this.state['auto-close'])
				this.props.closeModal();

			if (e.clipboardData)
				e.clipboardData.setData('Text', copyText);
		}
	}

	render() {
		const { routeStore } = this.props;
		const { selectedCopy, copyOutput } = this.state;

		return (
			<div className='c-modal-main'>
				<div className='c-modal__panel u-pr-20'>
					<div className='o-media__fluid'>
						<input id='pgraphs' type='number' min='1' max='10'
						name='paragraphs' value={this.state['paragraphs']}
						onChange={this.inputChanged}/>
						<label htmlFor='pgraphs'>Paragraphs</label>

						<input id='words' type='number' min='1' max='500' step='50'
						name='words' value={this.state['words']}
						onChange={this.inputChanged}/>
						<label htmlFor='words'>Words</label>
					</div>

					<button className={`c-modal-main__copy
					${(selectedCopy) ? 'c-modal-main__copy--selected' : ''}`}
					onClick={this.copyText}>
						{(selectedCopy) ? 'Copy select' : 'Copy all'}
					</button>
				</div>

				<div className='c-modal__panel u-pv-12'>
					<div className='o-media__fluid'>
						<input id='include-p' type='checkbox' name='include-ptags'
						defaultChecked={this.state['include-ptags']} onClick={this.inputChanged}/>
						<label htmlFor='include-p' className='u-mr-32'>include &lt;p&gt; tags</label>
					</div>

					<button className='c-modal-main__settings u-ph-12'
					onClick={() => routeStore.setRoute('/settings')}>
						Settings
					</button>
				</div>

				<div className={`c-modal-main__textarea
					${(selectedCopy) ? 'c-modal-main__textarea--selected' : ''}`}>

					<div className='c-modal-main__label'>Generated Paragraphs</div>

					<textarea readOnly spellCheck='false'
					ref={this.textArea}
					onFocus={this.selectAllCopy}
					onBlur={() => setTimeout(this.onUnselectCopy, 125)}
					onMouseUp={this.onUnselectCopy}
					value={copyOutput}>
					</textarea>
				</div>
			</div>
		);
	}
}
