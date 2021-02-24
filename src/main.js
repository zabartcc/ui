import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'materialize-css';
import 'materialize-css/sass/materialize.scss';

import dates from './helpers/dates.js';
import toasts from './helpers/toasts.js';

import Spinner from './components/Spinner.vue';

createApp(App)
	.use(store)
	.use(router)
	.mixin({
		methods: {
			...dates,
			...toasts
		}
	})
	.component('Spinner', Spinner)
	.mount('#app');