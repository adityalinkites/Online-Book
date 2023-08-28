import api from "../api";

export const CheckOut = (token, id) => {
    
    return api.CheckOut(token, id)
        .then((res) => {
            console.log(res, "<<<<<<<<");
          return res
        })
        .then((payload)=>{
            return payload
        })
        .catch((err) => {
            console.log(err, "<<<<<")
            throw err
        });
  };