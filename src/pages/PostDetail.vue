<template>
  <div>
    <Navbar />
    <div v-for="post in posts" :key="post.id" class="post w-full h-auto bg-gray- flex flex-col ">


      <!-- post -->
      <div style='height:400px;' class='w-full bg-blue- flex flex-col justify-center items-center bg-green-'>
        <!-- post name -->
        <div class="post__title flex justify-center items-center bg-red-">
          <div class="bg-violet- justify-center"><span class="font-bold text-6xl">{{ post.name }}</span></div>
        </div>

        <!-- post description -->
        <div class="post__description bg-yellow- flex justify-center">
          <div class="bg-gray-">
            <span class="text-center">
              {{ post.description }}
            </span>
          </div>
        </div>

        <!-- post infos -->
        <div class="post__infos">
          <div class="flex justify-around bg-green-">
            <PostBadge :post='post' :commentsLength="comments.length" />
          </div>
        </div>
      </div>

      <!--description -->
      <div class="post__content bg-green- flex justify-center">
        <div class="rounded ">
          {{ post.content }}
        </div>
      </div>

      <div class="post__comments bg-yellow- w-full flex justify-center items-center">
        <div class="rounded">
          <div class="w-full  h-12 flex items-center pl-4">
            <span>{{ comments.length }} Commentaires</span>
          </div>
          <hr>

          <div style="padding: 30px;">

            <ol class="relative border-l border-gray-200 dark:border-gray-700">

              <li v-for="comment in comments" :key="comment.id" class="mb-10 ml-6">
                <span class="flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full">
                  <div style="width:30px; height:30px;" class=" flex overflow-hidden justify-center items-center ">
                    <font-awesome-icon class='text-gray-300 mt-3 text-5xl' icon="fa-solid fa-user" />
                  </div>
                </span>
                <div
                  class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                  <div class="justify-between items-center mb-3 sm:flex">
                    <time class="mb-1 capitalize text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{{
                    moment(comment.created_at).fromNow()
                    }}
                    </time>
                    <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300"><span
                        class="font-medium capitalize">{{ comment.users.username }}</span>
                      commented </div>
                  </div>
                  <div
                    class="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                    {{ comment.message }}</div>
                </div>
              </li>

            </ol>


          </div>

          <div v-if="isConnected" style="padding:30px">
            <div>
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Votre
                message</label>

              <input type="text" name="post_id" :value="post.id" class="hidden" />

              <textarea name="message" rows="4" style="resize: none; " v-model="message"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500"
                placeholder="Laisser un commentaire"></textarea>

            </div>
            <button v-on:click="sendComment(post.id)" type="submit"
              class="bg-blue-400 px-3 mt-3 py-2 rounded text-white">
              Envoyer
            </button>
          </div>

          <div class="w-full h-28 flex justify-center items-center" v-if='!isConnected'>
            <router-link to="/user/login">
              <button class="text-white bg-blue-400 font-bold rounded uppercase  py-3 px-3 ml-2 ">Connectez vous pour
                envoyer un commentaire</button>
            </router-link>
          </div>
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

.post__title,
.post__description,
.post__infos {
  width: $full-width;
  @include center-horizontally;
  height: auto;
  padding: 10px;

  >div {
    @include center-horizontally;
  }
}

.post__title {
  align-items: end;
  color: $primary-color;

  >div {
    width: 1000px;
  }
}

.post__description {
  >div {
    width: 800px;
  }
}

.post__infos>div {
  width: 500px;
}

.post__content>div {
  width: 1000px;
  height: auto;
  padding-bottom: 100px;
}

.post__comments {
  height: auto;
  padding: 10px;

  >div {
    width: 1000px;
    height: auto;
    background: white;
  }
}
</style>

<script>
import PostBadge from '@/components/PostBadge.vue'
import moment from 'moment'
import Navbar from '@/components/Navbar.vue'
export default {
  components: { PostBadge, Navbar },
  data() {
    return {
      posts: [],
      isConnected: this.$store.state.isConnected,
      moment: moment,
      message: '',
      comments: []
    };
  },
  methods: {
    sendComment(postId) {
      this.axios.post("http://localhost:3333/comments", {
        message: this.message,
        postId: postId,
      }, {
        headers: {
          authorization: `Bearer ${JSON.stringify(this.$cookies.get("user"))}`,
        }
      }).then(response => {
        if (response.status == 200) {

          // vider l'input
          this.message = ""

          // lancer une alert
          this.$swal("Succès", "Commentaire ajouté", 'success').then(response => {
            this.axios.get("http://localhost:3333/posts").then(response => {
              // console.log("je suis la réponse", response)
              response.data.data.filter((element) => element.id == this.$route.params.id).forEach(post => {
                this.comments = post.user.comments.filter(element => element.post_id == post.id)
                // console.log("je suis l'élement", element)
              })
            })
            // console.log("voici les comments après l'ajout", this.comments)
          })
        } else {
          this.$swal("Erreur", "Message bien envoyé", "error")
        }
      })
    }
  },
  created() {
    this.$store.state.posts.then((response) => {
      response.data
        .filter((element) => element.id == this.$route.params.id)
        .forEach((element) => {
          this.posts.push(element);
        });

      response.data.filter(element => element.id == this.$route.params.id).forEach(post => {
        this.comments = post.user.comments.filter(element => element.post_id == post.id)
      })


      // console.log("voici les comments aavant l'ajout", this.comments);
    });
  },

  mounted() { },
};
</script>
