<template>
    <div>
    <Navbar/>

        <!--banner-->
        <div class="banner w-full flex items-center justify-center">
            <div class="banner__content flex items-start mt-44 justify-end">
                <div class="flex flex-col">
                    <div class="banner__text flex items-center justify-start">
                        <span class="uppercase">A personnal <span class=" border-b-2 border-black">blog</span></span>
                    </div>

                    <div class="banner__title flex items-center justify-start">
                        <span>
                            A<span class="banner__title-special">xol</span>e.
                        </span>
                    </div>

                    <div class="banner__description flex items-center justify-center">

                        <div>
                            <span>
                                I am a Blogger & Photographer Based in Philippines
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!--blog -->
        <!-- style="background-color: #999999;" -->
        <div 
            class="px-4  py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div v-if="posts" class="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                <div v-for="(element, index) in posts"
                    class="overflow-hidden transition-shadow duration-300 bg- rounded">
                    <span v-if="element.thumbnail"><img :src="element.thumbnail"
                            class="object-cover w-full h-64 rounded" alt="" /></span>
                    <div v-else class="w-full h-64 bg-gray-400"></div>
                    <div class="py-5">
                        <div class="mb-2 flex justify-between text-xs font-semibold text-gray-600 capitalize">
                            <div>
                                {{ moment(element.created_at).fromNow() }}
                            </div>

                            <div>
                                {{element.user.username}}
                            </div>
                        </div>
                        <routerLink :to="`/blog/${element.id}`"
                            class="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700">
                            <p class="text-2xl font-bold leading-5">{{ element.name }}</p>
                        </routerLink>
                        <p class="mb-4 text-gray-700">
                            Sed ut perspiciatis unde omnis iste natus error sit sed quia consequuntur magni voluptatem
                            doloremque.
                        </p>
                        <div class="flex space-x-4">

                            <span
                                class="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                                <div class="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        stroke="currentColor"
                                        class="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700">
                                        <polyline points="23 5 23 18 19 18 19 22 13 18 12 18" fill="none"
                                            stroke-miterlimit="10"></polyline>
                                        <polygon points="19 2 1 2 1 14 5 14 5 19 12 14 19 14 19 2" fill="none"
                                            stroke="currentColor" stroke-miterlimit="10"></polygon>
                                    </svg>
                                </div>
                                <p class="font-semibold">{{ element.user.comments.filter(comment => comment.post_id ==
                                element.id).length }}</p>
                            </span>

                            <div v-if="user" class="flex justify-around">
                                <button class='text-white bg-blue-400 flex justify-center items-center px-2 capitalize rounded'
                                    v-if="element.user.id == user.id">
                                    <router-link :to="`/blog/update/${element.id}`">modifier</router-link>
                                </button>
                                <button class='ml-3 text-white bg-red-400 flex justify-center items-center px-2 capitalize rounded'
                                    v-if="element.user.id == user.id" @click="deletePost(element.id)">Supprimer</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                Aucun post trouvé
            </div>
            <!-- Previous Button -->
            <!-- <div>
                <a href="#"
                class="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg aria-hidden="true" class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clip-rule="evenodd"></path>
                </svg>
                Précédent
            </a>
            <a 
                class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                Suivant
                <svg aria-hidden="true" class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>
            </div> -->


        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from "@/components/Footer.vue"
import Navbar from "@/components/Navbar.vue"

import moment from "moment"
export default {
    components: { Footer, Navbar },
    data() {

        return {
            posts: [],
            moment: moment,
            user: null
        }
    },

    created() {
        this.getAllPosts();

        // parser les données utilisateurs
        this.parseUserData()
    },
    methods: {
        deletePost(id) {
            return this.axios.delete(`${import.meta.env.VITE_DEV_API}/posts/${id}`, {
                headers: {
                    authorization: `Bearer ${JSON.stringify(this.$cookies.get("user"))}`
                }
            }).then(
                response => {
                    // console.log("je suis la réponse", response)
                    this.$swal("Succès", "Post supprimé", 'success').then(() => {
                        this.$store.commit("getAllPosts")
                        this.getAllPosts();
                    })
                },
                error => {
                    // console.log("je suis l'erreur", error)
                    this.$swal("Erreur", "Erreur lors de la suppression", 'error')

                }
            )
        },
        updatePost() {

        },
        getAllPosts() {
            this.$store.state.posts.then(response => {
                this.posts = response.data.slice(0, 7)
            })
        },
        parseUserData() {
            if (this.$store.state.user) {
                this.user = this.$store.getters.parseUserData
            }
        }
    },
    mounted(){
        window.scrollTo(0,0);
    }

}
</script>

<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/_fonts.scss';
@import '../assets/styles/_mixins.scss';

.banner {

    height: 750px;
    background: $primary-bg;
    font-family: $primary-font;

    &__content {
        width: $header-width;
        height: $full-height;

        //background: blue;
        >div {
            width: 880px;
            height: 420px;
            margin-top: 59px;

            //background:orange;
        }
    }

    &__text {
        height: 40px;
        text-transform: uppercase;
        margin-top: 15px;

        >span {
            font-weight: 500;
            color: #111;
            font-size: 12px;
            letter-spacing: 3px;
            margin-left: -60px;
        }


    }

    &__title {
        height: 265px;
        // background: aliceblue;

        >span {
            font-weight: 800;
            color: #444;
            font-size: 14vw;
            line-height: 1.2;

        }

        &-special {
            color: #000;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: black;
        }
    }

    &__description {
        >div {
            height: 100px;
            margin-left: 70px;
            //background: red;
            width: 500px;
            display: flex;
            align-items: flex-end;

            >span {

                font-size: 30px;
                letter-spacing: 1px;
                color: #919191;
                font-weight: 200;
            }

        }

    }
}
</style>
