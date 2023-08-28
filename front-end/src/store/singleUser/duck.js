import { SingleUser } from "./api";

//Action Types
export const SINGLE_USER_API = "singleUser/duck/SINGLE_USER_API";

//**************************************/  Initial State /*******************************************/
const initialState = {
    user : [],
    message: "null",
    status : "Pending",
};

//****************************************/  Reducers  /********************************************/
// eslint-disable-next-line import/no-anonymous-default-export
export default function SingleUserReducer(state = initialState, action) {
    if (action.type === "SINGLE_USER_API_FULFILLED") {
        return {
            ...state,
            user : action.payload.data.data,
            message: "Single User Details",
            status : "Success",
        }
    }

    if (action.type === "SINGLE_USER_API_REJECTED") {
        return {
            ...state,
            user : "",
            message: action.payload.message,
            status : "Failed",
        }
    }

    else {
        return state;
    }
}

//****************************************/  action creator  /**********************************/
export const SingleUserAPI = (id, token) => {
    return {
            type: "SINGLE_USER_API",
            payload: SingleUser(id, token), 
    }
}