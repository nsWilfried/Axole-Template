<template>
    <Form :action="action" method="post">
        <div  v-for="{ as, name,type, label,  ...attrs } of schema.fields" :key="name">
            <div>
                <label :for="name">
                    {{label}}
                </label>
            </div>

            <div>
                <Field :type="type" class="form__input" :as="as" :name="name" :id="name" v-bind="attrs" />
                
                <span class="red">
                    <ErrorMessage :name="name" />
                 </span>
            </div>
        </div>

        <button class="form__button" type="submit">
            {{buttonText}}
        </button>
    </Form>
</template>

<script>
import {Form, Field, ErrorMessage} from 'vee-validate'
export default {
    name: Form,
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
.red {
    color: red;
}
.form__input {
    border: 3px solid  $primary-color;
    width: 150px;
    outline: none;
}
.reverse {
    display:flex; 
    flex-direction: column-reverse;
}
.form__button{
    width: 150px;
    background: $primary-color;
    margin-top: 20px;
    padding: 1em ;
    color: white;
    @include center-element;
}
</style>