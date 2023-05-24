<template>
    <!-- Button trigger modal -->
    <button type="button" @click="handleOpenModal" class="btn btn-warning mb-3">Add</button>
    <!-- Modal -->
    <div class="modal-shadow" id="shadow"></div>
    <div class="my-modal" id="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header mb-3">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Add User</h1>
                    <button type="button" @click="handleCloseModal" class="btn-close"></button>
                </div>
                <form @submit="handleCreateUser" id="modal-form" class="create-modal-form">
                    <div class="modal-body">
                        <div class="input-group flex-nowrap mb-3">
                            <Input v-model="name" placeholder="Name" />
                        </div>
                        <div class="input-group flex-nowrap mb-3">
                            <label for="username" class="input-group-text" id="addon-wrapping">@</label>
                            <Input v-model="username" id='username' placeholder="Username" />
                        </div>
                        <div class="input-group flex-nowrap mb-3">
                            <label for="exampleFormControlInput1" class="input-group-text"
                                id="addon-wrapping">email</label>
                            <Input v-model="email" type="email" id="exampleFormControlInput1"
                                placeholder="name@example.com" />
                        </div>
                        <div class="input-group flex-nowrap mb-3">
                            <label for="number" class="input-group-text" id="addon-wrapping">number</label>
                            <Input v-model="number" type="tel" id="number" placeholder="(99894) 936-5642" />
                        </div>
                        <div class="input-group flex-nowrap mb-3">
                            <label for="street" class="input-group-text" id="addon-wrapping">street</label>
                            <Input v-model="street" type="text" id="street" placeholder="guetamala" />
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
        data() {
            return {
                name: "",
                username: "",
                email: "",
                street: "",
                city: "",
                number: ""
            }
        },
        components: {
            Input
        },
        computed: {
            ...mapState("users", ["users", "loading","page"])
        },
        methods: {
            ...mapActions("users", ["getUsers", "createUsers","getUserPagination"]),
            async loadData() {
                try {
                    await this.getUsers()
                    await this.getUserPagination({
                        page: this.page,
                        limit:5,
                    });
                } catch {
                    console.error("yorvording!");
                }
            },
            async handleCreateUser(e) {
                e.preventDefault();
                const current = new Date()
                const timestring = current.toLocaleTimeString([], {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })

                const newData = {
                    date: timestring,
                    name: this.name,
                    email: this.email,
                    phone: this.number,
                    city: "Nazarboy",
                    street: this.street,
                    username: this.username
                }
                try { 
                    const modal = document.querySelector('#modal');
                modal.classList.remove("my-modal--active")
                const shadow = document.querySelector('#shadow');
                shadow.classList.remove("my-modal--active");
                const body = document.querySelector('body');
                body.classList.remove("body-hidden");
                const form = document.querySelector('#modal-form');
                form.reset()
                    await this.createUsers(newData);
                     this.loadData()
                    alertify.set('notifier', 'position', 'top-center');
                    alertify.success("Created", 'custom', 1, );
                } catch (error) {
                    alertify.set('notifier', 'position', 'top-center');
                    alertify.error("Error", 'custom', 1, );
                }


                const modal = document.querySelector('#modal');
                modal.classList.remove("my-modal--active")
                const shadow = document.querySelector('#shadow');
                shadow.classList.remove("my-modal--active");
                const body = document.querySelector('body');
                body.classList.remove("body-hidden");
                const form = document.querySelector('#modal-form');
                form.reset()
            },
            handleOpenModal() {
                const modal = document.querySelector('#modal');
                modal.classList.add("my-modal--active");
                const shadow = document.querySelector('#shadow');
                shadow.classList.add("my-modal--active");
                const body = document.querySelector('body');
                body.classList.add("body-hidden")
            },
            handleCloseModal() {
                const modal = document.querySelector('#modal');
                modal.classList.remove("my-modal--active")
                const shadow = document.querySelector('#shadow');
                shadow.classList.remove("my-modal--active");
                const body = document.querySelector('body');
                body.classList.remove("body-hidden")
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
    }

    .my-modal--active {
        display: block;
    }

    .body-hidden {
        height: 100vh;
        overflow-y: hidden;
    }
</style>