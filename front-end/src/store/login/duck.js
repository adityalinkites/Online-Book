import { Login } from "./api";
//Action Types
export const LOGIN_USER_API = "Login/duck/LOGIN_USER_API";

//**************************************/  Initial State /*******************************************/
const initialState = {
    auth: false,
    user: null,
    token: "null",
    message: "pending",
    status: "pending"
};

//****************************************/  Reducers  /********************************************/
// eslint-disable-next-line import/no-anonymous-default-export
export default function LoginReducer(state = initialState, action) {
    if (action.type === "LOGIN_USER_API_FULFILLED") {
        return {
            ...state,
            auth: true,
            user: action.payload.data.data,
            token: action.payload.data.token,
            message: action.payload.data.message,
            status: "200",
        }
    }
    if (action.type === "LOGIN_USER_API_REJECTED") {
        return {
            auth: false,
            user: "null",
            token: "null",
            message: action.payload.message,
            status: action.payload.status
        }
    }
    if(action.type === "Logout"){
        return {
            ...state,
            auth: false,
            user: "null",
            token: "null",
            error: "null",
            message: "Logout Success",
        }
    }
    else {
        return {
            state,
        }
    }
}
//****************************************/  action creator  /**********************************/
export const LoginUserAPI = (Data) => {
    return {
            type: "LOGIN_USER_API",
            payload: Login(Data), 
    }
}
//Logout
export const Logout = () => {
    return (dispatch) => {
        dispatch({
            type: "Logout",
        })
    }
}