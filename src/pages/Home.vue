<template>
    <div>
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
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '../assets/styles/_variables.scss'; 
@import '../assets/styles/_fonts.scss';
@import '../assets/styles/_mixins.scss'; 

.banner{

    height: 750px;
    background: $primary-bg;
   font-family: $primary-font;

    &__content {
        width: $header-width;
        height: $full-height;
        //background: blue;
        > div {
            width: 880px ; 
            height: 420px;
            margin-top:59px;

            //background:orange;
        }
    }
    &__text {
        height:40px;
        text-transform: uppercase;
        margin-top:15px;
        > span {
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

        > span {
            font-weight: 800;
            color: #444;
            font-size: 14vw;
            line-height: 1.2;
    
        }
        &-special{
            color: #000;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: black;
        }
    }

    &__description {
        > div {
            height: 100px;
            margin-left:70px;
            //background: red;
            width: 500px;
            display: flex;
            align-items: flex-end;
                >span{
                    
                    font-size: 30px;
                    letter-spacing: 1px;
                    color: #919191;
                    font-weight: 200;
                }

        }
         
    }
}
    
</style>
