<template>
    <div class="  w-full  flex shadow-sm   justify-center items-center  lg:bg-white sm:bg-black sm:text-white navbar ">
        <a href="https://github.com/nsWilfried/" class="github-corner" aria-label="View source on GitHub"><svg
                width="80" height="80" viewBox="0 0 250 250"
                style="fill:#000; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                <path
                    d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                    fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                <path
                    d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                    fill="currentColor" class="octo-body"></path>
            </svg></a>
        <div class="navbar__content flex">

            <div class="navbar__brand bg-orange flex justify-center items-center">
                <span class="navbar__brand__logo uppercase">
                    <router-link to="/"> Axole.</router-link>
                </span>
            </div>

            <div class="navbar__links w-full flex items-center justify-end">
                <div class="flex flex-column text-uppercase">
                    <div class="navbar__link ">
                        <span class="active">
                            <router-link to="/">Blog</router-link>
                        </span>
                    </div>

                    <div class="navbar__link">
                        <span>
                            <router-link to="/about">about</router-link>

                        </span>
                    </div>

                    <div class="navbar__link">
                        <span>
                            <router-link to="/contact">Contact</router-link>
                        </span>
                    </div>




                </div>

                <!-- login and register button -->
                <div class=" flex flex-row" v-if="connected == false">
                    <LinkButton name='se connecter' link='/user/login' class="text-black "
                        style='background: transparent;' />
                    <LinkButton name="s'inscrire" link='/user/register' class="text-white bg-blue-400 font-bold  " />
                </div>

                <!-- create post button -->
                <LinkButton v-if="connected == true" name='Créer un post' link='/create-post' class="text-black "
                    style='background: transparent;' />

                <!-- logout button -->
                <div v-if="connected == true">
                    <div method="post">
                        <button @click="logout()"
                            class="text-white bg-blue-400 font-bold rounded uppercase  py-3 px-3 ml-2 ">Se
                            déconnecter</button>
                    </div>
                </div>


            </div>
            <div v-if="user != null " class="flex justify-center items-center ml-3">
                {{user.username || ""}}
            </div>

        </div>
    </div>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
export default {
    components: { LinkButton },
    data() {
        return {
            connected: this.$store.state.isConnected,
            user: null,
            apiUrl: "http://localhost:3333"
        }
    },

    mounted() {

        console.log("je suis la navbar et je suis encore monté")
        // console.log("l'élement est bien monté et je vais vérifier si ça fonctionne")
    },
    async created() {
        // console.log("je suis la navbar et je suis encore crée")
        await this.$store.commit("changeStatusConnected")
        this.connected = this.$store.state.isConnected
        await this.$store.commit("retrieveUser")
        if (this.$store.state.user) {
            this.user = this.$store.getters.parseUserData

            // console.log("je suis les informatiosn utlisateur au niveau de la navbar", this.user)
        }

    },
    methods: {
        async logout() {
            return await this.axios.post("http://localhost:3333/logout").then(
                async () => {
                    this.$router.replace('/user/login')
                    this.$cookies.remove("user")
                    this.$cookies.remove("isConnected")
                    this.$store.commit("retrieveUser")
                    this.user = this.$store.getters.parseUserData
                    await this.$store.commit("changeStatusConnected")
                    this.connected = this.$store.state.isConnected
                    // console.log("valeur de la connexion", this.connected)
                }, error => {
                    console.log(error)
                }
            )
        }
    },
}
</script>

<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/_fonts.scss';
@import '../assets/styles/_mixins.scss';

.active {
    color: $primary-color !important;
}

.navbar {
    height: 90px;

    &__content {
        width: $header-width;
        height: 58px;
    }

    &__brand {
        width: 90px;
        height: $full-height;

        >span {
            font-size: 20px;
            font-family: $primary-font;
            font-weight: 900;
            color: $primary-color;
            letter-spacing: 3px;
        }

    }

    &__link {
        padding-left: 25px;
        padding-right: 25px;
        height: $full-height;
        @include center-element;

        >span {
            text-transform: uppercase;
            font-family: $primary-font;
            font-size: 11px;
            letter-spacing: 3px;
            color: $secondary-color;
            font-weight: 500;

        }
    }
}

.github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out
}

@keyframes octocat-wave {

    0%,
    100% {
        transform: rotate(0)
    }

    20%,
    60% {
        transform: rotate(-25deg)
    }

    40%,
    80% {
        transform: rotate(10deg)
    }
}

@media (max-width:500px) {
    .github-corner:hover .octo-arm {
        animation: none
    }

    .github-corner .octo-arm {
        animation: octocat-wave 560ms ease-in-out
    }
}
</style> 