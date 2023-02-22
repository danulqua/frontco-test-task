import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import './assets/main.css';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);
app.component('vue-datepicker', VueDatePicker);

app.use(createPinia());

app.mount('#app');
