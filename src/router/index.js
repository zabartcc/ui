import { createRouter, createWebHistory } from 'vue-router';
import Master from '../views/layout/Master.vue';
import Admin from '../views/layout/Admin.vue';
import Event from '../views/layout/Event.vue';
import Dashboard from '../views/layout/ControllerDash.vue';
import axios from '../helpers/axios';

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
				path: '/controllers/staff',
				component: () => import('../views/controllers/Staff.vue')
			},
			{
				path: '/controllers/:cid',
				component: () => import('../views/controllers/Profile.vue')
			},
			{
				path: '/controllers/visit/:step?',
				component: () => import('../views/controllers/visit/Index.vue')
			},
			{
				path: '/controllers/visit/verify',
				component: () => import('../views/controllers/visit/VisitorVerify.vue')
			},
			{
				path: '/events',
				component: () => import('../views/events/Index.vue')
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
	},
	{
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
			},
			{
				path: 'events',
				component: () => import('../views/admin/events/Index.vue')
			},
			{
				path: 'events/new',
				component: () => import('../views/admin/events/New.vue')
			},
			{
				path: 'events/assign/:slug',
				component: () => import('../views/admin/events/Assign.vue')
			}
		]
	},
	{
		path: '/dashboard', component: Dashboard, meta: { loggedIn: true }, children: [
			{
				path: '',
				component: () => import('../views/dashboard/Index.vue')
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach((to, from, next) => {
	/* eslint-disable no-unused-vars */
	if(to.meta.loggedIn) {
		next();
	} else if(to.meta.isAdmin) { // Route is an admin route.
		const token = localStorage.getItem('token');
		if(!token) {
			next('/');
		} else {
			axios.get('/user', {
				headers: { Authorization: `Bearer ${token}` }
			}).catch(err => {
				next('/');
			}).then(user => {
				if(user.data.isStaff == true) {
					next();
				} else {
					next('/');
				}
			});
		}
	} else {
		next();
	}
	/* eslint-enable no-unused-vars */
});

export default router;