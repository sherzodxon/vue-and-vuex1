<template>
    <div class="wrapper">
        <div class="shadow container-xl border rounded mt-5 p-3 pb-5 border-ligth-subtle">
            <header class="header d-flex justify-content-between align-items-center">
                <Modal />
                <Dialog :emit="emit" />
            </header>

            <table class=" table table-striped ">
                <Thead />
                <tbody class="tbody">
                    <div v-show="loading" class="spinner-shadow"></div>
                    <div v-show="loading" class="spinner-border spinner-wrapper" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <Users v-for="users in users" :user="users" :key="users.id" @onDelete="isDelete" />
                </tbody>

            </table>

        </div>
        <Pagination />
    </div>




</template>
<script>
    import {
        mapState,
        mapActions
    } from 'vuex';
    import Thead from '../../components/Thead.vue';
    import Users from '../../components/Users.vue';
    import Modal from '../../components/Modal.vue';
    import Dialog from '../../components/Dialog.vue';
    import Pagination from '../../components/Pagination.vue';
    export default {
        name: "IndexPage",
        data() {
            return {
                alert: false,
                emit: null
            }
        },
        components: {
            Thead,
            Users,
            Modal,
            Dialog,
            Pagination
        },
        computed: {
            ...mapState("users", ["users", "loading", "alert","page" ])
        },
        methods: {
            ...mapActions("users", ["getUsers", "createUsers", "getAlertOpen", "getUserPagination"]),
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
            async isDelete(item) {
                this.emit = item
                this.getAlertOpen()
                const body = document.querySelector("body")
                body.classList.add('body-hidden')
                const shadow = document.querySelector('#shadow')
                shadow.classList.add('modal-shadow--active')
            }


        },
        mounted() {

            this.loadData()

        }


    }
</script>
<style lang="css">
    .spinner-wrapper {
        position: absolute;
        top: 30%;
        margin-top: 15px;
        left: calc(50% - 25px);
        z-index: 8;
    }

    .tbody {
        position: relative;
    }

    .spinner-shadow {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgb(0, 0, 0, 0.3);
        z-index: 2;

    }

    header {
        position: relative;
    }

    .shadow-none {
        display: none;
    }
</style>