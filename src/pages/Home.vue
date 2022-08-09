<template>
    <div>
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
        <div  class="blog  w-full flex justify-center items-center">
            <div style="width:1320px " class="bg-green- h-full flex ">
                <div class="blog__poster h-full bg-slate-300 w-2/3">
                    <img src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg" style="height:540px; " class=" bg-cover bg-scroll  " alt="random ">
                </div>

                <div class="blog__content h-full w-1/2 flex justify-center items-center">
                    <div class="w-full p-12 bg- h-auto">
                        <div class="w-full flex flex-row justify-between bg-green-"> 

                            <!-- author --> 
                            <div class="blog__content__author flex">

                                <aside>
                                    <font-awesome-icon icon="fa-solid fa-user-large" />
                                </aside>
                                <aside class="mx-2">admin</aside>
                            </div>

                            <!--blog date--> 
                            <div class="blog__content__date flex ">
                                <aside>
                                    <font-awesome-icon icon="fa-regular fa-calendar-days" />
                                </aside>
                                <aside class="mx-2">Jan. 30, 2021</aside>
                            </div>

                            <!--blog comments-->
                            <div class="blog__content__comments flex">
                                <aside>
                                    <font-awesome-icon icon="fa-regular fa-comments" />
                                </aside>
                                <aside class="mx-2">2comments</aside>
                            </div>
                        </div>
                        
                        <!-- title -->
                        <div class="blog__content__title bg-yellow-">
                            <span class="underline ">
                               Writing A Novel with A Heart
                            </span>
                        </div>

                        <!--description--> 
                        <div class="blog__content__description">
                            <span class="text-gray-400">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, rem. Et, quaerat vel at veniam magni repellat quasi deserunt voluptatem officia, beatae reprehenderit inventore perspiciatis. Ex numquam commodi maxime corrupti.
                            </span>
                        </div>

                        <!--learn more-->
                        <div class="blog__content__button">
                            <button class="bg-blue-400 text-white uppercase px-3 w-36 p-3 font-medium  my-3 rounded hover:bg-blue-600">Lire en plus</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Footer from "@/components/Footer.vue"
export default {
    components: {Footer}, 
    data() {

        return {
        }
    },

    mounted() {

    console.log(this.$store.state.user)
    },
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


.blog {
    background: $primary-bg; 
    color: #444;
    &__content{
        &__title {
            font-size: 80px;
            font-family: $primary-font;
            line-height: 1.1;
             margin-top: 10px;
             margin-bottom: 10px;
            
        }
        &__button {
            font-family: $primary-font;
        }
       
    }
}
    
</style>
