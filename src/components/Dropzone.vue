<template>
    <div>

        <div class="dropbox">
            <input type="file" :name="uploadFieldName"
            @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                accept="image/*" class="input-file">
                <!--  @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" -->
            <!-- <p v-if="isInitial">
                Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
                Uploading {{ fileCount }} files...
            </p> -->
        </div>
    </div>
</template>
<script>
export default {
data(){
    return {
        uploadFieldName: "file", 
        fileCount: 0, 
    }
}, 
methods: {
    filesChange(fieldName, fileList) {
        // console.log("je suis la liste des fichiers", fileList)
        // console.log("je suis l'évènement et je suis là ", event)
        // handle file changes

        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            console.log("je suis chaque key", fileList[x].name);
            this.$store.state.post_image = fileList[x].name
          });

        // save it
        console.log("je suis le form list", this.fileList)

      }
}
}
</script>
<style lang="scss">
    .dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>