import {
    USERS
} from "../../boot/axios";
import {
    getData,
    deleteData,
    editData,
    postData,
    oneUsers
} from "../../services/useAPI";
const Users = {
    namespaced: true,
    state: () => ({
        users: [],
        loading: false,
        alert: false,
        userLength: 0,
        edit:false,
        modal:false,
        user:{}
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
        setEdit(state,edit){
         state.edit= edit
        },
        setModal(state,bool){
            state.modal=bool
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
            
            const editObjIndex = state.users.findIndex((obj) => obj.id ===data.id);
         
            if (editObjIndex > -1) {
                state.users.splice(editObjIndex, 1, data);
            }
        },
        setUser(state,data){
            state.user=data
        }
    },
    actions: {
        async getUsers(context) {
            context.commit("setLoading", true);
            const data = await getData(USERS.all_users);
            context.commit("setLoading", false);
            context.commit("setUsers", data);
            context.commit("setUserLength", data);
        },
        async getUser(context,id){
            context.commit("setLoading", true);
            const data = await oneUsers(USERS.one_users(id));
            context.commit("setLoading", false);
            context.commit("setUser", data);
        },
        async getUserPagination(context, {page = 1,limit = 8}) {
            context.commit("setLoading", true);
            const data = await getData(USERS.pagination_users(page, limit));
            context.commit("setUsers", data);
            context.commit("setLoading", false);
        },
        async getAlert(context,bool) {
            context.commit("setAlert", bool)
        },
        async getModal(context,bool) {
            context.commit("setModal", bool)
        },
        
        async getEdit(context,bool){
         context.commit("setEdit",bool)
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
            await editData(USERS.put_users(newData.id),newData);
            context.commit("editUsers", newData);
            context.commit("setLoading", false);
        }
    }
}
export default Users