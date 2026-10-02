import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "../../services/cartService";

export const fetchCart = createAsyncThunk("/cart/fetch",
    async () => {
        const res = await cartService.getCart()
        return res.data.items;
    }
)

export const addToCart = createAsyncThunk("cart/add",
    async (item) => {
        const res = await cartService.addToCart(item);
        return res.data;
    }
)

export const updateQuantity = createAsyncThunk("cart/updateQuantity",
    async ({itemId, quantity}) => {
        const res = await cartService.updateQuantity(itemId, quantity);
        return res.data;
    }
)

export const removeFromCart = createAsyncThunk("cart/remove",
    async (itemId) => {
        await cartService.removeFromCart(itemId);
        const res = await cartService.getCart();
        return res.data.items;
    }
)

export const clearCart = createAsyncThunk("cart/clear",
    async () => {
        await cartService.clearCart();
        return [];
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        items:[],
        loading: false,
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload.items
            })
            .addCase(updateQuantity.fulfilled,(state, action) => {
                state.items = action.payload.items
            })
            .addCase(removeFromCart.fulfilled,(state, action)=>{
                state.items = action.payload
            })
            .addCase(clearCart.fulfilled, state => {
                state.items = []
            })
    }
})

export default cartSlice.reducer;