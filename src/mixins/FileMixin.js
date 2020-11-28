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
		},
		getSingleDownloadMixin(id) {
			return zabApi.get(`/file/downloads/${id}`).then(response => response.data).catch((err) => console.log(err));
		},
		getDocumentsMixin() {
			return zabApi.get('/file/documents').then(response => response.data).catch((err) => console.log(err));
		},
		getSingleDocumentMixin(slug) {
			return zabApi.get(`/file/documents/${slug}`).then(response => response.data).catch((err) => console.log(err));
		}
	}
};