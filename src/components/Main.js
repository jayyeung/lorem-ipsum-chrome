import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { LoremInput } from './LoremInput';

@inject('MainStore')
@observer
export class Main extends Component {

	onParams = (val, type) => {
		console.log(type, val);
		this.props.MainStore.params[type] = val;
		this.props.MainStore.getLorem();
	}

	render() {
		return (
			<div className='c-main'>
				<LoremInput onParams={this.onParams}/>

				<textarea readOnly
				value={this.props.MainStore.lorem}>
				</textarea>

				<button>Reset</button>
			</div>
		);
	}
}
