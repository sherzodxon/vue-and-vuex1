import {
    USERS
} from "../../axios/axios";
import {
    getData,
    deleteData,
    editData,
    postData
} from "../../services/useAPI";
const Users = {
    namespaced: true,
    state: () => ({
        users: [],
        loading: false
    }),
    mutations: {
        setUsers(state, data) {
            state.users = data
        },
        postUsers(state, data) {
            state.product.unshift(data);
        },
        setLoading(state, isLoading) {
            state.loading = isLoading
        },
        deleteUsers(state, id) {
            const deleteObjInd = state.users.findIndex((obj) => obj.id === id);
            if (deleteObjInd > -1) {
                state.users.splice(deleteObjInd, 1);
            }
        },
        editUsers(state, data) {
            const editObjIndex = state.product.findIndex((obj) => obj.id === data.id);

            if (editObjIndex > -1) {
                state.users.splice(editObjIndex, 1, data);
            }
        },
    },
    actions: {
        async getUsers(context) {
            context.commit("setLoading", true);
            const data = await getData(USERS.all_users);
            context.commit("setLoading", false);
            context.commit("setUsers",data)
        },
        async createUsers(context, newData) {
            context.commit("setLoading", true);
            await postData(USERS.post_users, newData);
            context.commit("postUsers", newData);
            context.commit("setLoading", false);
        },
        async deleteProduct(context, id) {
            context.commit("setLoading", true);
            await deleteData(USERS.delete_users(id));
            context.commit("deleteUsers", id);
            context.commit("setLoading", false);
        },
        async editUsers(context, newData) {
            context.commit("setLoading", true);
            await editData(USERS.put_product, newData);
            context.commit("editProduct", newData);
            context.commit("setLoading", false);
        }
    }
}
export default Users