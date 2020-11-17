import axios from 'axios';

export default axios.create({
	baseURL: '/devapi',
	withCredentials: true
});