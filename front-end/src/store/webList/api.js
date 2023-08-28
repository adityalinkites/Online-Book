import api from "../api";

export const WebList = (searchKey, currentPage, pageSize, token) => {
    return api.WebList(searchKey, currentPage, pageSize, token)
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

  export const Delete = (id) => {
    return api.DeleteComic({id})
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