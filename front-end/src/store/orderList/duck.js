import { OrderList } from "./api";

//Action Types
export const ORDER_LIST_API = "orderList/duck/ORDER_LIST_API";

//**************************************/  Initial State /*******************************************/
const initialState = {
    order : [],
    message: "null",
    status : "Pending",
};

//****************************************/  Reducers  /********************************************/
// eslint-disable-next-line import/no-anonymous-default-export
export default function OrderListReducer(state = initialState, action) {
    if (action.type === "ORDER_LIST_API_FULFILLED") {
        return {
            ...state,
            order : action.payload.data.data,
            message: "Order is here",
            status : "Success",
        }
    }

    if (action.type === "ORDER_LIST_API_REJECTED") {
        return {
            ...state,
            order : "",
            message: action.payload.message,
            status : "Failed",
        }
    }

    else {
        return state;
    }
}

//****************************************/  action creator  /**********************************/
export const OrderListAPI = (id, token) => {
    return {
            type: "ORDER_LIST_API",
            payload: OrderList(id, token), 
    }
}