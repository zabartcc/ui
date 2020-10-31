import axios from '@/helpers/axios.js';

export const ControllerMixin = {
	methods: {
		getControllersMixin() {
			return axios.get('/controller').then(response => response.data).catch((err) => { console.log(err); });
		},
		getControllerMixin(cid) {
			return axios.get(`/controller/${cid}`).then(response => response.data).catch((err) => { console.log(err); });
		}
	}
};