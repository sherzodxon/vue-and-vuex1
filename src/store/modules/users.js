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
        loading: false,
        alert: false,
        userLength: 0,
        page: 1
    }),
    mutations: {
        setUsers(state, data) {
            state.users = data
        },
        setUserLength(state, data) {
            state.userLength = data.length
        },
        postUsers(state, data) {
            state.users.push(data);
        },
        setAlert(state, isAlert) {
            state.alert = isAlert
        },
        setPage(state, data) {
            state.page = data
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
            context.commit("setUsers", data);
            context.commit("setUserLength", data)
            console.log(data);
        },
        async getUserPagination(context, {
            page = 1,
            limit = 8
        }) {
            context.commit("setLoading", true);
            const data = await getData(USERS.pagination_users(page, limit));
            context.commit("setUsers", data);
            context.commit("setLoading", false);
        },
        async getPage(context, page) {
            context.commit("setPage", page)
        },
        async getAlertOpen(context) {
            context.commit("setAlert", true)
        },
        async getAlertClose(context) {
            context.commit("setAlert", false)
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