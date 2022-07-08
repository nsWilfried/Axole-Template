import { createApp } from 'vue'
import App from './App.vue'
import  './tailwind.css'
import router from './router'

const app =  createApp(App).use(router).mount('#app')