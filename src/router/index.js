import { createRouter, createWebHistory } from 'vue-router';
import Master from '../views/layout/Master.vue';
import Admin from '../views/layout/Admin.vue';
import Event from '../views/layout/Event.vue';

import store from '../store/index.js';

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
				component: () => import('../views/events/Index.vue'),
			}
		]
	},
	{
		path: '/events/:slug', component: Event, children: [
			{
				path: '',
				component: () => import('../views/events/Event.vue')
			}
		]
	}, {
		path: '/admin', component: Admin, meta: { isAdmin: true }, children: [
			{
				path: '',
				component: () => import('../views/admin/Index.vue')
			},
			{
				path: 'controllers',
				component: () => import('../views/admin/controllers/Index.vue')
			},
			{
				path: 'controllers/:cid',
				component: () => import('../views/admin/controllers/Edit.vue')
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach((to, from, next) => {
	const user = store.getters['user/getUserData'];

	if(to.meta.isAdmin) { // Route is an admin route.
		if(user && user.isStaff) {
			next();
		} else {
			next('/');
		}
	} else {
		next();
	}
});

export default router;