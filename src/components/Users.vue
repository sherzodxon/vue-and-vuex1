<template lang="">
    <tr>
        <th class="table-th" scope="row">{{ user.id }}</th>
        <td class="table-td"><router-link :to="{name:'user',params:{userId: user.id}}">{{ user.name }}</router-link></td>
        <td class="table-td table-username">{{ user.username }}</td>
        <td class="table-td text-primary table-username">{{ user.email }}</td>
        <td class="table-td text-success" >{{ user.phone }}</td>
        <td class="table-td date-text">{{ user.date }}</td>
        <td>
            <ul class="list-inline m-0">

                <li class="list-inline-item">

                    <button @click='onEdit'  class="btn user-btn btn-sm btn-outline-success rounded"
                        title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                            class="bi btns bi-pencil-fill" viewBox="0 0 16 16">
                            <path
                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                    </button>
                </li>
                <li class="list-inline-item">
                    <button @click="onDelete" class="btn user-btn btn-outline-danger btn-sm  rounded" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi btns bi-trash-fill" viewBox="0 0 16 16">
                            <path
                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                    </button>
                </li>
            </ul>
        </td>
    </tr>

</template>
<script>
    export default {
        name: "Users",
        props: {
            user: {
                type: Object,
                required: true
            },
           
        },
        methods: {
                onDelete() {
                    this.$emit('onDelete', this.user.id);
                },
                onEdit(){
                    this.$emit('onEdit',this.user.id)
                }
        },

    }
</script>
<style lang="css">
.date-text{
    color: brown;
}
@media only screen and (max-width: 900px){
    .table-td{
        font-size: 12px;
        text-align: center;
    }
    .table-th{
        font-size: 11px;
        text-align: center;
    }
}
@media only screen and (max-width: 700px){
.user-btn{
    border: none;
    padding: 2px 4px;
    border-radius: 2px;
}
@media only screen and (max-width: 650px){
.table-username{
    display: none;
}
}
@media only screen and (max-width: 650px){
    .table-td{
        font-size: 11px;
    }
}
@media only screen and (max-width: 450px){
.table-th{
    display: none;
}
.btns{
    width: 12px;
    height: 12px;
}
}
}
</style>