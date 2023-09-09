<template>
    <div class="wrapper shadow container-xl border rounded mt-5 p-5 pb-5 border-ligth-subtle" v-if="!loading">
        <h1 class="text-center mb-5">{{user.name}}</h1>
        <router-link class="back-link" to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left-circle back-button" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
        </router-link>
        
       <p class="text-center mb-5">{{user.street}}</p>
      
       <div class="tel-wrapper">
        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-telephone-forward-fill " viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm10.761.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708z"/>
          </svg>
          <a :href="tel">: {{user.phone}}</a>
       </div>
       <div class="email-wrapper mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-envelope-at" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
            <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
          </svg>
          <a :href="user.email">: {{user.email}}</a>
       </div>
       <p class="date">{{user.date}}</p>
    </div>
    <div v-show="loading" class="spinner-border spinner-wrapper" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</template>
<script >
    import {
        useRoute
    } from 'vue-router';
    import {
        ref,
    } from 'vue';
import { mapActions, mapState } from 'vuex';
   
    export default{
        data() {
            return {
                tel:null
            }
        },
     setup() {
        const route = useRoute()
        const id=ref(route.params.userId)
        return{
            id
        }
     },
    computed:{
       ...mapState("users",["user","loading"])
    },
    methods: {
        ...mapActions("users",["getUser"]),
       
       async render(){
        await this.getUser(this.id)
        this.tel=`tel:${this.user.phone}`
        }
    },
     mounted() {
       this.render()
     },
    }
    

</script>
<style >
.wrapper{
    position: relative;
}
.back-button{
    position: absolute;
    top: 55px;
}
.back-link{
    color: black;
}
</style>