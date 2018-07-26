import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { LoremInput } from './LoremInput';

@inject('MainStore')
@observer
export class Main extends Component {
	copyArea = React.createRef()

	state = {
		customSelect: false
	}

	copySelected = () => {
		if (!this.state.customSelect)
			console.log(this.copyArea.current.select());
		document.execCommand('copy');
	}

	selectCopy = ({ target }) => {
		const start = target.selectionStart;
		const end = target.selectionEnd;

		console.log('start', start, 'end', end);

		if ((start !== 0 && end < this.props.MainStore.lorem.length) && start !== end)
			this.setState({ customSelect: true });
		else
			this.setState({ customSelect: false });
	}

	onFocus = (e) => {
		e.target.select();
	}

	setParams = (val, type) => {
		this.props.MainStore.params[type] = val;
		this.props.MainStore.getLorem();
	}

	render() {
		return (
			<div className='c-main'>
				<LoremInput onParams={this.setParams}/>
				<button onClick={this.copySelected}>
					{(this.state.customSelect) ? 'Copy Selected' : 'Copy All'}
				</button>

				<textarea ref={this.copyArea}
				readOnly onFocus={this.onFocus}
				onSelect={this.selectCopy}
				value={this.props.MainStore.lorem}>
				</textarea>

				<button>Reset</button>
			</div>
		);
	}
}
