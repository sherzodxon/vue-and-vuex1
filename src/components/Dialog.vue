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
            ...mapState("users", ["alert"])
        },
        methods: {
            ...mapActions("users", ["getUsers", "getAlert", "deleteProduct", "getUserPagination"]),
            async loadData() {
                try {
                    await this.getUsers()
                    await this.getUserPagination({
                        page: this.page,
                        limit: 5,
                    });
                } catch {
                    console.error("yorvording!");
                }
            },
            handleClose() {
                this.getAlert(false)

            },
            async handleDelete() {
                this.getAlert(false)
                await this.deleteProduct(this.emit)
                this.loadData()
                alertify.set('notifier', 'position', 'top-center');
                alertify.success("Deleted", 'custom', 1, );
            },
            classSelect() {
                const shadow = document.querySelector('#shadow')
                if (this.alert) {
                    shadow.classList.add('modal-shadow--active')

                } else {
                    shadow.classList.remove('modal-shadow--active')
                }
            }
        },
        updated() {
            this.classSelect()
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
        top: 120px;
        z-index: 3;
    }

    .dialog-buttons-wrapper {
        width: 120px;
        margin-left: auto;
        display: flex;
        justify-content: space-between;
    }
    @media only screen and (max-width: 500px){
        .dialog{
            width: 300px;
            left:  calc(50% - 150px);
            top: 150px;
        }
    }
</style>