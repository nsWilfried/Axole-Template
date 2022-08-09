<template>
    <div class="  w-full  flex shadow-sm fixed  justify-center items-center  lg:bg-white sm:bg-black sm:text-white navbar ">
        <div class="navbar__content flex">

            <div class="navbar__brand bg-orange flex justify-center items-center">
                <span class="navbar__brand__logo uppercase">
                   <router-link to="/"> Axole.</router-link>
                </span>
            </div>

            <div class="navbar__links w-full flex items-center justify-end">
                <div class="flex flex-column text-uppercase">
                    <div class="navbar__link " >
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
                    <LinkButton name='se connecter' link='/user/login' class="text-black " style='background: transparent;' />
                    <LinkButton name="s'inscrire" link='/user/register' class="text-white bg-blue-400 font-bold  " />
                </div>

                <!-- create post button --> 
                 <LinkButton v-if="connected == true" name='Créer un post' link='/create-post' class="text-black " style='background: transparent;' />
                
                <!-- logout button --> 
                <div v-if="connected == true" >
                    <form action="http://127.0.0.1:3333/logout" method="post" >
                        <button class="text-white bg-blue-400 font-bold rounded uppercase  py-3 px-3 ml-2 ">Se déconnecter</button>
                    </form>
                </div>
              

            </div>
        
        </div>
    </div>
</template>

<script>
import LinkButton from '@/components/LinkButton.vue'
export default {
    components: {LinkButton},
    data() {
        return { 
            connected: this.$store.state.isConnected,
            }
    },

    mounted() {
    },
}
</script>

<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/_fonts.scss';
@import '../assets/styles/_mixins.scss';

.active{
    color: $primary-color !important;
}
.navbar {
    height: 90px;
    &__content {
        width: $header-width;
        height: 58px;
    }
    &__brand{
        width: 90px;
        height: $full-height;
        > span{
            font-size: 20px;
            font-family: $primary-font;
            font-weight: 900;
            color:$primary-color;
            letter-spacing: 3px;
        }
        
    }

    &__link {
        padding-left: 25px;
        padding-right: 25px;
        height: $full-height;
        @include center-element;
       
        > span {
            text-transform: uppercase;
            font-family: $primary-font;
            font-size:11px;
            letter-spacing: 3px;
            color:$secondary-color;
            font-weight:500;

        }
    }
}
</style> 