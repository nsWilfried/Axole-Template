<template>
  <div class="w-full h-screen bg-gray- flex">
    
    <div style='height:400px; background: red; ' class='w-full flex flex-col justify-center items-center bg-green-' v-for="post in posts" :key="post.id">
      <div class="post__title flex justify-center items-center bg-red-">
        <div  class="bg-violet- justify-center"><span class="font-bold text-6xl">{{post.name}}</span></div>
      </div>

      <div class="post__description bg-yellow- flex justify-center">
        <div class="bg-gray-">
          <span class="text-center">
            {{post.description}}
          </span>
        </div>
      </div>

      <div class="post__infos">
        <div class="flex justify-around bg-green-">
             <PostBadge :post='post' />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/styles/_variables.scss'; 
@import '../assets/styles/_mixins.scss'; 

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
  
</style>

<script>
import PostBadge from '@/components/PostBadge.vue'
export default {
  components: {PostBadge}, 
  data() {
    return {
      posts: [],
      isConnected: this.$store.state.isConnected,
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
