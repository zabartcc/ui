import { createRouter, createWebHistory } from 'vue-router';
import Master from '../views/layout/Master.vue';

const routes = [
	{
		path: '/', component: Master, children: [
			{
				path: '', 
				component: () => import('../views/page/Home.vue')
			},
			{ 
				path: 'login/verify', 
				component: () => import('../views/page/LoginVerify.vue') 
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;