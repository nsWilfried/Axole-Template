import { createApp } from 'vue'
import App from './App.vue'
import  './tailwind.css'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './store/store'

const app =  createApp(App).use(VueCookies).use(router).use(store).mount('#app')