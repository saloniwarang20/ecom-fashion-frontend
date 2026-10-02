import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer  from "../features/wishlist/wishlistSlice"
import cartReducer from "../features/cart/cartSlice"
import uiReducer from "../features/ui/uiSlice"

export const store = configureStore({
    reducer:{
        wishlist: wishlistReducer,
        cart: cartReducer,
        ui: uiReducer
    },
})