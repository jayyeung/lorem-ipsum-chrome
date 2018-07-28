import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Popup extends Component {
	render() {
		return (
			<div className='c-popup'>
				<div className='c-popup__params o-panel'>
					<div className='o-panel__fluid'>
						<input type='number' value='5' min='1' max='30'/>
					</div>
					<button>Copy Text</button>
				</div>

				<div className='o-panel'>
					<div className='o-panel__fluid'>
						<strong>5</strong> Paragraphs, <strong>50</strong> words each
					</div>
					<button className='o-link'>Settings</button>
				</div>

				<div className='c-popup__textarea'>
					<textarea spellCheck='false'
					defaultValue='Repellendus, placeat.'>
					</textarea>
				</div>
			</div>
		);
	}
};

window.onload = () => {
	const root = document.getElementById('app');
	ReactDOM.render(<Popup />, root);
};
