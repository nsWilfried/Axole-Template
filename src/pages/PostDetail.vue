<template>
    <div  class="w-full h-screen bg-gray-400 flex justify-center items-center ">
        <div  v-if='posts.length != 0'>
            <div  v-for='post in posts' :key='post'>
            <span>
                {{post.description}}
            </span>
        </div>

        <div>
            <form action="" method="post">
                <div>
                    <label for="message">MEssage:</label>

                    <textarea name="message" id="" draggable="false" cols="30" rows="10"></textarea>
                </div>

                <button type="submit">Envoyer</button>
            </form>
        </div>
     </div>
        
    </div>
</template>

<script>
export default {
     data() {
        return {
            posts: []
        }

    }, 
    methods: {
       
    },
    
     mounted(){
         this.$store.state.posts.then(result =>{
             this.posts = result
         })
    }
}
</script>