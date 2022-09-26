import { createApp } from 'vue'
import App from './App.vue'
import  './tailwind.css'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
/* add font awesome icon component */
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
// rich text

library.add(fas, far, fab)

const app = createApp(App).use(VueAxios, axios).use(VueSweetalert2).component('font-awesome-icon', FontAwesomeIcon).component('QuillEditor', QuillEditor).use(VueCookies).use(router).use(store).mount('#app')



