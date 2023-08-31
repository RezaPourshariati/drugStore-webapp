import notification from '@/components/notification.vue';
import VueTransitions from '@morev/vue-transitions';
import dialog from '@/components/dialog.vue';
import logo from "@/components/logo.vue";
import './utils/convert-persian-number';
import '@morev/vue-transitions/styles';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './assets/css/index.css';
import router from './router';
import App from './App.vue';
//////////////////////////
const pinia = createPinia()
const app = createApp(App)
////////////////////////
app.component('Notification', notification);
app.component('Dialog', dialog);
app.component('logo', logo);
app.use(VueTransitions)
app.use(router)
app.use(pinia)
app.mount('#app')
