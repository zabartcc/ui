import {zabApi} from '@/helpers/axios.js';
import router from '@/router/index.js';

export default {
	namespaced: true,
	state: {
		visitQueryComplete: false,
		visit: {
			data: null,
			isLoggedIn: false,
		}
	},
	actions: {
		getVisit: async ({ commit, state }) => {
			if(!state.visit.isLoggedIn) { // we have a token already set
				zabApi.get('/user/visit').then(({data}) => {
					if(data) {
						commit('setVisit', data);
						commit('setVisitLoggedIn', true);
					}
				}).catch((err) => {
					console.log(err);
					return router.push('/');
				});
			}
			commit('setVisitQuery', true);
		},
		logout: async ({ commit }) => {
			zabApi.get('/user/visit/logout').then(() => {
				commit('setVisit', null);
				commit('setVisitLoggedIn', false);
			}).catch((err) => {
				console.log(err);
			});
		}
	},
	mutations: {
		setVisit (state, visit) {
			state.visit.data = visit;
		},
		setVisitQuery (state, query) {
			state.visitQueryComplete = query;
		},
		setVisitLoggedIn (state, loggedIn) {
			state.visit.isLoggedIn = loggedIn;
		},
	},
	getters: {
		hasQueryCompleted: state => state.visitQueryComplete,
	}
};