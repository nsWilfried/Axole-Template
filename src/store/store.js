import { createStore } from 'vuex'
import Cookies from 'js-cookie'
import axios from 'axios'
const connected = Cookies.get('isConnected')
const user_info = Cookies.get('user')
const store = createStore({
     state(){
        const api =  "http://localhost:3333"
        console.log("je suis ldans le store",)
        return {
            isConnected: connected == undefined ? false :  true, 
            user: user_info !=  undefined ? Cookies.get('user') : null, 
            posts:   axios(`${api}/posts`).then(response => {return response.data}).catch(() => {return []}), 
            post_image: null
        }
    }, 

    mutations: {
        retrieveUser(state){
            state.user = user_info !=  undefined ? Cookies.get('user') : null
        }
    }, 
    getters: {
        parseUserData: state =>{
            if(state.user){
                return JSON.parse(state.user)

            }
        }
    }

})



export default store