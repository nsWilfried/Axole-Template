<template>

    <div>
        <Navbar />
        <div class="w-full h-screen bg-slate- flex justify-center ">

            <div>
                <PostForm />
            </div>
        </div>
    </div>

</template>

<script>
import PostForm from "@/components/PostForm.vue"
import Navbar from '@/components/Navbar.vue'
export default {
    components: {
        PostForm, Navbar
    },
    data() {
        return {
        }
    },

}
</script>

<style>

</style>