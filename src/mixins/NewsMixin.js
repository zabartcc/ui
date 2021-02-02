import {zabApi} from '@/helpers/axios.js';

export const NewsMixin = {
	methods: {
		getNewsMixin(page, limit) {
			return zabApi.get('/news', {
				params: {
					page: page, 
					limit: limit
				}
			}).then(response => response.data).catch((err) => console.log(err));
		},
		getArticleMixin(slug) {
			return zabApi.get(`/news/${slug}`).then(response => response.data).catch((err) => console.log(err));
		}
	}
};