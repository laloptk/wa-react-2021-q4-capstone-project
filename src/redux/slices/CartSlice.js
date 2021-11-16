import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: {},
    total: 0
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
            } else {
                state.list = {...state.list, ...action.payload.item};
            }

            state.total = state.total + action.payload.item[item_id].qty;
        },
        removeCartProduct: (state, action) => {
            const newCartItems = state.list;
            console.log(newCartItems[action.payload.product_id].qty);
            state.total = state.total - newCartItems[action.payload.product_id].qty;
            delete newCartItems[action.payload.product_id];
            state.list = newCartItems;
        }
    }
})

export const {addCartProduct, removeCartProduct} = CartSlice.actions;

export default CartSlice.reducer;

