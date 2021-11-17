import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: {},
    total: 0,
    totalPrice: 0,
}

export const CartSlice = createSlice({
    name: "cartItems",
    initialState,
    reducers: {
        addCartProduct: (state, action) => {
            const item_id = Object.keys(action.payload.item);
            if(state.list[item_id] !== undefined) {
                const qty = state.list[item_id].qty + action.payload.item[item_id].qty;
                state.list = {...state.list, [item_id]: {
                    qty,
                    data: action.payload.item[item_id].data
                }};
                state.totalPrice = state.totalPrice + (qty * action.payload.item[item_id].data.price);
            } else {
                state.list = {...state.list, ...action.payload.item};
                state.totalPrice = state.totalPrice + (action.payload.item[item_id].qty * action.payload.item[item_id].data.price);
            }

            state.total = state.total + action.payload.item[item_id].qty;
        },
        removeCartProduct: (state, action) => {
            const newCartItems = state.list;
            state.totalPrice = state.totalPrice - (newCartItems[action.payload.product_id].qty *  newCartItems[action.payload.product_id].data.price);
            state.total = state.total - newCartItems[action.payload.product_id].qty;
            delete newCartItems[action.payload.product_id];
            state.list = newCartItems;
        },
        modifyProductQuantity: (state, action) => {
            const newList = state.list;
            state.totalPrice = state.totalPrice + ((action.payload.qty - newList[action.payload.product_id].qty) *  newList[action.payload.product_id].data.price);
            state.total = state.total + (action.payload.qty - newList[action.payload.product_id].qty);
            newList[action.payload.product_id].qty = action.payload.qty;
            state.list = newList; 
        }
    }
})

export const {addCartProduct, removeCartProduct, modifyProductQuantity} = CartSlice.actions;

export default CartSlice.reducer;

