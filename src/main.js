import { createApp } from 'vue'
import App from './App.vue'
import  './tailwind.css'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './store/store'
import DropZone from 'dropzone-vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

const app =  createApp(App).use(VueAxios, axios).use(VueCookies).use(router).use(store).use(DropZone).mount('#app')