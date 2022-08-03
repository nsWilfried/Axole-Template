<template>
    <Form :action="action" method="post">
        <div  v-for="{ as, name,type,placeholder, label,  ...attrs } of schema.fields" :key="name">
            <div class="w-full h-12 flex items-center justify-center">

                <div class="h-full flex justify-center items-center" style="width: 330px;">
                    <div style="width: 330px;" >
                        <label :for="name">
                            {{label}}
                        </label>
                        
                    </div>

                    <div v-if="type==='checkbox'">
                        <Field  :type="type" :placeholder="placeholder"  class=" focus:border-blue-400 rounded-sm " :as="as" :name="name" :id="name" v-bind="attrs" />
                    </div>
                </div>
                
            </div>
    
               
            <div v-if="type!='checkbox'" class="w-full h-12 flex justify-center ">
                <Field  :type="type" :placeholder="placeholder" class="form__input  rounded-sm " :as="as" :name="name" :id="name" v-bind="attrs" />
            </div>
    
            
                    
            <div class="w-full flex justify-center items-center">
             <ErrorMessage style="width:330px" class="bg-red-400 text-white p-2 rounded-lg my-2" :name="name" />

            </div>
        </div>

        <div class="w-full h-10 flex justify-center items-center my-4">
            <button class="form__button rounded p-2 hover:bg-blue-600 uppercase bg-blue-500 text-white font-medium w-8" type="submit">
                {{buttonText}}
            </button>
        </div>
       
    </Form>
</template>

<script>
import {Form, Field, ErrorMessage} from 'vee-validate'
export default {
    name: 'Form',
    components: {Form, Field, ErrorMessage},
    props: {
        schema: {
            type: Object, 
            required: true
        }, 
        action: String, 
        buttonText: String
    }, 
}
</script>


<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/_mixins.scss';

.form__input {
    width: 330px;
    background: $primary-bg;
    border: 1px solid $primary-bg;
    padding: 6px;

}
.reverse {
    display:flex; 
    flex-direction: column-reverse;
}
.form__button{
    width: 330px;
}
</style>