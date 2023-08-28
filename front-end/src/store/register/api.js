import api from "../api";

export const RegisterUser = (Data) => {
    return api.Register(Data)
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