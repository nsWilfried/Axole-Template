<template>
    <div  style="width: 1320px;" class=" h-full bg-green- flex justify-content items-center ">
        <Form class="bg-red-40 w-full h-full flex " @submit="createPost" :validation-schema='schemaRules'
                method="post" enctype="multipart/form-data">

                <div class="w-1/2 h-full flex flex-col justify-center ">
                    <!-- drop zone -->
                    <div class="dropbox">
                        <Field type="file" name="thumbnail" class="input-file" />
                        <!--  @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" -->
                        <!-- <p v-if="isInitial">
                Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
                Uploading {{ fileCount }} files...
            </p> -->
                    </div>
                    <!-- label name-->

                    <div class="w-full p-4 bg-violet-">
                        <Field class="w-full  py-4 px-1 text-3xl" type="text" placeholder="Entrez le nom du post..."
                            :rules='nameRule' name="name" />
                        <ErrorMessage name="name" class="text-red-400" />
                    </div>


                    <div class="w-full p-4 bg-violet-">
                        <Field style="resize:none;" class="w-full h-24 p-2 text-gray-600  text-2xl" type="text"
                            placeholder="Entrez la description du post..." name="description" />
                        <ErrorMessage name="description" class="text-red-400" />
                    </div>


                    <!--submit button  -->
                    <div class="w-full ml-3 bg-yellow-">
                        <button class="text-white bg-blue-400 font-bold rounded uppercase hover:bg-blue-500  py-3 px-3"
                            type="submit">Ajouter un post</button>
                    </div>

                </div>

                <!--editor -->

                <div class="w-2/3 h-full p-4 flex flex-col bg-red- justify-center">
                    <div>
                        <div class="w-full h-96 bg-green- ">
                            <editor-content class="h-12 w-full border-black border-3" :editor="editor" />
                            <Field type="text" name="content" class="hidden input-file" />

                            <!-- <Field
                             class="h-12 w-full border " /> -->
                        </div>
                    </div>

                </div>



            </Form>
    </div>
</template>
<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
    components: {Editor, EditorContent, Field, Form, ErrorMessage, StarterKit }, 
    data() {
        const schemaRules = yup.object({
            name: yup.string().required('Champ requis'),
            description: yup.string().required('Champ requis'),
        })
        return {
            editor: null,
            nameRule: yup.string().required('Champ requis'),
            schemaRules,
            file: null
        }
    },
    mounted() {
        this.editor = new Editor({
            content: '',
            extensions: [
                StarterKit,
            ],
        })

    }
    ,
    beforeUnmount() {
        this.editor.destroy()
    },
    methods:{
        createPost(values) {
            // console.log("je suis l'ensemble des valeurs", values)
            // console.log("je suis le texte de l'éditeur", this.editor.getText())
            this.axios.post(`${import.meta.env.VITE_DEV_API}/create-post`, {
                name: values.name,
                description: values.description,
                content: this.editor.getText(),
                thumbnail: values.thumbnail
            }, {
                headers: {
                    authorization: `Bearer ${JSON.stringify(this.$cookies.get("user"))}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then(
                response => {
                    // console.log("je suis la réponse", response)
                    this.$swal("Succès", "Post crée", "success").then(() => {
                        this.$router.push("/")
                        this.$store.commit("getAllPosts")
                    })
                },
                error => {
                    // console.log("je suis l'erreur", error)
                    this.$swal("Erreur", "Erreur lors de la création du post", "error")

                }
            )
        }
    }
}
</script>
<style>
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