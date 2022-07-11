<template>
    <div>
        <div>
            <Banner :name="title"/>
        </div>
    </div>
</template>

<script>
import Banner from "@/components/Banner.vue"
export default {
    components: {Banner},
    data() {
        return {
            title: 'About'
        }
    },
}
</script>