import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slices/CartSlice";

export const store = configureStore({
    reducer: {
        cartProducts: CartReducer
    }
})