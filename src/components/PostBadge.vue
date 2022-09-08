<template>
    
    <div class="flex  justify-around">
         <!-- author --> 
                            <div class="onepost__content__author flex">

                                <aside>
                                    <font-awesome-icon icon="fa-solid fa-user-large" />
                                </aside>
                                <aside class="mx-2">
                                    {{post.user.username}}
                                </aside>
                            </div>

                            <!--blog date--> 
                            <div class="onepost__content__date flex ">
                                <aside>
                                    <font-awesome-icon icon="fa-regular fa-calendar-days" />
                                </aside>
                                <aside class="mx-2">
                                    {{moment(post.created_at).format("MMM Do YY") }}
                                </aside>
                            </div>

                            <!--blog comments-->
                            <div class="onepost__content__comments flex">
                                <aside>
                                    <font-awesome-icon icon="fa-regular fa-comments" />
                                </aside>
                                <aside class="mx-2"> {{post.user.comments.length}} comments</aside>
                            </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props:{
        post: Array
    }, 
    data(){
        return {
            moment: moment
        }
    }
}
</script>

<style lang="scss">
@import '../assets/styles/_main.scss'; 
</style>