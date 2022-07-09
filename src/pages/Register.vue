<template>
    <div class="form">
        <Form :buttonText="text" :schema="registerSchema" :action="action"></Form>
    </div>
</template>


<!-- script -->
<script>

import {ErrorMessage} from 'vee-validate'
import Form from '@/components/Form.vue'
import * as yup from "yup"
export default {
    
    components: {Form, ErrorMessage}, 
    data() {
        
        
        const registerSchema = {
            fields: [
                {
                    label: 'Nom d\'utilisateur', 
                    as: 'input', 
                    name:'username', 
                    type:'text', 
                    rules: yup.string().required('Champ requis')
                
                }, 
                {
                    label: 'Email', 
                    as: 'input', 
                    name: 'email', 
                    type:'text', 
                    rules: yup.string().email('Email invalide').required('Champ requis')
                }, 
                {
                    label: 'Mot de passe', 
                    as: 'input', 
                    name: 'password', 
                    type: 'password',  
                    rules: yup.string().min(6, 'Mot de passe trop faible ( >= 6caractères)').required('Champ requis')
                },
                ]
        }
        
        return {
            action: 'http://127.0.0.1:3333/user/register', 
            text: 'S\'inscrire',
            registerSchema
        }
    } 
} 
</script>



<style lang="scss">

</style>