import {zabApi} from '@/helpers/axios.js';

export const EventsMixin = {
	methods: {
		getUpcomingEventsMixin() {
			return zabApi.get('/event').then(response => response.data).catch((err) => { console.log(err); });
		},
		getHistoricEventsMixin() {
			return zabApi.get('/event/archive').then(response => response.data).catch((err) => { console.log(err); });
		},
		getEventMixin(slug) {
			return zabApi.get(`/event/${slug}`).then(response => response.data).catch((err) => { console.log(err); });
		},
		getPositionsMixin(slug) {
			return zabApi.get(`/event/${slug}/positions`).then(response => response.data).catch((err) => { console.log(err); });
		},
		putSignupMixin(slug, user, requests) {
			return zabApi.put(`/event/${slug}/signup/${user}`, {requests}).then(response => response.data).catch((err) => { console.log(err); });
		},
		deleteSignupMixin(slug, user) {
			return zabApi.delete(`/event/${slug}/signup/${user}`).then(response => response.data).catch((err) => { console.log(err); });
		},
		deleteEventMixin(slug, auth) {
			return zabApi.delete(`/event/${slug}`, {
				headers: {
					Authorization: auth
				}
			}).then(response => response.data).catch((err) => { console.log(err); });
		},
		saveAssignmentsMixin(slug, positions, auth) {
			return zabApi.put(`/event/${slug}/assign`, {
				assignment: positions
			}, {
				headers: {
					Authorization: auth
				}
			}).then(response => response.data).catch((err) => { console.log(err); });
		},
		notifyAssignmentsMixin(slug, positions, auth) {
			return zabApi.put(`/event/${slug}/notify`, {
				assignment: positions
			}, {
				headers: {
					Authorization: auth
				}
			}).then(response => response.data).catch((err) => { console.log(err); });
		},
		closeSignupsMixin(slug, auth) {
			return zabApi.put(`/event/${slug}/close`, {}, {
				headers: {
					Authorization: auth
				}
			}).then(response => response.data).catch((err) => { console.log(err); });
		}
	}
};