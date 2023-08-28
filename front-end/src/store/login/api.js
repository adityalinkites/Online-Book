import api from "../api";

export const Login = (Data) => {
    
    return api.Login(Data)
        .then((res) => {
            console.log(res, "<<<<<<<<");
          return res
        })
        .then((payload) => {
            return payload
        })
        .catch((err) => {
            console.log(err, "<<<<<")
            throw err
        });
  };