<template>
    <div>
        <Navbar />
        <UpdateForm />
    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import UpdateForm from '../components/UpdateForm.vue'
export default {
    components: { UpdateForm, Navbar }, 

    data() {
        return {
            // post: {}
        };
    },
    mounted() {
        // console.log("je suis la page de modification du post", this.$route.params.id);
    },
}
</script>
<style lang="scss">

</style>