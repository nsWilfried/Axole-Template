import { createApp } from 'vue'
import App from './App.vue'
import  './tailwind.css'
import router from './router'
import VueCookies from 'vue-cookies'

const app =  createApp(App).use(router).use(VueCookies, {
    domain: 'http://localhost:3333', 
    sameSite: 'none'
}).mount('#app')