<template>
    <div class="w-full h-auto">
        <Navbar/>
        <div class="login w-full h-screen bg-gray-200 flex flex-col justify-center items-center ">
            <div class=" w-96 h-auto rounded-lg bg-white ">

                <div class="w-full h-16 flex justify-center items-center">
                    <span class="font-bold text-2xl">Connexion</span>
                </div>
                <Form buttonText="Se connecter" request="login" :schema="loginSchema" />
    
            </div>

        </div>
        <Footer />

    </div>

</template>

<script>
import Form from '@/components/Form.vue'
import Error from '@/components/Error.vue'
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'



import * as yup from 'yup'
export default {
    components: { Form, Footer, Error, Navbar },
    data() {
        const loginSchema = {
            fields: [
                {
                    label: 'Email:',
                    as: 'input',
                    name: 'email',
                    type: 'text',
                    placeholder: "Entrez votre adresse mail...",
                    rules: yup.string().required('Champ requis').email('Email invalide')
                }, {
                    label: 'Mot de passe:',
                    as: 'input',
                    name: 'password',
                    type: 'password',
                    placeholder: "Entrez votre mot de passe...",
                    rules: yup.string().required('Champ requis').min(6, 'Mot de passe trop faible ( >= 6caractères)')
                },
                {
                    label: 'Se souvenir de moi ?',
                    as: 'input',
                    name: 'remember',
                    type: 'checkbox'
                },
            ],
        }
        return {
            text: 'Se connecter',
            loginSchema,
            errorMessage: null
        }

    }

}
</script>


<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/_fonts.scss';

.login {
    font-family: $primary-font;
}
</style>