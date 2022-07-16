<template>
    <div class="login w-full h-screen bg-slate-100 flex justify-center items-center ">
        <div class=" w-52 h-80 bg-white ">
            <div v-if="errorMessage">
                <span>
                    {{errorMessage}}
                </span>
            </div>
            <Form :action="action" :buttonText="text" :schema="loginSchema"/>
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
                    rules: yup.string().required('Champ requis').email('Email invalide')
                }, {
                    label: 'Mot de passe:',
                    as: 'input', 
                    name:'password', 
                    type: 'password', 
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