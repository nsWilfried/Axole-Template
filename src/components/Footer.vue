<template>
  <div class="w-full h-auto main flex flex-col items-center justify-center">
    <div class="footer grid">
      <div class="footer__grid flex flex-col justify-center bg-red-">

        <!-- axole  --> 
        <div class="footer__title">
          <span class="font-bold text-xl">Axole.</span>
        </div>

        <!-- axole description -->
        <div class="footer__description h-auto my-3 flex justify-center">
          <span class="text-gray-400">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </span>
        </div>

        <!--social links -->
        <div class="w-full flex">
          <div v-for="social in socials" :key="social.icon" class="footer__social bg-slate-300 flex justify-center items-center">
            <a :href="social.to"><font-awesome-icon :icon="social.icon" class="text-xl" /></a>
          </div>
        </div>
      </div>

      <!--explore  -->
      <div class="footer__grid w-full">

        <!--title--> 
        <div class="footer__title">
          <span>Explore</span>
        </div>

        <!--content-->
        <div class="w-full text-gray-400  h-auto flex flex-col footer__links">
          <!--router link -->
          <div v-for="link in links" :key="link.name">
            <router-link  :to='link.to'><font-awesome-icon icon="fa-solid fa-arrow-right-long" /><span class="pl-2 capitalize">{{link.name}}</span></router-link>
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
        <div class="h-28 w-full footer__grid__content">
          <div
            v-for="post in posts"
            :key="post.id"
            class="flex flex-row h-full w-full bg-red-"
          >
            <!--post image-->
            <div class="w-auto pr-2 h-full items-center flex bg-green-">
              <div
                style="width: 50px; height: 55px"
                class="rounded bg-gray-400 overflow-hidden"
              >
                <img :src="post.thumbnail" alt="" srcset="" />
              </div>
            </div>

            <!-- post date, image, title -->
            <div class="w-full h-full flex justify-center flex-col">
              <div class="flex flex-col text-gray-400">
                <div class="grid " style="grid-template-columns: 1fr 1fr">
                  <div>
                    <span>{{
                      moment(post.created_at).subtract(10, "days").calendar()
                    }}</span>
                  </div>

                  <div>
                    <span class="capitalize ">
                      {{ post.user.username }}
                    </span>
                  </div>
                </div>

                <div>
                  <router-link class="hover:text-yellow-300" :to="`/blog/${post.slug}`">
                    <span class="font-medium">
                      {{ post.name }}
                    </span>
                  </router-link>
                  
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

        <!--footer infos -->
        <div class="w-full footer__grid__content">
          <div class="flex flex-row h-full w-full bg-red-" v-for="contact in contacts" :key='contact.name'>
            <!--icons-->
            <div class="w-auto mr-2 h-full items-center flex">
              <div class="w-12 h-12 rounded bg-gray- flex  items-center">
                <font-awesome-icon :icon="contact.icon" />
              </div>
            </div>

            <!-- information-->
            <div class="w-full h-auto bg-green- flex justify-center  flex-col">
              <div class="flex">
                <div>
                  <span>{{contact.name}}</span>
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
      links: [
        {
          name: "about", 
          to: '/about'
        }, 
        {
          name: "blog", 
          to: '/blog'
        }, 
        {
          name: "contact", 
          to: '/contact'
        }
      ], 
      socials: [
        {
          icon: 'fa-brands fa-twitter', 
          to: '#'
        }, 
        {
          icon: "fa-brands fa-github", 
          to: 'https://github.com/nsWilfried/'
        }
      ], 
      contacts: [
        {
          icon:"fa-solid fa-map", 
          name: '203 Fake St. Mountain View, San Francisco', 
        }, 
        {
          icon:"fa-solid fa-phone", 
          name: '+2 392 3929 210', 
        }, 
        {
          icon:"fa-solid fa-paper-plane", 
          name: 'info@yourdomain.com',  
        }
      ]
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
      font-weight:bold;
      letter-spacing: 2px; 
      text-transform: uppercase;
    }
  }

  &__grid {
    margin: 10px;
    &__content {
      margin-top: 20px; 
    }
  }

  &__links {
    > div {
      width: 100px;
      margin-top: 20px;
    }
  }

  &__social {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    margin-left: 3px;
    margin-right: 3px;

    transition: background 0.3s;
    &:hover {
      background: black;
      cursor: pointer;
      color: white;
      transition: background 0.3s;
    }
  }
}
</style>
