<template>
    <div class="w-full h-screen bg-slate- flex justify-center ">

        <div style="width: 1320px;" class=" h-full bg-green- flex justify-content items-center ">
            <form class="bg-red-40 w-full h-full flex " action="http://127.0.0.1:3333/create-post" method="post" enctype="multipart/form-data">
                
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

                    <!-- label name--> 

                    <div class="w-full p-4 bg-violet-">
                        <input class="w-full hover:border-blue-400  py-4 px-1 text-3xl " type="text" placeholder="Entrez le nom du post..." name="name" id="">
                    </div>
            

                    <div class="w-full p-4 bg-violet-">
                        <textarea style="resize:none;" class="w-full hover:border-blue-400 h-24 p-2 text-gray-600  text-2xl" type="text" placeholder="Entrez la description du post..." name="description"> </textarea>
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
                            <QuillEditor toolbar="full" class="w-full h-32 border-green-400" theme="snow" id='content' name='content'/>
                        </div>
                    </div>
                   
               </div>
               

                
            </form>
        </div>
        
          

    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

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
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);


export default {
     components: {
    QuillEditor, 
    FilePond,
  }, 
     data() {
         return {
             editor: null 
         }
     }, 
    

}
</script>

