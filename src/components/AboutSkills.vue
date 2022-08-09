<template>
    <div class="about__skill flex flex-row w-full h-40 mt-2 bg-white hover:text-white">
        <div class="about__skill_icon w-48 bg-orange flex justify-center items-center ">
            <font-awesome-icon class="text-5xl" :icon="icon" />
        </div>

        <div class="about__skill__content flex flex-col">
            <div class="about__skill__title p-4">
                <span class="underline font-medium  text-lg ">
                    {{title}}
                </span>
            </div>

            <div class="about__skill__description p-4">
                <span>
                    {{description}}
                </span>
            </div>
        </div>

    
    </div>
</template>

<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/_fonts.scss';
.about__skill {
    background: white;
    box-shadow: none;
    transition: all 0.4s;
    &:hover {
        background: #444444;
        cursor: pointer;
        box-shadow: 0 5px 25px -2px rgba(0,0,0,.18);
        transition: all .4s;
        span {
            color: white;
        }
    }
}
.about__skill__title, .about__skill__description > span  {
    font-family:$primary-font;
    font-size: 20px;
    color:$about-text-color ;
   
}
 .about__skill__description > span {
     font-size: 16px;
     color: $secondary-color;
    }
</style>
<script>
export default {
    props: {
        title: String, 
        description: String, 
        icon: String
    }, 
}
</script>