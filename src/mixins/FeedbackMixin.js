import {zabApi} from '@/helpers/axios.js';

export const FeedbackMixin = {
	methods: {
		getFeedbackMixin(page, limit) {
			return zabApi.get('/feedback', {
				params: {
					page: page, 
					limit: limit
				}
			}).then(response => response.data).catch((err) => console.log(err));
		},
		getControllersMixin() {
			return zabApi.get('/feedback/controllers').then(response => response.data).catch((err) => console.log(err));
		},
		getUnapprovedMixin(auth) {
			return zabApi.get('/feedback/unapproved', {
				headers: {
					Authorization: auth
				}
			}).then(response => response.data).catch((err) => console.log(err));
		},
		approveFeedbackMixin(id, auth) {
			return zabApi.put(`/feedback/approve/${id}`, {}, {
				headers: {
					Authorization: auth
				}
			}).then(response => response.data).catch((err) => console.log(err));
		},
		rejectFeedbackMixin(id, auth) {
			return zabApi.put(`/feedback/reject/${id}`, {}, {
				headers: {
					Authorization: auth
				}
			}).then(response => response.data).catch((err) => console.log(err));
		}
	}
};