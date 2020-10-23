import axios from '@/helpers/axios.js';

export const SidebarMixin = {
    methods: {
        getPilotsOnline() {
            return axios.get('/online/pilots').then(response => response.data).catch((err) => { if(err) throw err });
        },
        getAtcOnline() {
            return axios.get('/online/atc').then(response => response.data).catch((err) => { if(err) throw err });
        }
    }
};