import { observable, action, computed } from 'mobx';

class RouteStore {
	@observable currentRoute = '';

	@action setRoute(route) {
		this.currentRoute = route;
	}
}

const routeStore = new RouteStore();

export default { routeStore };
