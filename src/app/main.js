import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import ShadowDOM from 'react-shadow';
import ReactDOM from 'react-dom';

const styles = chrome.extension.getURL('main.css');
import Router from './components/router';
import stores from './store';

@observer
class Modal extends Component {
	state = { visible: true };

	toggleModal = () => {
		const { visible } = this.state;
		this.setState({visible: !visible});
	}

	render() {
		return (
			<ShadowDOM include={[styles]}>
				<div id='shadow-dom'>
					<Provider {...stores}>
						<div id='modal' style={{display: (!this.state.visible) ? 'none' : ''}}>
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
const App = ReactDOM.render(<Modal />, target);

chrome.runtime.onMessage.addListener((msg, sender, res) => {
	if (msg.INJECT) res({HAS_INJECTED:true});
	App.toggleModal();
});
