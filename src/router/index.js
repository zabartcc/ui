import { createRouter, createWebHistory } from 'vue-router';
import Master from '../views/layout/Master.vue';
import Admin from '../views/layout/Admin.vue';
import Event from '../views/layout/Event.vue';
import Dashboard from '../views/layout/ControllerDash.vue';
import Instructor from '../views/layout/Instructor.vue';
import { zabApi } from '../helpers/axios';

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
				path: '/controllers/visit',
				component: () => import('../views/controllers/visit/Index.vue')
			},
			{
				path: '/controllers/visit/verify',
				component: () => import('../views/controllers/visit/VisitorVerify.vue')
			},
			{
				path: '/controllers/:cid',
				component: () => import('../views/controllers/Profile.vue')
			},
			{
				path: '/events',
				component: () => import('../views/events/Index.vue')
			},
			{
				path: '/feedback',
				component: () => import('../views/page/Feedback.vue')
			},
			{
				path: '/files/downloads',
				component: () => import('../views/files/Downloads.vue')
			},
			{
				path: '/files/documents',
				component: () => import('../views/files/Documents.vue')
			},
			{
				path: '/files/documents/:slug',
				component: () => import('../views/files/ViewDocument.vue')
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
		path: '/ins', component: Instructor, meta: { isIns: true }, children: [
			{
				path: '',
				component: () => import('../views/instructor/Index.vue')
			},
			{
				path: 'controllers',
				component: () => import('../views/instructor/controllers/Index.vue')
			},
			{
				path: 'solo',
				component: () => import('../views/instructor/solocerts/Index.vue')
			},
			{
				path: 'solo/new',
				component: () => import('../views/instructor/solocerts/New.vue')
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
				path: 'events/edit/:slug',
				component: () => import('../views/admin/events/Edit.vue')
			},
			{
				path: 'events/assign/:slug',
				component: () => import('../views/admin/events/Assign.vue')
			},
			{
				path: 'files/downloads',
				component: () => import('../views/admin/files/downloads/Index.vue')
			},
			{
				path: 'files/downloads/new',
				component: () => import('../views/admin/files/downloads/New.vue')
			},
			{
				path: 'files/downloads/:id',
				component: () => import('../views/admin/files/downloads/Edit.vue')
			},
			{
				path: 'files/documents',
				component: () => import('../views/admin/files/documents/Index.vue')
			},
			{
				path: 'files/documents/new',
				component: () => import('../views/admin/files/documents/New.vue')
			},
			{
				path: 'feedback',
				component: () => import('../views/admin/feedback/Index.vue')
			},
			{
				path: 'visit/applications',
				component: () => import('../views/admin/VisitApplications.vue')
			}
		]
	},
	{
		path: '/dash', component: Dashboard, meta: { loggedIn: true }, children: [
			{
				path: '',
				component: () => import('../views/dashboard/Index.vue')
			},
			{
				path: 'feedback',
				component: () => import('../views/dashboard/Feedback.vue')
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
		zabApi.get('/user').catch(err => {
			next('/');
		}).then(user => {
			if(user.data) {
				next();
			} else {
				next('/');
			}
		});
	} else if(to.meta.isAdmin) { // Route is an admin route.
		zabApi.get('/user').catch(err => {
			next('/');
		}).then(user => {
			if(user.data.isStaff === true) {
				next();
			} else {
				next('/');
			}
		});
	} else {
		next();
	}
	/* eslint-enable no-unused-vars */
});

export default router;