import React, { Component } from 'react';
import ShadowDOM from 'react-shadow';
import ReactDOM from 'react-dom';

const styles = chrome.extension.getURL('main.css');
import MainPage from './components/main-page';
import SettingsPage from './components/settings-page';

class Modal extends Component {
	render() {
		return (
			<ShadowDOM include={[styles]}>
				<div id='shadow-dom'>
					<div id='modal'>
						<MainPage />
					</div>
				</div>
			</ShadowDOM>
		);
	}
};

const root = document.createElement('div');
(document.body).appendChild(root);
root.id = 'clipsum-container';

const target = document.getElementById(root.id);
ReactDOM.render(<Modal />, target);
