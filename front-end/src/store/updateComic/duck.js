import { PreFillData, Update } from "./api";

//Action Types
export const PRE_FILLED_API = "updateComic/duck/PRE_FILLED_API";
export const UPDATE_COMIC_API = "updateComic/duck/UPDATE_COMIC_API"

//**************************************/  Initial State /*******************************************/
const initialState = {
    user : [],
    message: "null",
    status : "Pending",
};

//****************************************/  Reducers  /********************************************/
// eslint-disable-next-line import/no-anonymous-default-export

export default function UpdateComicReducer(state = initialState, action) {
    if (action.type === "PRE_FILLED_API_FULFILLED") {
        return {
            ...state,
            user : action.payload?.data.data,
            message: "preFilledData",
            status : "Success",
        }
    }

    if (action.type === "PRE_FILLED_API_REJECTED") {
        return {
            ...state,
            user : "",
            message: action.payload.message,
            status : "Failed",
        }
    }

    if (action.type === "UPDATE_COMIC_API_FULFILLED") {
        return {
            ...state,
            user : action.payload.data.data,
            message: "Comic Info Updated Successfully",
            status : "Success",
        }
    }
    if (action.type === "UPDATE_COMIC_API_REJECTED") {
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
export const PreFillDataAPI = (id, token) => {
    return {
            type: "PRE_FILLED_API",
            payload: PreFillData(id, token), 
    }
}
export const UpdateComicAPI = (id, formData, token) => {
    return {
            type: "UPDATE_COMIC_API",
            payload: Update(id, formData, token), 
    }
}