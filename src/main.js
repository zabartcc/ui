import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'materialize-css';
import 'materialize-css/sass/materialize.scss';

createApp(App).use(store).use(router).mount('#app');