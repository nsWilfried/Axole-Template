<template>
    <div>
        <div>
            <Banner :name="title" />
        </div>

        <div class="contact w-full bg-orange-50 flex justify-center items-center ">
            <div class="contact__content h-screen flex  ">
                <div class="contact__form w-1/2 bg-slate-300">
                    
                </div>

                <div class="contact__map">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import  Banner from '@/components/Banner.vue'
export default {

    components : {Banner}, 
    data() {
        return {
            title: 'Contact'
        }
    },
    
}
</script>

<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/_fonts.scss';
.contact {
      height: 125vh;
    &__content {
        width: $header-width; 
        height: 650px;
        background: white;
    }
}
</style>