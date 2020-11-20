import {zabApi} from '@/helpers/axios.js';

export const ControllerMixin = {
	methods: {
		getControllersMixin() {
			return zabApi.get('/controller').then(response => response.data).catch((err) => console.log(err));
		},
		getControllerMixin(cid) {
			return zabApi.get(`/controller/${cid}`).then(response => response.data).catch((err) => console.log(err));
		},
		getUsedOiMixin() {
			return zabApi.get('/controller/oi').then(response => response.data).catch((err) => console.log(err));
		},
		submitApplicationMixin(data) {
			return zabApi.post('/controller/visit', data).then(response => response.data).catch((err) => console.log(err));
		}
	}
};