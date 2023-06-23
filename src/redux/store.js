import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/cart';
import wishlistSlice from './slices/wishlist'

export default configureStore({
    reducer: { 
        cart: cartSlice,
        wishlist: wishlistSlice
    }
})