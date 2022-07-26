<template>
    <div>
        <div>
            <Banner :name="title" />
        </div>

        <div class="contact w-full bg-orange-50 flex justify-center items-center ">
            <div class="contact__content h-screen flex  ">
                <div class="contact__form w-1/2 bg-slate-300 p-14 ">
                    <div class="contact__title ">
                        <span class="font-medium text-3xl h-14 ">Contact</span>
                    </div>

                    <div class="contact__description">
                        <span>Loerum magni eveniet tempora error ex delectust aperiam magnam inventore!</span>
                    </div>
                    
                    <div class="flex w-full h-auto bg-orange">
                        <!--adress--> 
                        <div class="w-1/3">
                            <div>
                                <span>Adress:</span>
                            </div>

                            <div>
                                <span></span>
                            </div>
                        </div>

                        <!--email--> 
                        <div class="w-1/3">
                            <div>
                                <span>Email:</span>
                            </div>

                            <div>
                                <span></span>
                            </div>
                        </div>

                        <!--phone-->
                        <div class="w-1/3">
                            <div>
                                <span>Phone:</span>
                            </div>

                            <div>
                                <span></span>
                            </div>
                        </div>
                    </div>

                    <div class="contact__form">
                        <Form :action="action" :buttonText='contactButtonText' :schema='contactSchema' />
                    </div>
                </div>


                <div class="contact__map">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import  Banner from '@/components/Banner.vue'
import Form from '@/components/Form.vue'
import * as yup from 'yup'
export default {

    components : {Banner, Form}, 
    data() {
       const  contactSchema = {
           fields:  [
               {
                    label: 'Nom complet:', 
                    as: 'input', 
                    name:'fullname', 
                    type: 'text', 
                    rules: yup.string().required('Champ requis')
               },
               {
                    label: 'Email:', 
                    as: 'input', 
                    name:'email', 
                    type: 'text', 
                    rules: yup.string().required('Champ requis').email('Email invalide')
               }, 
               {
                    label: 'Sujet:', 
                    as: 'input', 
                    name:'subject', 
                    type: 'text', 
                    rules: yup.string().required('Champ requis')
               }, 
               {
                    label: 'Message', 
                    as: 'textarea', 
                    name:'message', 
                    type: 'text', 
                    rules: yup.string().required('Champ requis')
               }

           ]
       }
        return {
            title: 'Contact', 
            contactSchema, 
            contactButtonText: "Contactez nous dès maintenant",
            action: 'http://127.0.0.1:3333/contact'
           
        }
    },
    
}
</script>

<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/_fonts.scss';
.contact {
      height: 1000px;
    &__content {
        width: $header-width; 
        height: 85%;
        background: white;
    }
}
</style>