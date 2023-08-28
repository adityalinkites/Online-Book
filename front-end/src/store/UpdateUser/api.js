import api from "../api";

export const UpdateUser = (id, formData, token) => {
    return api.UpdateUser(id, formData, token)
      .then((res) => {
        console.log(res, "<<<<")
        return res
        
      })
      .then((payload)=>{
          return payload
      })
      .catch((err) => {
          throw err
      });
  };
  export const SingleUser = (id, token) => {
    return api.Single(id, token)
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