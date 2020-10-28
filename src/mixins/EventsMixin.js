import axios from '@/helpers/axios.js';

export const EventsMixin = {
    methods: {
        getUpcomingEventsMixin() {
            return axios.get('/event').then(response => response.data).catch((err) => { console.log(err); });
        },
        getHistoricEventsMixin() {
            return axios.get('/event/archive').then(response => response.data).catch((err) => { console.log(err); });
        },
        getEventByIdMixin(id) {
            return axios.get(`/event/id/${id}`).then(response => response.data).catch((err) => { console.log(err); });
        },
        getPositionsMixin(id) {
            return axios.get(`/event/assignments/${id}`).then(response => response.data).catch((err) => { console.log(err); return err; });
		},
		cancelSignupMixin(event, user) {
			return axios.put(`/event/assignments/${event}/user/${user}`).then(response => response.data).catch((err) => { console.log(err); return err});
		}
    }
};