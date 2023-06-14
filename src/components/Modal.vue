<template>
    <!-- Button trigger modal -->
    <button type="button" @click="handleOpenModal" class="btn btn-warning mb-3">Qo'shish</button>
    <!-- Modal -->
    <div class="modal-shadow" id="shadow"></div>
    <div v-if="modal || edit" class="modal-shadow--active"></div>
    <div v-if="modal || edit" class="my-modal my-modal--active" id="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header mb-3">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{edit? "O'zgartirish":"Yangi foydalanuvchi qo'shish"}}</h1>
                    <button type="button" @click="handleCloseModal" class="btn-close"></button>
                </div>
                <form @submit="handleCreateUser" id="modal-form" class="create-modal-form">
                    <div class="modal-body">
                        <div class="input-group flex-nowrap mb-3">
                            <Input v-model="name" placeholder="Ismi" />
                        </div>
                        <div class="input-group flex-nowrap mb-3">
                            <label for="username" class="input-group-text">@</label>
                            <Input v-model="username" id='username' placeholder="Foydalanuvchi nomi" />
                        </div>
                        <div class="input-group flex-nowrap mb-3">
                            <label for="exampleFormControlInput1" class="input-group-text">email</label>
                            <Input v-model="email" type="email" id="exampleFormControlInput1"
                                placeholder="name@example.com" />
                        </div>
                        <div class="input-group flex-nowrap mb-3">
                            <label for="number" class="input-group-text">raqam</label>
                            <Input v-model="phone" type="tel" id="number" placeholder="(99894) 936-5642" />
                        </div>
                        <div class="input-group flex-nowrap mb-3">
                            <label for="street" class="input-group-text">Info</label>
                            <textarea :value="street" @input="street=$event.target.value" id="street" placeholder="Info" class="form-control textarea"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-warning">Save</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapActions,
        mapState
    } from 'vuex';
    import Input from './Input.vue';
    import alertify from 'alertifyjs';
    export default {
        name: "Modal",
        props: {
            emit: {
                type: Object,
            }
        },
        data() {
            return {
                id: null ,
                name:  null,
                username: null,
                email: null,
                street: null,
                city: null,
                phone: null
            }
        },
       
        components: {
            Input
        },
        computed: {
            ...mapState("users", ["users", "loading", "modal", "edit"])
        },
        methods: {
            ...mapActions("users", ["getUsers", "createUsers", "getUserPagination", "getModal", "getEdit",
            "editUsers"]),
            async loadData() {
                try {
                    await this.getUsers()
                    await this.getUserPagination({
                        page: this.page,
                        limit: 8,
                    });
                } catch {
                    console.error("yorvording!");
                }
            },
            async handleCreateUser(e) {
                e.preventDefault();

                const newData = {
                    id:this.id,
                    date: this.timeString(),
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    city: "Nazarboy",
                    street: this.street,
                    username: this.username
                }
                if (this.edit) {
                    this.getEdit(false)
                    try {
                        await this.editUsers(newData);
                       await  this.loadData()
                        alertify.set('notifier', 'position', 'top-center');
                        alertify.success("O'zgartirildi", 'custom', 1, );
                    } catch (error) {
                       
                        alertify.set('notifier', 'position', 'top-center');
                        alertify.error("Error", 'custom', 1, );
                    }
                }
               else{
                try {
                    this.getModal(false);
                    await this.createUsers(newData);
                    await  this.loadData()
                    alertify.set('notifier', 'position', 'top-center');
                    alertify.success("Qo'shildi", 'custom', 1, );
                } catch (error) {
                    alertify.set('notifier', 'position', 'top-center');
                    alertify.error("Error", 'custom', 1, );
                }
               }
            },
            handleOpenModal() {
                this.getModal(true);
                    this.id = null,
                    this.name = null,
                    this.username = null,
                    this.email = null,
                    this.street = null,
                    this.city = "Nazarboy",
                    this.phone = null

            },
            handleCloseModal() {
                this.getModal(false)
                this.getEdit(false)
            },
            async getEditData() {
                
                this.id=this.emit.id
                this.name = this.emit.name
                this.username = this.emit.username;
                this.email = this.emit.email;
                this.city = this.emit.city;
                this.street = this.emit.street;
                this.phone = this.emit.phone

            },
            timeString() {
                const current = new Date()
                return current.toLocaleTimeString([], {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            },
           
        },
       
        watch: {
         
           edit:function () {
            this.getEditData()
           
          }
       
        },
       



    }
</script>
<style>
    .my-modal {
        display: none;
        position: absolute;
        background-color: #fff;
        top: 30px;
        z-index: 99;
        width: 400px;
        left: calc(50% - 200px);
        padding: 20px;
        border-radius: 10px;
    }

    .modal-shadow {
        display: none;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: rgb(0, 0, 0, 0.3);
    }

    .modal-shadow--active {
        display: block;
        z-index: 3;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgb(0, 0, 0, 0.3);
    }

    .my-modal--active {
        display: block;
    }

    .body-hidden {
        height: 100vh;
        overflow-y: hidden;
    }
    .textarea{
        height: 100px;
    }
    @media only screen and (max-width: 500px){
        .my-modal{
            width: 90%;
            left: 5%;
        }
    }
</style>