import React from 'react';
import { inject, observer } from 'mobx-react';

import MainPage from './main-page';
import SettingsPage from './settings-page';

const Router = inject('routeStore')(
	observer(({routeStore}) => {
		const route = routeStore.currentRoute;
		switch(route) {
			case '/settings':
				return <SettingsPage />;
			default:
				return <MainPage />;
		};
	}
));

export default Router;
