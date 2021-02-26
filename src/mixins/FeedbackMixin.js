import {zabApi} from '@/helpers/axios.js';

export const FeedbackMixin = {
	methods: {
		getFeedbackMixin(page, limit) {
			return zabApi.get('/feedback', {
				params: {
					page: page, 
					limit: limit
				}
			}).then(response => response.data.data).catch((err) => console.log(err));
		},
		getControllersMixin() {
			return zabApi.get('/feedback/controllers').then(response => response.data.data).catch((err) => console.log(err));
		},
		getUnapprovedMixin() {
			return zabApi.get('/feedback/unapproved').then(response => response.data.data).catch((err) => console.log(err));
		},
		getMyFeedbackMixin(controller, page, limit) {
			return zabApi.get(`/feedback/${controller}`, {
				params: {
					page: page,
					limit: limit
				}
			}).then(response => response.data).catch((err) => console.log(err));
		}
	}
};