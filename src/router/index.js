import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import CreatePost from '../pages/CreatePost.vue'
import PostDetail from '../pages/PostDetail.vue'
import UpdatePost from '../pages/UpdatePost.vue'




import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import store from '../store/store'

const isUserLogin = () => {
    const isConnected = Cookies.get('isConnected') != undefined ? true : false
    if (isConnected) {
        return '/'
    }
}
const isUserNotLogin =  () => {
    const isConnected = Cookies.get('isConnected') != undefined ? true : false
    if (!isConnected) {
        return '/'
    }
}
const isPostExist = async(to, next) => {
 let postExist = null
 await store.state.posts.then(response => {
    // console.log("je suis la réponse", response)
    let post = []
    response.data.find(element => {

      if (element.id == to.params.id) {
        // console.log("je suisl 'élément", element)
        return post= element
      }

    })
    return post

    }).then(value => {
       if (value.length == 0) {
            return postExist = false
        } else {
            return postExist = true
        }
        })

        if (postExist == false) {
            return {
                path: '/'
            }
        }    
}
const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/user/login',
        component: Login,
        name: 'login',
        beforeEnter: [isUserLogin]
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
        name: 'about'
    }, {
        path: '/contact',
        component: Contact,
        name: 'contact'
    }
    , {
        path: '/create-post',
        component: CreatePost,
        name: 'create-post',
        beforeEnter:[isUserNotLogin]
    },
    , {
        path: '/blog/:id',
        component: PostDetail,
        name: 'post-detail',
        beforeEnter: [isPostExist]
    },
    {
        path: '/blog/update/:id', 
        component: UpdatePost, 
        name: 'update-post',
        beforeEnter: [isUserNotLogin]
    }, 
    {
        path: '/:pathMatch(.*)*', name: 'NotFound', redirect: to => {
            return '/'
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;