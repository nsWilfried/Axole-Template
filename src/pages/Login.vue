<template>
    <div class="login w-full h-screen bg-gray-200 flex flex-col justify-center items-center ">
         <div style="width:330px" class="bg-red-400 text-white p-2 text-center rounded-lg my-2" v-if="errorMessage">
                <span>
                    {{errorMessage}}
                </span>
            </div>
        <div class=" w-96 h-auto rounded-lg bg-white ">

            <div class="w-full h-16 flex justify-center items-center">
                <span class="font-bold text-2xl">Connexion</span>
            </div>
           <Form :action="action"  :buttonText="text" :schema="loginSchema"/>
        </div>
        
    </div>
</template>

<script>
import Form from '@/components/Form.vue'
import * as yup from 'yup'
export default {
    components: {Form}, 
    data() {
        const loginSchema = {
            fields: [
                {
                    label: 'Email:', 
                    as: 'input', 
                    name:'email', 
                    type: 'text', 
                    placeholder: "Entrez votre adresse mail...", 
                    rules: yup.string().required('Champ requis').email('Email invalide')
                }, {
                    label: 'Mot de passe:',
                    as: 'input', 
                    name:'password', 
                    type: 'password', 
                    placeholder: "Entrez votre mot de passe...", 
                    rules: yup.string().required('Champ requis').min(6, 'Mot de passe trop faible ( >= 6caractères)')
                } ,
                {
                    label: 'Se souvenir de moi ?', 
                    as: 'input', 
                    name: 'remember', 
                    type: 'checkbox'
                },
            ]
        }
        return {
            text: 'Se connecter', 
            action: `http://127.0.0.1:3333/user/login`, 
            loginSchema, 
            errorMessage: null
        }
        
    },
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
       this.checkError('E_INVALID_AUTH_PASSWORD', 'Mot de passe incorrect')
       this.checkError('E_INVALID_AUTH_UID', "Cet utilisateur n'existe pas")
    },

}
</script>


<style lang="scss">
@import '../assets/styles/_variables.scss'; 
@import '../assets/styles/_fonts.scss'; 
    .login {
        font-family:$primary-font;
    }

</style>