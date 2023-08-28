import { UpdateUser } from "./api";
//Action Types
export const UPDATE_USER_API = "UpdateUser/duck/UPDATE_USER_API";

//**************************************/  Initial State /*******************************************/
const initialState = {
    users : [],
    message: "null",
    status : "null",
    auth: false,
};

//****************************************/  Reducers  /********************************************/
// eslint-disable-next-line import/no-anonymous-default-export
export default function UpdateUserReducer(state = initialState, action) {
    
    if (action.type === "UPDATE_USER_API_FULFILLED") {
        return {
            ...state,
            users : action.payload,
            message: action.payload.data.message,
            status : "Success",
            auth: true,
        }
    }
    else if (action.type === "UPDATE_USER_API_REJECTED") {
        return {
            ...state,
            users: "null",
            message: action.payload.message,
            status : "Failed",
            auth: false,
        }
    }
    else {
        return state;
    }
};
//****************************************/  action creator  /**********************************/
export const UpdateUserAPI = (id, formData, token) => {
    return {
            type: "UPDATE_USER_API",
            payload: UpdateUser(id, formData, token), 
    }
};
// export const SingleUserAPI = (id, token) => {
//     return {
//         type: "SINGLE_USER_API",
//         payload: SingleUser(id, token)
//     };
//   };
