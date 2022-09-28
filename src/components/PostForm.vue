<template>
    <div style="width: 1320px;" class=" h-full bg-green- flex justify-content items-center ">
        <Form class="bg-red-40 w-full h-full flex " @submit="createPost" :validation-schema='schemaRules' method="post"
            enctype="multipart/form-data">

            <div class="w-1/2 h-full flex flex-col justify-center ">
                <!-- drop zone -->
                <div class="dropbox">
                    <div>
                        <Field type="file" name="thumbnail" class="input-file"
                            @change="filesChange($event.target.name, $event.target.files) " />
                    </div>
                    <!--  @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" -->
                    <p>
                        Drag your file(s) here to begin<br> or click to browse
                    </p>
                    <span v-if="file">{{file[0].name}}</span>


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
                        <QuillEditor ref="editor" toolbar="full" theme="snow" />

                        <!-- <button @click="hello">rando</button> -->
                    </div>
                </div>

            </div>



        </Form>
    </div>
</template>
<script>

import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
export default {
    // Editor, EditorContent,StarterKit
    components: { Field, Form, ErrorMessage },
    data() {

        const schemaRules = yup.object({
            name: yup.string().required('Champ requis'),
            description: yup.string().required('Champ requis'),
        })
        return {
            nameRule: yup.string().required('Champ requis'),
            schemaRules,
            file: null,
            currentStatus: null,
        }
    },

    methods: {
        filesChange(field, file) {
            this.file = file
        },

        createPost(values) {
            // console.log("je suis l'ensemble des valeurs", values.thumbnail)
            // console.log("je suis le texte de l'éditeur", this.editor.getText())
            // console.log(`${this.$refs.editor.getHTML()}`)
            this.axios.post(`${import.meta.env.VITE_DEV_API}/create-post`, {
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
    }, 
    mounted(){
        console.log("je suisl a", this.$refs.editor.getHTML())
    }
}
</script>
<style lang="scss">
/* Basic editor styles */
.ProseMirror {
    >*+* {
        margin-top: 0.75em;
    }

    ul,
    ol {
        padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    pre {
        background: #0D0D0D;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
        }
    }

    img {
        max-width: 100%;
        height: auto;
    }

    blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0D0D0D, 0.1);
    }

    hr {
        border: none;
        border-top: 2px solid rgba(#0D0D0D, 0.1);
        margin: 2rem 0;
    }
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

.is-active {
    background-color: black;
    color: white;
}
</style>