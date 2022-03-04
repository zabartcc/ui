import { zabApi } from '@/helpers/axios.js';

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
				const { data: user } = await zabApi.get('/user');
				if(user.ret_det.code === 200) {
					commit('setUser', user.data);
					commit('setLoggedIn', true);
				} 
				if(user.ret_det.code === 403) {
					console.error(user.ret_det.message);
				}
			}
			commit('setQuery', true);
		},
		logout: async ({commit}) => {
			zabApi.get('/user/logout').then(() => {
				commit('setUser', null);
				commit('setLoggedIn', false);
			}).catch((err) => {
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
		getUserId: state => state.user.data._id,
	}
};