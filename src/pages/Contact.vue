<template>
    <div>
        <div>
            <Banner :name="title" />
        </div>

        <div class="contact w-full  flex justify-center items-center ">
            <div class="contact__content h-screen flex  ">

                <!--contact information et formulaire-->
                <div class="contact__form w-1/2 bg-slate p-12 ">
                    <div class="contact__title bg-red- h-14 w-full  flex items-center ">
                        <span class="font-medium text-3xl h-14 ">Contact us</span>
                    </div>

                    <div class="contact__description bg-green- flex items-center h-14">
                        <span class="text-gray-400">We're open for any suggestion or just to have a chat</span>
                    </div>
                    
                    <div class="flex w-full h-auto bg-orange">
                        <!--adress--> 
                        <div class="w-1/3">
                            <div>
                                <span class="contact__content__info">Adress:</span>
                            </div>

                            <div class="text-gray-400">
                                <span>
                                    198 West 21th Street, <br>
                                </span>
                                <span>
                                    Suite 721 New York <br>
                                </span>
                                <span>
                                    NY 10016
                                </span>
                                
                            </div>
                        </div>

                        <!--email--> 
                        <div class="w-1/3">
                            <div>
                                <span class="contact__content__info">Email:</span>
                            </div>

                            <div>
                                <span>info@yoursite.com</span>
                            </div>
                        </div>

                        <!--phone-->
                        <div class="w-1/3">
                            <div>
                                <span class="contact__content__info">Phone:</span>
                            </div>

                            <div>
                                <span>+ 1235 2355 98</span>
                            </div>
                        </div>
                    </div>

                    <div class="contact__form bg-green-">
                         <Form :action="action" method="post">
                            <div  v-for="{ as, name,type,placeholder, label,  ...attrs } of schema.fields" :key="name">
                                <div class="w-full h-12 flex items-center justify-center">

                                    <div class="h-full w-full flex justify-center items-center">
                                        <div class="w-full bg-blue-" >
                                            <label :for="name">
                                                {{label}}
                                            </label>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                        
                                
                                <div v-if="type!='textarea'" class="w-full h-12 flex justify-center ">
                                    <Field  :type="type" :placeholder="placeholder" class="rounded-sm w-full border border-gray-300" :as="as" :name="name" :id="name" v-bind="attrs" />
                                </div>

                                <div v-else class="w-full   flex justify-center " >
                                    <Field  :type="type" :placeholder="placeholder"   class="rounded-sm w-full h-full border border-gray-300" :as="as" :name="name" :id="name" v-bind="attrs" required />
                                </div>
                                
                            </div>

                            <div class="w-full h-10 my-4">
                                <button class="form__button rounded p-2  hover:bg-blue-600 uppercase bg-blue-500 text-white font-medium w-8" type="submit">
                                    Nous contacter
                                </button>
                            </div>
                        
                        </Form>
                    </div>
                </div>


                <!--google map --> 
                <div class="contact__map w-1/2">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15866.44328085367!2d1.3565786499999999!3d6.18281125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2stg!4v1659541501500!5m2!1sfr!2stg" 
                     style="border:0; width:100%; height:100%; " allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
</template>

<script>
import  Banner from '@/components/Banner.vue'
import  Footer from '@/components/Footer.vue'

import {Form, Field, ErrorMessage} from 'vee-validate'
import * as yup from 'yup'
export default {

    components: {Banner,Footer,Form, Field, ErrorMessage},
    data() {
       const  schema = {
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
            schema, 
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
      background: $primary-bg;
    font-family: $primary-font;


    &__content {
        width: $header-width; 
        height: 85%;
        background: white;
        &__info {
            text-transform: uppercase;
            font-weight: bold;
         }
    }

    &__title{
        font-family: $primary-font;
    }
    
}
</style>