import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import M from '@materializecss/materialize'; // Temporary fix until I figure out why I can't import a (custom) minified file directly
import '@materializecss/materialize/sass/materialize.scss';

import dates from './helpers/dates.js';
import toasts from './helpers/toasts.js';

import Spinner from './components/Spinner.vue';

import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import { Vue as VueIntegration } from '@sentry/integrations';

const app = createApp(App)
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
			const { title } = this.$options;
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
	.mixin({
		data() {
			return {
				footerTime: null
			};
		},
		created() {
			setInterval(() => {
				this.footerTime = `${this.dtFull(new Date())}z`;
			}, 1000);
		}
	})
	.component('Spinner', Spinner);

if(process.env.NODE_ENV === 'production') {
	Sentry.init({
		dsn: "https://5477b015c06e440ab91805dd9dad31f7@o885721.ingest.sentry.io/5837739",
		integrations: [
			new VueIntegration({ Vue: app }),
			new Integrations.BrowserTracing()
		],
		tracingOptions: {
			trackComponents: true,
		},
		tracesSampleRate: 0.5,
	});
}

app.mount('#app');