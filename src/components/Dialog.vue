<template>
    <div :class="alert?'dialog shadow':'dialog-none'">
        <h4 class="fs-4 mb-5">Are you sure?</h4>
        <div class="dialog-buttons-wrapper">
            <button class="btn btn-outline-primary " @click="handleClose">No</button>
            <button class="btn btn-danger" @click="handleDelete">Yes</button>
        </div>

    </div>
</template>
<script>
    import {
        mapActions,
        mapState
    } from 'vuex';
  import alertify from 'alertifyjs';
    export default {
        name: "Dialog",
        props: {

            emit: {
                type: Number || null,
                required: true
            }
        },
        computed: {
            ...mapState("users", ["alert","page"])
        },
        methods: {
            ...mapActions("users", ["getUsers","getAlertOpen", "getAlertClose", "deleteProduct","getUserPagination"]),
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
            handleClose() {
                this.getAlertClose()
                const body = document.querySelector("body")
                body.classList.remove('body-hidden')
                const shadow = document.querySelector('#shadow')
                shadow.classList.remove('modal-shadow--active')
            },
            async handleDelete() {
                this.getAlertClose()
                await this.deleteProduct(this.emit)
              this.loadData()
                const body = document.querySelector("body")
                body.classList.remove('body-hidden')
                const shadow = document.querySelector('#shadow')
                shadow.classList.remove('modal-shadow--active')
                alertify.set('notifier', 'position', 'top-center');
                alertify.success("Deleted", 'custom', 1, );
            },
        },

    }
</script>
<style>
    .dialog-none {
        display: none;
    }

    .dialog {
        display: block;
        position: fixed;
        background-color: #fff;
        width: 350px;
        left: calc(50% - 175px);
        border-radius: 10px;
        padding: 20px;
        top: 80px;
        z-index: 3;
    }

    .dialog-buttons-wrapper {
        width: 120px;
        margin-left: auto;
        display: flex;
        justify-content: space-between;
    }
</style>