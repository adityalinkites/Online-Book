import api from "../api";

export const PreFillData = (id, token) => {
    return api.PreFillData(id, token)
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

export const Update = (id, formData, token) => {
    return api.Update(id, formData, token)
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