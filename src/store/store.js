import { createStore } from 'vuex'
import Cookies from 'js-cookie'

const connected = Cookies.get('isConnected')
const user_info = Cookies.get('user')
const store = createStore({
    state(){
        return {
            isConnected: connected == undefined ? false :  true, 
            user: user_info !=  undefined ? Cookies.get('user') : null
        }
    }, 

})


export default store