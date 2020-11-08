import axios from '@/helpers/axios.js';

export const EventsMixin = {
	methods: {
		getUpcomingEventsMixin() {
			return axios.get('/event').then(response => response.data).catch((err) => { console.log(err); });
		},
		getHistoricEventsMixin() {
			return axios.get('/event/archive').then(response => response.data).catch((err) => { console.log(err); });
		},
		getEventMixin(slug) {
			return axios.get(`/event/${slug}`).then(response => response.data).catch((err) => { console.log(err); });
		},
		getPositionsMixin(slug) {
			return axios.get(`/event/${slug}/positions`).then(response => response.data).catch((err) => { console.log(err); return err; });
		},
		putSignupMixin(slug, user, requests) {
			return axios.put(`/event/${slug}/signup/${user}`, {requests}).then(({data}) => data);
		},
		deleteSignupMixin(slug, user) {
			return axios.delete(`/event/${slug}/signup/${user}`).then(response => response.data);
		},
		deleteEventMixin(slug, auth) {
			return axios.delete(`/event/${slug}`, {
				headers: {
					Authorization: auth
				}
			}).then(response => response.data);
		}
	}
};