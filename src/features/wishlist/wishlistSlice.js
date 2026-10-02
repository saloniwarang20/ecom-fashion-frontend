import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import wishlistService from "../../services/wishlistService";

export const fetchWishlist = createAsyncThunk("/wishlist/fetchWishlist",
    async () => {
        const res = await wishlistService.getWishlist();
        return res.data.items;
    }
)

export const addToWishlist = createAsyncThunk("wishlist/addToWishlist",
    async (productId) => {
        const res = await wishlistService.addItemToWishlist({
            productId,
        })
        return res.data.items;
    }
)

export const removeFromWishlist = createAsyncThunk("wishlist/removeFromWishlist",
    async (wishlistItemId,{dispatch}) => {
        await wishlistService.removeItemWishlist(wishlistItemId);
        const res = await wishlistService.getWishlist();
        return res.data.items;
    }
)

export const clearWishlist = createAsyncThunk(
    "wishlist/clearWishlist",
    async () => {
        await wishlistService.clearWishlist();
        return [];
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState:{
        items:[],
        loading: false,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })

            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.items = action.payload;
            })

            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(clearWishlist.fulfilled, (state) => {
                state.items = [];
            })
        }

})

export default wishlistSlice.reducer;