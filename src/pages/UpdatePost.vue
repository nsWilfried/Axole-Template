<template>
    <div>
        <UpdateForm />
    </div>
</template>
<script>
    import UpdateForm from '../components/UpdateForm.vue'
export default {
    data() {
        return {
            // post: {}
        };
    },
    mounted() {
        // console.log("je suis la page de modification du post", this.$route.params.id);
    },
    components: { UpdateForm }
}
</script>
<style lang="css">
    
</style>