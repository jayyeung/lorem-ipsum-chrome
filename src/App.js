import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import './styles/main.scss';

import { Main } from './components/Main';
import Stores from './stores';

class App extends Component {
	render() {
		return (
			<Provider {...Stores}>
				<Main />
			</Provider>
		);
	}
}

export default App;
