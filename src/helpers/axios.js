import axios from 'axios';

export const zabApi = axios.create({
	baseURL: '/api',
	withCredentials: true
});

export const vatusaApi = axios.create({
	baseURL: 'https://api.vatusa.net/v2',
	params: {
		apikey: process.env.VUE_APP_VATUSA_API_KEY,
		test: true
	},
});

export const vatusaApiAuth = axios.create({
	baseURL: 'https://api.vatusa.net/v2',
	withCredentials: true,
	params: {
		test: true
	},
});