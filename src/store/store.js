import { createStore } from 'vuex'
import Cookies from 'js-cookie'
import axios from 'axios'
let connected = Cookies.get('isConnected')
let user_info = Cookies.get('user')
const store = createStore({
     state(){
        const api =  "http://localhost:3333"
        // console.log("je suis ldans le store",)
        return {
            isConnected: connected == undefined ? false :  true, 
            user: user_info !=  undefined ? user_info : null, 
            posts:   axios(`${api}/posts`).then(response => {return response.data}).catch(() => {return []}), 
            post_image: null
        }
    }, 

    // les mutations
    mutations: {
        retrieveUser(state){
            this.user_info =  Cookies.get('user')
            // console.log("je récupère les informations du user", this.user_info)
            state.user = this.user_info !=  undefined ? this.user_info : null
            return state.user
        }, 
        getAllPosts(state){
            return state.posts = axios(`http://localhost:3333/posts`).then(response => {return response.data})
        }, 
        changeStatusConnected(state){
            this.connected = Cookies.get('isConnected')
            // console.log("je suis le cookie de connexion", this.connected)
             state.isConnected = this.connected == undefined ? false :  true
            //  console.log("je suis connecté ou pas", state.isConnected)
             return state.isConnected
        }
    }, 
    getters: {
        parseUserData: state =>{
            if(state.user){
                return JSON.parse(state.user)

            }else {
                return null 
            }
        }
    }

})



export default store