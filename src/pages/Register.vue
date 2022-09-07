<template>
    <div>
        <div class="w-full main__register bg-slate-200 flex flex-col  justify-center items-center">
            <div class=" w-96 h-auto rounded-lg bg-white ">
                <div class="w-full h-14 flex justify-center items-center">
                    <span class="font-bold  text-2xl">Inscription</span>
                </div>
            <Form :buttonText="text" :schema="registerSchema" request="register"></Form>
            </div>
        </div>
        <Footer/>

        
    </div>
    
</template>


<!-- script -->
<script>

import {ErrorMessage} from 'vee-validate'
import Form from '@/components/Form.vue'
import Error from '@/components/Error.vue'
import Footer from '@/components/Footer.vue'


import * as yup from "yup"
export default {
    
    components: {Form,Error,Footer,  ErrorMessage}, 
    data() {
        
        
        const registerSchema = {
            fields: [
                {
                    label: 'Nom d\'utilisateur:', 
                    as: 'input', 
                    name:'username', 
                    type:'text', 
                    placeholder: "Entrez un nom d'utilisateur...", 
                    rules: yup.string().required('Champ requis')
                
                }, 
                {
                    label: 'Email:', 
                    as: 'input', 
                    name: 'email', 
                    type:'text', 
                    placeholder: "Entrez votre adresse mail...",
                    rules: yup.string().email('Email invalide').required('Champ requis')
                }, 
                {
                    label: 'Mot de passe:', 
                    as: 'input', 
                    name: 'password', 
                    type: 'password',  
                    placeholder: "Entrez votre mot de passe...",
                    rules: yup.string().min(6, 'Mot de passe trop faible ( >= 6caractères)').required('Champ requis')
                },
                ]
        }
        
        return {
            apiUrl:'https://ns-blog-api.herokuapp.com', 
            action: `https://ns-blog-api.herokuapp.com/user/register`, 
            text: 'S\'inscrire',
            registerSchema, 
            errorMessage: null
        }
    } , 
     methods: {
        checkError(code , message) {
            if(this.$route.query.error == code){
                this.errorMessage = message
                return this.removeErrorMessage()
            }
        },

        removeErrorMessage() {
            setTimeout(() => {
                this.errorMessage = null
                this.$router.push({query: undefined})
            }, 4000)           
        }, 
        login(){
            return this.axios.post(`${this.apiUrl}/user/login`, {
                email: "random@gmail.com", 
                password: "random"
            }).then(response =>{console.log("je suis la réponese", response )}, error =>{console.log("je suis l", error);});
        }
    },

    
    mounted() {
       this.checkError('unique', `${this.$route.query.field} déjà utilisé`)
        console.log(this.apiUrl)
       console.log(this.action)
    },
} 
</script>



<style lang="scss">
@import '../assets/styles/_variables.scss'; 
.main__register{
    font-family: $primary-font;
    height: 105vh;
}
</style>