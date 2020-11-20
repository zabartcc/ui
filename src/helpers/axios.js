import axios from 'axios';

export const zabApi =  axios.create({
	baseURL: '/api',
	withCredentials: true,
});

export const vatusaApi = axios.create({
	baseURL: '/vatusa',
	withCredentials: true,
	params: {
		test: true
	}
});