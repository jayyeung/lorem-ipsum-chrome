import React, { Component } from 'react';
import { observable } from 'mobx';
import { Provider, observer } from 'mobx-react';
import ShadowDOM from 'react-shadow';
import ReactDOM from 'react-dom';

const styles = chrome.extension.getURL('main.css');
import Router from './components/router';
import stores from './store';

@observer
class Modal extends Component {
	render() {
		return (
			<ShadowDOM include={[styles]}>
				<div id='shadow-dom'>
					<Provider {...stores}>
						<div id='modal'>
							<Router/>
						</div>
					</Provider>
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
