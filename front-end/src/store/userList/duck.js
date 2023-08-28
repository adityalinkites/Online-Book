import { UserList, DeleteUser } from "./api";
//Action Types
export const USER_LIST_API = "UserList/duck/USER_LIST";
export const DELETE_USER_API = "UserList/duck/DELETE_USER";

//**************************************/  Initial State /*******************************************/
const initialState = {
    users : [],
    message: "null",
    totalUsers: "0",
    status : "pending",
};

//****************************************/  Reducers  /********************************************/
// eslint-disable-next-line import/no-anonymous-default-export
export default function UserReducer(state = initialState, action) {
    if (action.type === "USER_LIST_API_FULFILLED") {
        return {
            ...state,
            users : action.payload.data.data,
            message: "List is here",
            totalUsers: action.payload.data.totalRecords,
            status : "Success",
        }
    }
    if (action.type === "USER_LIST_API_REJECTED") {
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

export const UserListAPI = (searchKey, currentPage, pageSize, token) => {
    return {
            type: "USER_LIST_API",
            payload: UserList(searchKey, currentPage, pageSize, token), 
    }
}
//
export const DeleteUserAPI = (id) => {
    return {
            type: "DELETE_USER_API",
            payload: DeleteUser(id), 
    }
}
//Pagination--------------------------------------------------------------
export const setPage = (page) => {
    return (dispatch) => {
      dispatch({
        type: "setPage",
        payload: { page },
      });
    };
  };
  //Search-------------------------------------------------------------------
  export const setSearch = (search) => {
    return (dispatch) => {
      dispatch({
        type: "setSearch",
        payload: { search },
      });
    };
  };