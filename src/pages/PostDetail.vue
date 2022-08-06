<template>

    <div  class="w-full h-screen bg-gray-400 flex justify-center items-center ">
        <div v-for="post in posts" :key='post.id'>
            <div  >
            <span>
                {{post.name}}
            </span>
            
            <div >
                <div v-for="comment in post.comments" :key="comment.id">
                    <span>

                       {{comment.user_id}} - {{comment.message}}
                    </span>
                </div>
            </div>
        </div>


        <div v-if="isConnected">
            <form action="http://127.0.0.1:3333/comments" method="post">
                <div>
                    <label for="message">MEssage:</label>
                    <input type="text" name='post_id' :value="post.id" class="hidden">
                    <textarea name="message"  draggable="false" cols="30" rows="10"></textarea>
                </div>

                <button type="submit" class="bg-blue-400 px-3 py-2 rounded text-white">Envoyer</button>
            </form>
        </div>

        <div>
            <span>
                Veuiller vous <router-link to="/user/login" class="text-blue-400">Connecter</router-link> pour pouvoir envoyer un commentaire
            </span>
        </div>

        
     </div>
        
    </div>
</template>

<script>
export default {
    data(){

        return {
            posts:  [], 
            isConnected: this.$store.state.isConnected
        }
    }, 
    methods: {
      
       
    },
    created() {
         
       this.$store.state.post.then(result => {return result.filter(element => element.slug == this.$route.params.id).forEach(element => {
            this.posts.push(element)
        });}) 
    }, 

    mounted() {
    }

}

</script>