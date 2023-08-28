import api from "../api";

export const UserList = (searchKey, currentPage, pageSize, token) => {
    return api.UserList(searchKey, currentPage, pageSize, token)
        .then((res) => {
          return res
        })
        .then((payload)=>{
            return payload
        })
        .catch((err) => {
            throw err
        });
  };
  export const DeleteUser = (id) => {
    return api.DeleteUser({id})
        .then((res) => {
          return res
        })
        .then((payload)=>{
            return payload
        })
        .catch((err) => {
            throw err
        });
  };