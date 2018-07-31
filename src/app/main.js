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
	modal = React.createRef();

	componentDidMount() {
		document.addEventListener('mousedown', this.toggleModalBlur);
	}

	toggleModalBlur = (e) => {
		if (this.modal && !this.modal.contains(e.target))
			this.toggleModal();
	}

	toggleModal = () => {
		const { visible } = this.state;
		this.setState({visible: !visible});
	}

	render() {
		const { visible } = this.state;

		return (
			<ShadowDOM include={[styles]}>
				<div id='shadow-dom'>
					<Provider {...stores}>
						<div id='modal' ref={this.modal}
						className={(!visible) ? 'hidden' : ''}>
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
