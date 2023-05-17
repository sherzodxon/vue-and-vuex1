<template lang="">
    <div class="about">
        <p v-if="loading">Loading...</p>
        <h2 v-for="users in users" v-if="!loading">
         {{ users.name }}
        </h2>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name:"IndexPage",
    computed:{
        ...mapState("users",["users","loading"])
    },
    methods:{
        ...mapActions("users",["getUsers"]),
        async loadData(){
    try {
        await this.getUsers()
    }
    catch{
    console.error("sd");
    }
   }
    },
    mounted() {
    console.log(`the component is now mounted.`)
   
  this.loadData()
  }
    
}
</script>
<style lang="">
    
</style>