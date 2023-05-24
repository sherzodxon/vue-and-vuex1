<template>
    <paginate :page-count="Math.ceil(this.userLength / 5)" 
    :page-range="3" :margin-pages="2"
    :click-handler="clickCallback" 
    :prev-text="'Prev'" :next-text="'Next'"
    :container-class="'pagination pagination-sm'"
    :page-class="'page-item'">
    </paginate>
</template>

<script>
    import Paginate from 'vuejs-paginate-next';
    import {
        mapActions,
        mapState
    } from 'vuex';
    export default {
        components: {
            paginate: Paginate,
        },
        computed: {
            ...mapState("users", ["users","userLength", "page"])
        },
        methods: {
            ...mapActions("users", ["getUserPagination", ]),
            async clickCallback(pageNum) {
                await this.getUserPagination({
                    page: pageNum,
                    limit: 5
                }, )
            }
        },
        mounted() {
            console.log(this.users);
        },
    };
</script>

<style>
    .pagination {
        margin: 40px auto;
        position: absolute;
        left: 50%;
    }

    .page-item {
        cursor: pointer;
    }

    .page-item:last-child,
    .page-item:first-child {
        display: none;
    }
    
</style>