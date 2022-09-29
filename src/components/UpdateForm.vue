<template>
    <div class="bg--400 flex h-screen p-12 justify-center items-center">
        <div v-for="(post, index) in post" :key="index" style="width: 800px;"
            class=" h-full bg-green- flex flex-col justify-content items-center ">

            <!-- thumbnail -->
            <!-- <div class="thumbnail w-full h-72 flex justify-center items-center bg--200">
                <img :src="post.thumbnail" :alt="post.name" style="width: 120px; height: 120px; " />

            </div> -->
            <Form class="bg--200 w-full h-full flex " @submit="updatePost" :validation-schema='schemaRules'
                method="post" enctype="multipart/form-data">
                <div class="w-full h-full flex flex-col justify-center ">
                    <!-- drop zone -->
                    <div class="dropbox flex flex-col justify-center items-center ">

                        <Field type="file" name="thumbnail" class="input-file"
                            @change="filesChange($event.target.name, $event.target.files) " />
                <img :src="post.thumbnail" :alt="post.name" style="width: 50px; height: 50px; " />

                        <p>
                            Drag your file(s) here to begin
                        </p>
                        <span v-if="file">{{file[0].name}}</span>

                    </div>
                    <!-- label name-->

                    <div class="w-full p-4 bg-violet-">
                        <Field class="input " type="text" placeholder="Entrez le nom du post..."
                            :rules='nameRule' name="name" :value="post.name" />
                        <ErrorMessage name="name" class="text-red-400" />
                    </div>


                    <div class="w-full p-4 bg-violet-">
                        <Field style="resize:none;" class="input " type="textarea"
                            placeholder="Entrez la description du post..." name="description"
                            :value="post.description" />
                        <ErrorMessage name="description" class="text-red-400" />
                    </div>


                    <!--submit button  -->
                    <div class="w-full ml-3 bg-yellow-">
                        <button class="text-white bg-blue-400 font-bold rounded uppercase hover:bg-blue-500  py-3 px-3"
                            type="submit">
                            <span v-if="loading==false">Modifier un post</span>
                        <span v-else>Loading...</span>
                        </button>
                    </div>

                </div>


            </Form>


        </div>

        <div class="editor h-full p-4 flex flex-col bg-red- justify-center">
            <div>
                <div class=" h-96 bg-green- ">
                    <QuillEditor ref="editor" toolbar="full" theme="snow" />
                </div>
            </div>

        </div>
    </div>

</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
    // Editor, EditorContent,StarterKit
    components: { Field, Form, ErrorMessage, QuillEditor },
    data() {
        const schemaRules = yup.object({
            name: yup.string().required('Champ requis'),
            description: yup.string().required('Champ requis'),
        })
        return {
            nameRule: yup.string().required('Champ requis'),
            schemaRules,
            file: null,
            post: [], 
            loading: false
        }
    },
    methods: {
        filesChange(field, file) {
            this.file = file;
        },

        updatePost(values){
            this.loading = true
            // console.log(values, "je suis l'ensemble de valeurs")
            this.axios.put(`${import.meta.env.VITE_DEV_API}/posts/${this.post[0].id}`, {
                name: values.name,
                description: values.description,
                content: `${this.$refs.editor.getHTML()}`, 
                thumbnail: values.thumbnail
            }, {
                headers: {
                    authorization: `Bearer ${JSON.stringify(this.$cookies.get("user"))}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then(
                response => {
                    // console.log("je suis la réponse", response)
                    this.loading = false
                    this.$swal("Succès", "Post modifié", "success").then(() => {
                        this.$router.push("/")
                        this.$store.commit("getAllPosts")
                    })
                },
                error => {
                    this.loading = false
                    // console.log("je suis l'erreur", error)
                    this.$swal("Erreur", "Erreur lors de la modifictation du post", "error")

                }
            )
        }
    },
    async created() {
        await this.$store.state.posts.then(response => {
            this.post = response.data.filter(element => element.id == this.$route.params.id)
            this.$refs.editor.setHTML(this.post[0].content)


        })

    },
    mounted() {
    }
}
</script>
<style lang="scss" >
    .editor{
        width: 800px;
    }
    .input{
        background-color: #ddd;
    outline: 0px;
    border: 0px;
    border-radius: 0.25rem;
    // width: 100%;
    max-width: 500px;
    margin: 0px auto;
    padding: 1rem;
    // color: #EC7063;
    font-family: "Fira Code", "Fira Mono", "Roboto Mono", "Lucida Console", Monaco, monospace;
    font-size: 2rem;
    font-weight: 400;
    text-align: center;
    }
.dropbox {
    outline: 2px dashed grey;
    /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px;
    /* minimum height */
    position: relative;
    cursor: pointer;
}

.input-file {
    opacity: 0;
    /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
}

.dropbox:hover {
    background: lightblue;
    /* when mouse over to the drop zone, change color */
}

.dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
}
</style>