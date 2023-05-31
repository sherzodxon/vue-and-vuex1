import axios from "axios";

const api = axios.create({baseURL:"https://retoolapi.dev/nMF93Q"});
 const USERS={
    all_users:"/users",
    post_users:"/users",
    delete_users:(id)=>`/users/${id}`,
    put_users:(id)=>`/users/${id}`,
    pagination_users: (page=1 , limit = 8) =>
    `/users?_page=${page}&_limit=${limit}`,
}

 export{api,USERS}