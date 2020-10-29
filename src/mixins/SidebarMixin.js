import axios from '@/helpers/axios.js';

export const SidebarMixin = {
	methods: {
		getPilotsOnline() {
			return axios.get('/online/pilots').then(response => response.data).catch((err) => { console.log(err);  });
		},
		getAtcOnline() {
			return axios.get('/online/atc').then(response => response.data).catch((err) => { console.log(err); });
		}
	}
};