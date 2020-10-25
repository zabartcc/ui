import axios from '@/helpers/axios.js';

export const EventsMixin = {
    methods: {
        getUpcomingEventsMixin() {
            return axios.get('/event/upcoming').then(response => response.data).catch((err) => { console.log(err); });
        },
        getHistoricEventsMixin() {
            return axios.get('/event/past').then(response => response.data).catch((err) => { console.log(err); });
        }
    }
};