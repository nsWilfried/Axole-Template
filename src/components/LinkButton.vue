<template>
        <div class=" button  text-center rounded-md p-2  ml-2 ">
            <span class="uppercase">
                <router-link :to="link">
                    {{name}}
                </router-link>
            </span>
        </div>
</template>

<script>
export default {
    props: {
        name: String, 
        link: String
    }
}
</script>

<style lang="scss">
@import '../assets/styles/_variables.scss'; 
@import '../assets/styles/_fonts.scss'; 


    .button {
        > span {
            font-family: $primary-font;

        }
    }
</style>