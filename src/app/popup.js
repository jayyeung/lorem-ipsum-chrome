import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Popup extends Component {
	render() {
		return (
			<div>Test</div>
		);
	}
};

window.onload = () => {
	const root = document.getElementById('app');
	ReactDOM.render(<Popup />, root);
};
