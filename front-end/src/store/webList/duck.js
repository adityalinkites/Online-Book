import { WebList, Delete} from "./api";
//Action Types
export const WEB_LIST_API = "webList/duck/WEB_LIST_API";
export const DELETE_USER_API = "UserList/duck/DELETE_USER";
//**************************************/  Initial State /*******************************************/
const initialState = {
    auth: false,
    comic: null,
    message: "pending",
    status: "pending",
    totalRecords: 0
};

//****************************************/  Reducers  /********************************************/
// eslint-disable-next-line import/no-anonymous-default-export
export default function WebListReducer(state = initialState, action) {
    if (action.type === "WEB_LIST_API_FULFILLED") {
        return {
            auth: true,
            comic: action.payload.data.data,
            totalRecords: action.payload.data.totalRecords,
            message: action.payload.data.message,
            status: action.payload.status,
        }
    }
    if (action.type === "WEB_LIST_API_REJECTED") {
        return {
            auth: false,
            comic: "null",
            totalRecords: "null",
            message: action.payload.errMessage,
            status: action.payload.status,
        }
    }
    else {
        return state;
    }
}
//****************************************/  action creator  /**********************************/
export const WebListAPI = (searchKey, currentPage, pageSize, token) => {
    return {
            type: "WEB_LIST_API",
            payload: WebList(searchKey, currentPage, pageSize, token), 
    }
}

export const DeleteUser = (id) => {
    return {
            type: "DELETE_USER_API",
            payload: Delete(id), 
    }
}