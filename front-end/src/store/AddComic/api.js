import api from "../api";

export const AddComic = (formData, token) => {
    
    return api.Add(formData, token)
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