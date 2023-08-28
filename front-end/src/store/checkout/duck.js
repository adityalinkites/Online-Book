import { CheckOut } from "./api";
//Action Types
export const CHECK_OUT_API = "CheckOut/duck/CHECK_OUT_API";

//**************************************/  Initial State /*******************************************/
const initialState = {
    user: null,
    message: "pending",
    status: "pending"
};

//****************************************/  Reducers  /********************************************/
// eslint-disable-next-line import/no-anonymous-default-export
export default function CheckOutReducer(state = initialState, action) {
    if (action.type === "CHECK_OUT_API_FULFILLED") {
        return {
 
            user: action.payload,
            message: action.payload.data.message,
            status: action.payload.status,
        }
    }
    if (action.type === "CHECK_OUT_API_REJECTED") {
        return {
    
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
export const CheckOutAPI = (token, id) => {
    return {
            type: "CHECK_OUT_API",
            payload: CheckOut(token, id), 
    }
}