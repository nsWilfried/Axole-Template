<template>
    <div>
        <div v-for="(post, index) in post" :key="index" style="width: 1320px;"
            class=" h-full bg-green- flex flex-col justify-content items-center ">

            <img :src="post.thumbnail" :alt="post.name" style="width: 120px; height: 120px; " />
            <Form class="bg-red-40 w-full h-full flex " @submit="createPost" :validation-schema='schemaRules'
                method="post" enctype="multipart/form-data">
                <div class="w-1/2 h-full flex flex-col justify-center ">
                    <!-- drop zone -->
                    <div class="dropbox">
                        <Field type="file" name="thumbnail" class="input-file"
                            @change="filesChange($event.target.name, $event.target.files) " />
                        <p>
                            Drag your file(s) here to begin<br> or click to browse
                        </p>
                        <span v-if="file">{{file[0].name}}</span>
                    </div>
                    <!-- label name-->

                    <div class="w-full p-4 bg-violet-">
                        <Field class="w-full  py-4 px-1 text-3xl" type="text" placeholder="Entrez le nom du post..."
                            :rules='nameRule' name="name" :value="post.name" />
                        <ErrorMessage name="name" class="text-red-400" />
                    </div>


                    <div class="w-full p-4 bg-violet-">
                        <Field style="resize:none;" class="w-full h-24 p-2 text-gray-600  text-2xl" type="text"
                            placeholder="Entrez la description du post..." name="description"
                            :value="post.description" />
                        <ErrorMessage name="description" class="text-red-400" />
                    </div>


                    <!--submit button  -->
                    <div class="w-full ml-3 bg-yellow-">
                        <button class="text-white bg-blue-400 font-bold rounded uppercase hover:bg-blue-500  py-3 px-3"
                            type="submit">Ajouter un post</button>
                    </div>

                </div>

                <!--editor -->





            </Form>


        </div>

        <div class="w-2/3 h-full p-4 flex flex-col bg-red- justify-center">
            <div>
                <div class="w-full h-96 bg-green- ">
                    <!-- <editor-content class="h-12 w-full border-black border-3" :editor="editor" /> -->
                    <!-- <Field type="text" name="content" class="hidden input-file" :value="post.content" /> -->
                    <QuillEditor ref="editor" toolbar="full" theme="snow" />
                    <!-- <Field
                             class="h-12 w-full border " /> -->


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
            post: []
        }
    },
    methods: {
        filesChange(field, file) {
            this.file = file;
        },

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