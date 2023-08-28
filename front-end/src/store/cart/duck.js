//Action Types
export const ADD_TO_CART = 'cart/duck/ADD_TO_CART';

//**************************************/  Initial State /*******************************************/
const initialState = {
    cartItems: [],
};
//****************************************/  Reducers  /********************************************/
// eslint-disable-next-line import/no-anonymous-default-export



export default function cartReducer(state = initialState, action) {
    if(action.type === "ADD_TO_CART"){
        return {
            ...state,
            cartItems: [...state.cartItems.filter(item => item.comic_id > 0 ? item : item[0]), action.payload],
        }
    }
    if(action.type === "REMOVE_ITEM_FROM_CART"){
        return {
            ...state,
            cartItems: state.cartItems.filter(item => item.comic_id !== action.payload),
        }
    }
    else{
        return state;
    }
};

//****************************************/  action creator  /**********************************/
export const addToCart = (item) => {
    return {
        type: "ADD_TO_CART",
        payload: item,
    };
};


export const removeItemFromCart = (item) => {
    return {
        type: 'REMOVE_ITEM_FROM_CART',
        payload: item,
    };
};

