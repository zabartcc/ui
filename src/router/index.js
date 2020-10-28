import { createRouter, createWebHistory } from 'vue-router';
import Master from '../views/layout/Master.vue';
import Event from '../views/layout/Event.vue';

const routes = [
	{
		path: '/', component: Master, children: [
			{
				path: '', 
				component: () => import('../views/page/Home.vue')
			},
			{ 
				path: '/login/verify', 
				component: () => import('../views/page/LoginVerify.vue') 
			},
			{
				path: '/controllers',
				component: () => import('../views/controllers/Roster.vue')
			},
			{
				path: '/events',
				component: () => import('../views/events/Index.vue')
			}
		]
	},
	{
		path: '/event/:id', component: Event, children: [
			{
				path: '',
				component: () => import('../views/events/Event.vue')
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;