import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';

import ShadowDOM from 'react-shadow';
import ReactDOM from 'react-dom';

const styles = chrome.extension.getURL('main.css');
import Anims from './lib/animations';
import Router from './components/router';
import stores from './store';

@observer
class Modal extends Component {
	state = { visible: true };
	modal = React.createRef();

	componentDidMount() {
		// close modal on click outside
		document.addEventListener('click', this.hideModalBlur);
	}

	hideModalBlur = ({target}) => {
		if (!this.state.visible) return;
		if (!(target.id === 'shadow-dom'))
			this.toggleModal(false);
	}

	toggleModal = (isVisible) => {
		const { visible } = this.state;
		const value = (typeof(isVisible) !== 'undefined') ? isVisible : !visible;
		this.setState({visible: value});
		Anims.modalToggle(this.modal.current, value);
	}

	render() {
		return (
			<ShadowDOM include={[styles]}>
				<div id='shadow-dom'>
					<Provider {...stores} toggleModal={this.toggleModal}>
						<div id='modal' ref={this.modal}>
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
