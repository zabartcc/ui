import {zabApi} from '@/helpers/axios.js';

export const SidebarMixin = {
	methods: {
		getPilotsOnline() {
			return zabApi.get('/online/pilots').then(response => response.data).catch((err) => { console.log(err);  });
		},
		getAtcOnline() {
			return zabApi.get('/online/atc').then(response => response.data).catch((err) => { console.log(err); });
		}
	}
};