<template>
    <div class="w-full main__register bg-slate-200 flex flex-col  justify-center items-center">
        <Error :errorMessage="errorMessage" v-if="errorMessage != null " />
        <div class=" w-96 h-auto rounded-lg bg-white ">
            <div class="w-full h-14 flex justify-center items-center">
                <span class="font-bold  text-2xl">Inscription</span>
            </div>
        <Form :buttonText="text" :schema="registerSchema" :action="action"></Form>
        </div>
        
    </div>
</template>


<!-- script -->
<script>

import {ErrorMessage} from 'vee-validate'
import Form from '@/components/Form.vue'
import Error from '@/components/Error.vue'

import * as yup from "yup"
export default {
    
    components: {Form,Error,  ErrorMessage}, 
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
            action: 'http://127.0.0.1:3333/user/register', 
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
        }      
    },
    mounted() {
       this.checkError('unique', `${this.$route.query.field} déjà utilisé`)
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