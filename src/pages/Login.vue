<template>
    <div>
        <div v-if="errorMessage">
            <span>
                {{errorMessage}}
            </span>
        </div>
        <Form :action="action" :buttonText="text" :schema="loginSchema"/>
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
    mounted() {
       if(this.$route.query.error =='InvalidCredentialsException'){
           this.errorMessage = 'Informations non valide'

           setTimeout(() => {
               this.errorMessage = null
               this.$router.push({query: undefined})
           }, 2000)
       }
    },

}
</script>