import { api} from "../axios/axios";

const getData = async (url) => {
    try {
        const res = await api.get(url)
        return res.data
    } catch {
        throw new Error(error);
    }
}

const postData = async (url,data)=>{
    try {   
        const res = await api.post(url,data)
        return res.data
    } catch {
        throw new Error(error);
    }
}

const editData = async (url, data) => {
    try {
      const res = await api.put(url, data);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
 };
  
  const deleteData = async (url) => {
    try {
      const res = await api.delete(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  };
  export { getData, postData, editData, deleteData };
  