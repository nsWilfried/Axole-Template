<template>
    <div class="about">
        <div>
            <Banner :name="title"/>
        </div>

        <div class="about__content flex flex-col items-center justify-center">

            <div class="about__profile flex flex-row  ">

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
                             <AboutSkills v-for="skill of skills" :key="skill" :title="skill.title" :description='skill.description' />
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
</style>
<script>
import Banner from "@/components/Banner.vue";
import AboutSkills from '@/components/AboutSkills.vue';
export default {
    components: {Banner, AboutSkills},
    data() { 

        const skills = [
            {
                title:"Writter & Blogger", 
                description:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
            }
            , 
            {
                title:"Writter & Blogger", 
                description:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
            }, 
            {
                title:"Writter & Blogger", 
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