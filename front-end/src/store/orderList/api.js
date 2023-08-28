import api from "../api";

export const OrderList = (id, token) => {
    return api.OrderList(id, token)
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
