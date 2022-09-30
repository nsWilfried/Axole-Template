<template>
    <div class="about">
        <Navbar/>
        <div>
            <Banner :name="title"/>
        </div>

        <div class="about__content flex flex-col items-center justify-center sm:h-auto">

            <div class="about__profile flex lg:flex-row sm:h- ">

                <!-- profile --> 
                <div class="about__profile__img bg-cover bg-center  w-5/6 h-full">
                </div>

                <!-- profile info --> 
                <div class="about__profile__info flex flex-col justify-center iems-center">
                    <div class="about__name pt-9 " >
                        <span class="uppercase text-xs text-gray-400 font-medium ">
                            I'm Nicole Kate Perry
                        </span>
                    </div>

                    <div class="about__title">
                        <span class="font-medium text-5xl leading-normal">
                            I am a Blogger & Photographer Based in Philippines
                        </span>
                    </div>

                    <div class="w-full flex justify-center ">
                        <div class="w-full">
                             <AboutSkills v-for="skill of skills" :key="skill" :title="skill.title" :icon='skill.icon' :description='skill.description' />
                        </div>
                    </div>
                </div>
            </div>

            <div class="about__description flex justify-center items-center">
                <span class=" leading-relaxed ">
                    <span class="font-bold">I am Nicole Kate Perry</span>  Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                </span>
            </div>
        </div>

       
    </div>
</template>

<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/_fonts.scss';

.about {
    background: $primary-bg; 

    &__description {
        width:900px;
        height: 200px;
        font-family: $primary-font; 
        span {
            font-size: 16px;
        }
    }

    &__profile{
        width: $header-width;
        height: auto;
        &__img {
            background-image: url('../assets/imgs/about_image.webp');
            height: auto;

        }
        &__info {
            padding:50px;
        }

    }
    &__title, &__name{
        font-family: $primary-font;
        color: rgba(0,0,0,.8);
    }
 }
 @media only screen and (min-width: 320px ) and (max-width: 1000px){
  .about{
    &__profile {
        flex-direction: column ;

        width: 100%;

    }
    &__description {
        width: 100%;
        padding: 30px;
    }
    &__title {
        span{
            font-size: 2.4em ;
        }
    }
  }
}
</style>
<script>
import Banner from "@/components/Banner.vue";
import AboutSkills from '@/components/AboutSkills.vue';
import Navbar from '@/components/Navbar.vue'
export default {
    components: {Banner, AboutSkills, Navbar},
    data() { 

        const skills = [
            {
                title:"Writter & Blogger", 
                icon: "fa-solid fa-marker", 
                description:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
            }
            , 
            {
                title:"Writter & Blogger", 
                icon: "fa-solid fa-camera-retro", 
                description:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
            }, 
            {
                title:"Writter & Blogger", 
                icon: "fa-solid fa-earth-europe", 
                description:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
            }
        ]
        return {
            title: 'About', 
            skills
        }
    },
}
</script>
