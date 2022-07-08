import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import Blog from '../pages/Blog.vue'
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
const routes = [
    {
        path:'/', 
        component: Home, 
        name: 'home'
    }, 
    {
        path: '/user/login',
        component: Login, 
        name: 'login'
    }, 
    {
        path: '/user/register',
        component: Register, 
        name: 'register'
    }, 
    {
        path: '/about', 
        component: About, 
        name:'about'
    }, {
        path: '/contact', 
        component: Contact, 
        name: 'contact'
    }, 
    {
        path:'/blog', 
        component: Blog,
        name: 'blog'
    }
]

const router = createRouter({
    history: createWebHistory(), 
    routes
  })

export default router;