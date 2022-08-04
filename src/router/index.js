import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import {createRouter, createWebHistory} from 'vue-router'
import Cookies from 'js-cookie'

const isUserLogin = () => {
    const isConnected = Cookies.get('isConnected') != undefined ? true : false
    console.log('Avant de rentrer dans la page', isConnected)
    if(isConnected){
        return '/'
    }
}
const routes = [
    {
        path:'/', 
        component: Home, 
        name: 'home'
    }, 
    {
        path: '/user/login',
        component: Login, 
        name: 'login', 
        beforeEnter:  [isUserLogin]
    }, 
    {
        path: '/user/register',
        component: Register, 
        name: 'register', 
        beforeEnter: [isUserLogin]
    }, 
    {
        path: '/about', 
        component: About, 
        name:'about'
    }, {
        path: '/contact', 
        component: Contact, 
        name: 'contact'
    }
]

const router = createRouter({
    history: createWebHistory(), 
    routes
  })

export default router;