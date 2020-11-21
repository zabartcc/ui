import axios from 'axios';

axios.defaults.withCredentials = true;

export const zabApi = axios.create({
	baseURL: '/api',
});

export const vatusaApi = axios.create({
	baseURL: 'https://api.vatusa.net/v2',
	params: {
		test: true
	},
});