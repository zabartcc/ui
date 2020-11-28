import {zabApi} from '@/helpers/axios.js';

export const FileMixin = {
	methods: {
		getDownloadsMixin() {
			return zabApi.get('/file/downloads').then(response => response.data).catch((err) => console.log(err));
		},
		deleteDownloadMixin(id, auth) {
			return zabApi.delete(`/file/downloads/${id}`, {
				headers: {
					Authorization: auth
				}
			}).then(response => response.data).catch((err) => console.log(err));
		}
	}
};