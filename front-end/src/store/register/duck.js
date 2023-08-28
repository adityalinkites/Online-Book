import { RegisterUser } from "./api";
//Action Types
export const REGISTER_USER_API = "Register/duck/REGISTER_USER_API";

//**************************************/  Initial State /*******************************************/
const initialState = {
    user: null,
    message: "pending",
    status: "pending"
};

//****************************************/  Reducers  /********************************************/
// eslint-disable-next-line import/no-anonymous-default-export
export default function RegisterReducer(state = initialState, action) {
    if (action.type === "REGISTER_USER_API_FULFILLED") {
        return {
            ...state,
            user: action.payload.Data,
            message: action.payload.data.message,
            status: action.payload.status,
        }
    }
    if (action.type === "REGISTER_USER_API_REJECTED") {
        return {
            ...state,
            user: "null",
            message: action.payload.errMessage,
            status: action.payload.status,
        }
    }
    else {
        return state;
    }
}
//****************************************/  action creator  /**********************************/
export const RegisterUserAPI = (Data) => {
    return {
            type: "REGISTER_USER_API",
            payload: RegisterUser(Data), 
    }
}