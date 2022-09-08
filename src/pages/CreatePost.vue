<template>
    <div class="w-full h-screen bg-slate- flex justify-center ">

        <div style="width: 1320px;" class=" h-full bg-green- flex justify-content items-center ">
            <Form @submit="createPost" class="bg-red-40 w-full h-full flex " :validation-schema='schemaRules' method="post" enctype="multipart/form-data">
                
                <div class="w-1/2 h-full flex flex-col justify-center ">
                        <!-- drop zone --> 
                    <div >

                        <file-pond
                                name="file"
                                ref="pond"
                                label-idle="Drop files here..."
                                v-bind:allow-ultiple="false"
                                accepted-file-types="image/jpeg, image/png"
                                required='true'
                                storeAsFile='true'
                                />          
                    </div>

                    <input type="file" name="hello" >

                    <!-- label name--> 

                    <div class="w-full p-4 bg-violet-">
                        <Field class="w-full  py-4 px-1 text-3xl" type="text" placeholder="Entrez le nom du post..." :rules='nameRule' name="name"/>
                        <ErrorMessage name="name" class="text-red-400" />
                    </div>
            

                    <div class="w-full p-4 bg-violet-">
                        <Field style="resize:none;" class="w-full h-24 p-2 text-gray-600  text-2xl" type="text" placeholder="Entrez la description du post..." name="description"></Field>
                        <ErrorMessage name="description" class="text-red-400" />
                    </div>

                            
                    <!--submit button  --> 
                    <div class="w-full ml-3 bg-yellow-">
                        <button class="text-white bg-blue-400 font-bold rounded uppercase hover:bg-blue-500  py-3 px-3" type="submit">Ajouter un post</button>
                    </div>

                </div>
               
               <!--editor -->

               <div class="w-2/3 h-full p-4 flex flex-col bg-red- justify-center">
                    <div>
                        <div class="w-full h-96 bg-green- ">
                            <input class="hidden" :name='editor'/>
                            <editor-content class="h-12 w-full border-black border-3" :editor="editor" />

                        </div>
                    </div>
                   
               </div>
               

                
            </Form>
        </div>
        
          

    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);


export default {
     components: {
    FilePond,
    EditorContent, 
    Field,
    Form,
    ErrorMessage,
    
  }, 
     data() {
         const schemaRules = yup.object({
             name: yup.string().required('Champ requis'), 
             description: yup.string().required('Champ requis'), 
         })
         return {
             editor: null, 
             nameRule: yup.string().required('Champ requis'), 
             schemaRules
         }
     }, 

     mounted(){
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
  methods: {
    createPost(values){
        console.log("nous sommes l'ensemble des valeurs", values)
        this.axios.post("http://127.0.0.1:3333/create-post", values).then(
            response => {
                console.log("je suis la réponse", response)
            }, 
            error => {
                console.log("je suis l'erreur", error)
            }
        )
    }
  }

}
</script>

