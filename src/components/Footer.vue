<template>
  <div class="w-full h-auto main flex flex-col items-center justify-center">
    <div class="footer grid">
      <div class="footer__grid">
        <div class="footer__title">
          <span class="font-bold">Axole.</span>
        </div>

        <div class="footer__description h-auto my-3 flex justify-center">
          <span class="text-gray-400">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </span>
        </div>

        <div class="w-full flex">
          <div class="footer__social"></div>
          <div class="footer__social"></div>
          <div class="footer__social"></div>
        </div>
      </div>

      <!--explore  -->
      <div class="footer__grid w-full">
        <div class="footer__title">
          <span>Explore</span>
        </div>

        <div class="w-full h-auto flex flex-col footer__links">
          <div>


            <router-link to="/about">
              <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
              About</router-link
            >
          </div>
          <div>
            <router-link to="/blog"> <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
 Blog</router-link>
          </div>

          <div>
            <router-link to="/contact"> 
              <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
            Contact</router-link>
          </div>
        </div>
      </div>

      <!--footer posts -->
      <div class="footer__grid w-full">
        <!--footer title-->
        <div class="footer__title">
          <span>Recents posts</span>
        </div>

        <!--footer posts -->
        <div class="h-28 w-full">
          <div
            v-for="post in posts"
            :key="post.id"
            class="flex flex-row h-full w-full"
          >
            <!--post image-->
            <div class="w-28 h-full items-center flex">
              <div
                style="width: 70px; height: 75px"
                class="rounded bg-gray-400 overflow-hidden"
              >
                <img :src="post.thumbnail" alt="" srcset="" />
              </div>
            </div>

            <!-- post date, image, title -->
            <div class="w-full h-full flex justify-center flex-col">
              <div class="flex flex-col">
                <div class="grid" style="grid-template-columns: 1fr 1fr">
                  <div>
                    <span>{{
                      moment(post.created_at).subtract(10, "days").calendar()
                    }}</span>
                  </div>

                  <div>
                    <span>
                      {{ post.user.username }}
                    </span>
                  </div>
                </div>

                <div>
                  <span class="">
                    {{ post.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__grid">
        <!--footer title-->
        <div class="footer__title">
          <span>Have a question? </span>
        </div>

        <!--footer posts -->
        <div class="h-28 w-full">
          <div class="flex flex-row h-full w-full">
            <!--post image-->
            <div class="w-28 h-full items-center flex">
              <div class="w-12 h-12 rounded bg-gray-400"></div>
            </div>

            <!-- post date, image, title -->
            <div class="w-full h-full flex justify-center flex-col">
              <div class="flex">
                <div>
                  <span class="">Creativy inspiration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex w-full justify-center h-36 items-center"
      style="background: #e9e9e9"
    >
      <span style="font-family: 'Poppins'" class="text-gray-400"
        >Copyright ©2022 All rights reserved | This template is made with by
        <span class="text-yellow-600">Colorlib</span></span
      >
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      posts: [],
    };
  },

  created() {
    this.$store.state.posts.then((result) => (this.posts = result.slice(0, 2)));
  },

  methods: {
    moment: (date) => {
      return moment();
    },
  },
};
</script>
<style lang="scss">
@import "../assets/styles/_variables.scss";
@import "../assets/styles/_mixins.scss";
.main {
  background: $primary-bg;
}
.footer {
  width: $header-width;
  height: 400px;
  grid-template-columns: 1fr 1FR 1FR 1fr;
  font-family: $primary-font;
  padding: 40px;

  &__title {
    > span {
      color: #111111;
      font-size: 20px;
      text-transform: uppercase;
    }
  }

  &__grid {
    margin: 10px;
  }

  &__links {
    > div {
      width: 100px;
      margin-top: 10px;
    }
  }

  &__social {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background: gray;
    display: flex;
    margin-left: 3px;
    margin-right: 3px;

    transition: background 0.3s;
    &:hover {
      background: black;
      cursor: pointer;
      transition: background 0.3s;
    }
  }
}
</style>
