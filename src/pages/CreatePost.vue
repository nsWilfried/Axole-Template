<template>
    <div class="w-full h-screen bg-slate-400 flex">

        <div class="w-1/2 bg-red-400 h-full flex justify-center items-center">
            <div class="max-w-xl">
                <label
                    class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                
                </label>
            </div>

        </div>

        <div class="w-1/2 h-full bg-green-400 flex justify-content items-center ">
            <form action="http://127.0.0.1:3333/create-post" method="post" enctype="multipart/form-data">
                <div>
                    <input type="file" name="cover">

                </div>
                <div>
                    <label for="name">name:</label>
                    <input type="text" name="name" id="">
                </div>

                <div>
                    <label for="descripion">Description:</label>
                    <input type="text" name="description" id="">
                </div>

                <div>
                    <label for="content">Content:</label>
                    <input type="text" name="content" id="">
                </div>

                <div>
                    <button type="submit">Ajouter un post</button>
                </div>

                
            </form>
        </div>
        
          

    </div>
</template>

<script>
import { DropZone } from 'dropzone-vue';
export default {
     components: {
    DropZone,
  },
}
</script>
