import { createStore } from 'vuex'
import Cookies from 'js-cookie'
import axios  from 'axios'

const connected = Cookies.get('isConnected')
const user_info = Cookies.get('user')
const store = createStore({
    state(){
        const post_slug = 'premier-post'
        const api = "http://127.0.0.1:3333"

        return {
            isConnected: connected == undefined ? false :  true, 
            user: user_info !=  undefined ? Cookies.get('user') : null, 
            posts:  axios.get(`${api}/${post_slug}`).then(response => response)

        }
    }, 

})



export default store