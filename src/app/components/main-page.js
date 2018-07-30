import React, { Component } from 'react';

export default class MainPage extends Component {
	state = {
		selectedCopy: false,
		copyOutput: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, debitis! Eligendi neque quisquam dignissimos est sit rerum soluta dolore ullam repellat vitae incidunt tenetur ex, aliquid delectus aliquam sed. Nisi, rerum deleniti. Beatae autem error atque accusantium quae, harum explicabo doloremque recusandae doloribus aliquam nisi sint quisquam maiores corporis voluptatem?'
	};

	textArea = React.createRef();
	componentDidMount() {
		// onSelect doesn't work with ShadowDOM due to
		// event bubbling issues
		(this.textArea).current.addEventListener('select', this.onSelectCopy);
	}

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
		if (!this.state.selectedCopy)
			(this.textArea).current.select();
		document.execCommand('copy');
	}

	render() {
		return (
			<div className='c-modal-main'>
				<div className='c-modal__panel u-pr-16'>
					<div className='o-media__fluid'>
						<input id='pgraphs' type='number' min='1' max='15'/>
						<label htmlFor='pgraphs' className='u-mr-28'>Paragraphs</label>

						<input id='words' type='number' min='1' max='500'/>
						<label htmlFor='words'>Words each</label>
					</div>

					<button className='c-modal-main__copy'
					onClick={this.copyText}>
						{(this.state.selectedCopy) ? 'Copy selected' : 'Copy all'}
					</button>
				</div>

				<div className='c-modal__panel'>
					<div className='o-media__fluid'>
						<input id='include-p' type='checkbox'/>
						<label htmlFor='include-p'>include &lt;p&gt; tags</label>
					</div>

					<button className='c-modal-main__settings'>
						Settings
					</button>
				</div>

				<div className='c-modal-main__textarea'>
					<textarea readOnly spellCheck='false'
					ref={this.textArea}
					onFocus={this.selectAllCopy}
					onMouseUp={this.onUnselectCopy}
					value={this.state.copyOutput}>
					</textarea>
				</div>
			</div>
		);
	}
}
