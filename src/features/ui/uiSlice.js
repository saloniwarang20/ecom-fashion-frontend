import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",

    initialState:{
        wishlistOpen: false,
    },

    reducers:{
        openWishlist(state){
            state.wishlistOpen = true;
        },

        closeWishlist(state){
            state.wishlistOpen = false;
        },

        toggleWishlist(state){
            state.wishlistOpen = !state.wishlistOpen;
        }
    }
})

export const { openWishlist, closeWishlist, toggleWishlist} = uiSlice.actions;

export default uiSlice.reducer;