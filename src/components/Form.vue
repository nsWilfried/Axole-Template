<template>
    <Form @submit="onSubmit" method="post">
        <div v-for="{ as, name,type,placeholder, label,  ...attrs } of schema.fields" :key="name">
            <div class="w-full h-12 flex items-center justify-center">

                <div class="h-full flex justify-center items-center" style="width: 330px;">
                    <div style="width: 330px;">
                        <label :for="name">
                            {{label}}
                        </label>

                    </div>

                    <div v-if="type==='checkbox'">
                        <Field :type="type" :placeholder="placeholder" class=" focus:border-blue-400 rounded-sm "
                            :as="as" :name="name" :id="name" v-bind="attrs" />
                    </div>
                </div>

            </div>


            <div v-if="type!='checkbox'" class="w-full h-12 flex justify-center ">
                <Field :type="type" :placeholder="placeholder" class="form__input  rounded-sm " :as="as" :name="name"
                    :id="name" v-bind="attrs" />
            </div>



            <div class="w-full flex justify-center items-center">
                <ErrorMessage style="width:330px" class="text-red-400" :name="name" />

            </div>
        </div>

        <div class="w-full flex flex-col items-center justify-center my-3">
            <Error :errorMessage='errorMessage' v-if="errorMessage" />
            <button class="form__button rounded p-2 hover:bg-blue-600 uppercase bg-blue-500 text-white font-medium w-8"
                type="submit">
                <span v-if="loading == false" >{{buttonText}}</span>
                <span v-if="loading == true">Loading ...</span>
            </button>
        </div>


    </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import Error from "./Error.vue"

export default {
    name: Form,
    components: { Form, Field, ErrorMessage, Error },
    props: {
        schema: {
            type: Object,
            required: true,
        },
        action: String,
        buttonText: String,
        request: String
    },
    data() {
        return {
            errorMessage: "", 
            loading: false
        }
    },
    methods: {
        onSubmit(values) {
            this.errorMessage = ""
            this.loading = true
            // console.log("j'ai soumis et voici les valeurs", values)

            if (this.request == "login") {
                return this.axios.post(`${import.meta.env.VITE_DEV_API}/user/login`, values)
                    .then(async(response) => {
                        // console.log("je suis le résultat de la connexino", response)

                        const user = response.data.user
                        this.$cookies.set("user", JSON.stringify(user))
                        this.$cookies.set("isConnected", true)
                        this.loading = false
                        await this.$store.commit("retrieveUser")

                        this.$router.push('/')

                    }, error => {
                        this.errorMessage = error.response.data.message
                        this.loading = false

                        // console.log("erreur lors de la connexion", error.response.data.message)
                    })
            } else {
                return this.axios.post(`${import.meta.env.VITE_DEV_API}/user/register`, values)
                    .then(() => {
                        // console.log("je suis le résultat de l'inscription", response)
                        this.$router.replace({path: "/user/login"})
                        this.loading = false
                    }, error => {
                        this.errorMessage = error.response.data.error.messages.errors[0].message
                        // console.log("erreur lors de l'inscription", error)
                        this.loading = false

                    })
            }

        }
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
    display: flex;
    flex-direction: column-reverse;
}

.form__button {
    width: 330px;
}
</style>