import axios from "axios";

const api = axios.create({baseURL:"https://retoolapi.dev/nMF93Q"});
 const USERS={
    all_users:"/users",
    post_users:"/users",
    delete_users:(id)=>`/users/${id}`,
    put_users:"/users"
 }

 export{api,USERS}