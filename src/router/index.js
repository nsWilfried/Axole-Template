import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import CreatePost from '../pages/CreatePost.vue'
import PostDetail from '../pages/PostDetail.vue'
import NotFound from '../pages/NotFound.vue'



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
    , {
        path: '/create-post', 
        component: CreatePost, 
        name: 'create-post', 
        beforeEnter: () => {
            const isConnected = Cookies.get('isConnected') != undefined ? true: false
            if(!isConnected){
                return '/'
            }
        }
    }, 
    , {
        path: '/:id', 
        component: PostDetail, 
        name: 'post-detail'
    }
]

const router = createRouter({
    history: createWebHistory(), 
    routes
  })

export default router;