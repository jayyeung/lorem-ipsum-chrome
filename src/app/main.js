import React, { Component } from 'react';
import ShadowDOM from 'react-shadow';
import ReactDOM from 'react-dom';

class Modal extends Component {
	render() {
		return (
			<ShadowDOM>
				<div className='c-popup'>
					test
				</div>
			</ShadowDOM>
		);
	}
};


window.onload = () => {
	const root = document.createElement('div');
	(document.body).appendChild(root);
	root.id = 'lorem-app';

	const target = document.getElementById(root.id);
	ReactDOM.render(<Modal />, target);
};
