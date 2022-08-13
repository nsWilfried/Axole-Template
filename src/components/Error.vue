<template>
    <div style="width:330px" class="bg-red-400 text-white p-2 text-center rounded-lg my-2" >
                <span>
                    {{errorMessage}}
                </span>
            </div>
</template>

<script>
export default {
    props: {
        errorMessage: String
    }
}
</script>