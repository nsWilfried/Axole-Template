<template>
  <div  v-for="post in posts" :key="post.id" class="post w-full h-auto bg-gray- flex flex-col ">
    

    <!-- post -->
    <div style='height:400px;' class='w-full bg-blue- flex flex-col justify-center items-center bg-green-'>
      <!-- post name -->
      <div class="post__title flex justify-center items-center bg-red-">
        <div  class="bg-violet- justify-center"><span class="font-bold text-6xl">{{post.name}}</span></div>
      </div>

      <!-- post description -->
      <div class="post__description bg-yellow- flex justify-center">
        <div class="bg-gray-">
          <span class="text-center">400
            {{post.description}}
          </span>
        </div>
      </div>

      <!-- post infos -->
      <div class="post__infos">
        <div class="flex justify-around bg-green-">
             <PostBadge :post='post' />
        </div>
      </div>
    </div>

    <!--description -->
    <div class="post__content bg-green- flex justify-center">
      <div class="rounded ">
        {{post.content}}
      </div>
    </div>

    <div class="post__comments bg-yellow- w-full flex justify-center items-center">
      <div class="rounded">
        <div class="w-full  h-12 flex items-center pl-4">
          <span>{{post.comments.length}} Commentaires</span>
        </div>
        <hr>
         <div >
           <div v-for="comment in post.comments" :key="comment.id" style='height:100px;' class="flex mt-2 w-full bg-green-">
             <div class="w-24 bg-orange- flex justify-center items- h-full ">
               <div style="width:60px; height:60px;" class="bg-gray-300 flex overflow-hidden justify-center items-center rounded-full">
                 <font-awesome-icon class='text-white mt-3 text-5xl' icon="fa-solid fa-user" />
               </div>
             </div>

             <div class="w-full bg-violet- h-full ">
               <div class="post__comment__name w-full h-auto  bg-yellow- flex  items-end">
                 <span class="text-md capitalize font-medium">
                  
                   {{comment.users.username}} 
                 </span>
                 
                 <span class="text-gray-400 ml-2">{{moment(comment.created_at).fromNow()}}</span>
               </div>

               <div class="post__comment__description">
                 <span class="text-gray-400">
                   {{comment.message}}
                 </span>
               </div>
             </div>

            
           </div>
          </div>

          <form action="http://127.0.0.1:3333/comments" method="post" v-if="isConnected">
              <div>
                <label for="message">MEssage:</label>
                <input type="text" name="post_id" :value="post.id" class="hidden" />
                <textarea
                  name="message"
                  draggable="false"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <button
                type="submit"
                class="bg-blue-400 px-3 py-2 rounded text-white"
              >
                Envoyer
              </button>
            </form>

          <div class="w-full h-28 flex justify-center items-center" v-if='!isConnected'>
            <router-link to="/user/login">
              <button  class="text-white bg-blue-400 font-bold rounded uppercase  py-3 px-3 ml-2 ">Connectez vous pour envoyer un commentaire</button>
            </router-link>
          </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/styles/_variables.scss'; 
@import '../assets/styles/_mixins.scss'; 
.post {
  background: $primary-bg;
  font-family: $primary-font;

}
.post__title,.post__description, .post__infos{
  width: $full-width;
  @include center-horizontally;
  height: auto; 
  padding: 10px; 
  > div {
  @include center-horizontally; 
  }
}
.post__title {
  align-items:end;
  color: $primary-color;
  > div {
      width: 1000px;
  }
}
.post__description {
  > div {
    width: 800px;
  }
}
.post__infos> div {
  width: 500px;
}
.post__content > div {
  width: 1000px;
  height: auto;
  padding-bottom: 100px;
}
.post__comments {
  height: auto;
  padding: 10px ;
  > div {
    width: 1000px;
    height: auto;
    background: white;
  }
}
  
</style>

<script>
import PostBadge from '@/components/PostBadge.vue'
import moment from 'moment'
export default {
  components: {PostBadge}, 
  data() {
    return {
      posts: [],
      isConnected: this.$store.state.isConnected,
      moment: moment
    };
  },
  methods: {},
  created() {
    this.$store.state.posts.then((result) => {
      return result
        .filter((element) => element.slug == this.$route.params.id)
        .forEach((element) => {
          this.posts.push(element);
        });
    });
  },

  mounted() {},
};
</script>
