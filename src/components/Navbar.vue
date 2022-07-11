<template>
    <div class="  w-full flex justify-center items-center lg:bg-white md:bg-black sm:text-white navbar ">
        <div class="navbar__content flex">

            <div class="navbar__brand bg-orange flex justify-center items-center">
                <span class="navbar__brand__logo uppercase">
                   <router-link to="/"> Axiole.</router-link>
                </span>
            </div>

            <div class="navbar__links w-full flex items-center justify-end">
                <div class="flex flex-column text-uppercase">
                    <div class="navbar__link " >
                        <span class="active">
                           <router-link to="blog">Blog</router-link>
                        </span>
                    </div>

                    <div class="navbar__link">
                        <span>
                            <router-link to="about">about</router-link>
                        </span>
                    </div>

                    <div class="navbar__link">
                        <span>
                            <router-link to="contact">Contact</router-link>
                        </span>
                    </div>

                </div>
            </div>
        
        </div>
    </div>
</template>

<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/_fonts.scss';

@mixin display(){
 display: flex;
 justify-content: center;
 align-items: center;
}
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
        @include display;
       
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