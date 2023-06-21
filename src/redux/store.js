import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/cart'

export default configureStore({
    reducer: { 
        cart: cartSlice
    }
})