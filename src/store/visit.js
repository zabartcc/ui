import {zabApi} from '@/helpers/axios.js';
import router from '@/router/index.js';

export default {
	namespaced: true,
	state: {
		visitQueryComplete: false,
		visit: {
			data: null,
			token: localStorage.getItem('visit_token') || null,
			isLoggedIn: false,
		}
	},
	actions: {
		getVisit: async ({commit, state}) => {
			if(state.visit.token) { // we have a token already set
				const { data } = await zabApi.get('/user/visit', {
					headers: {
						Authorization: `Bearer ${state.visit.token}`
					}
				}).catch(err => {
					console.log(err);
					localStorage.removeItem('token'); // remove token in case an invalid token is set from a previous session
					router.push('/');
				});
				if(data) {
					commit('setVisit', data);
					commit('setVisitLoggedIn', true);
				}
			}
			commit('setVisitQuery', true);
		},
	},
	mutations: {
		setVisit (state, visit) {
			state.visit.data = visit;
		},
		setVisitToken (state, token) {
			localStorage.setItem('visit_token', token);
			state.visit.token = token;
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
		getVisitvisitData: state => state.visit.data,
		getVisitToken: state => state.visit.token
	}
};