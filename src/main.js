import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@materializecss/materialize';
import '@materializecss/materialize/sass/materialize.scss';

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
	.mixin({
		created() {
			const {title} = this.$options;
			if(title) {
				document.title = `${(typeof title === 'function') ? title.call(this) : title} | Albuquerque ARTCC`;
			}
		},
		methods: {
			setTitle(title) {
				document.title = `${(typeof title === 'function') ? title.call(this) : title} | Albuquerque ARTCC`;
			}
		}
	})
	.component('Spinner', Spinner)
	.mount('#app');