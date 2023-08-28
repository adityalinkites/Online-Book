import api from "../api";

// export const PreFillData = (id) => {
//     return api.PreFillData(id)
//         .then((res) => {
//           return res
//         })
//         .then((payload)=>{
//             return payload
//         })
//         .catch((err) => {
//             throw err
//         });
// };

export const SingleUser = (id, token) => {
    return api.SingleUser(id, token)
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
