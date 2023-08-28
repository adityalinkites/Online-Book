import { AddComic } from "./api";
//Action Types
export const ADD_COMIC_API = "AddComic/duck/ADD_COMIC_API";

//**************************************/  Initial State /*******************************************/
const initialState = {
    user: null,
    message: "pending",
    status: "pending"
};

//****************************************/  Reducers  /********************************************/
// eslint-disable-next-line import/no-anonymous-default-export
export default function AddComicReducer(state = initialState, action) {
    if (action.type === "ADD_COMIC_API_FULFILLED") {
        return {
 
            user: action.payload.Data,
            message: action.payload.data.message,
            status: action.payload.status,
        }
    }
    if (action.type === "ADD_COMIC_API_REJECTED") {
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
export const AddComicAPI = (formData, token) => {
    return {
            type: "ADD_COMIC_API",
            payload: AddComic(formData,token), 
    }
}