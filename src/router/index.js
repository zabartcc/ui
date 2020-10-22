import { createRouter, createWebHistory } from 'vue-router';
import Master from '../views/layout/Master.vue';
import Home from '../views/page/Home.vue';
import LoginVerify from '../views/page/LoginVerify.vue';

const routes = [
	{
		path: '/', component: Master, children: [
			{ path: '', component: Home },
			{ path: 'login/verify', component: LoginVerify }
		]
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;