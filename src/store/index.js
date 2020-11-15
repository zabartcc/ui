import { createStore } from 'vuex';

import user from './user';
import visit from './visit';

export default createStore({
	modules: {
		user,
		visit
	}
});