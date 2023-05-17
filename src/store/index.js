import {createStore } from "vuex";


import users from "./modules/users"


export default new createStore({
    modules:{
        users
    }
})