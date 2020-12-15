import {zabApi} from '@/helpers/axios.js';

export const SidebarMixin = {
	methods: {
		getClientsOnline() {
			return zabApi.get('/online').then(response => response.data).catch((err) => { console.log(err);  });
		},
	}
};