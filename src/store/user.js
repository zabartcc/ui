import {zabApi} from '@/helpers/axios.js';
import router from '@/router/index.js';

export default {
	namespaced: true,
	state: {
		userQueryComplete: false,
		user: {
			data: null,
			token: localStorage.getItem('token') || null,
			isLoggedIn: false,
		}
	},
	actions: {
		getUser: async ({commit, state}) => {
			if(state.user.token) { // we have a token already set
				const { data } = await zabApi.get('/user', {
					headers: {
						Authorization: `Bearer ${state.user.token}`
					}
				}).catch(err => {
					console.log(err);
					localStorage.removeItem('token'); // remove token in case an invalid token is set from a previous session
					router.push('/');
				});
				if(data) {
					commit('setUser', data);
					commit('setLoggedIn', true);
				}
			}
			commit('setQuery', true);
		},
	},
	mutations: {
		setUser (state, user) {
			state.user.data = user;
		},
		setToken (state, token) {
			localStorage.setItem('token', token);
			state.user.token = token;
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
		getToken: state => state.user.token
	}
};