<template >
    <input type="text" required class="form-control" :value="modelValue" @input="handleInput">
</template>
<script>
export default {
    name:"Input",
    methods:{
        handleInput(e){
            this.$emit('update:modelValue', e.target.value)
        }
    },
    props:{
        modelValue:[String , Number],
        required:true
    }
}
</script>
<style >
</style>