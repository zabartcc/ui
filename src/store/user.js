import {zabApi} from '@/helpers/axios.js';
import router from '@/router/index.js';

export default {
	namespaced: true,
	state: {
		userQueryComplete: false,
		user: {
			data: null,
			isLoggedIn: false
		}
	},
	actions: {
		getUser: async ({commit, state}) => {
			if(!state.user.isLoggedIn) {
				zabApi.get('/user').then(({data}) => {
					if(data) {
						commit('setUser', data);
						commit('setLoggedIn', true);
						return;
					}
				}).catch((err) => {
					console.log(err);
					return router.push('/');
				});
			}
			commit('setQuery', true);
		},
		logout: async ({commit}) => {
			zabApi.get('/user/logout').then(() => {
				commit('setUser', null);
				commit('setLoggedIn', false);
			}).catch(err => {
				console.log(err);
			});
		}
	},
	mutations: {
		setUser (state, user) {
			state.user.data = user;
		},
		setQuery (state, query) {
			state.userQueryComplete = query;
		},
		setLoggedIn (state, loggedIn) {
			state.user.isLoggedIn = loggedIn;
		},
	},
	getters: {
		hasQueryCompleted: state => state.userQueryComplete,
		getUserData: state => state.user.data,
	}
};