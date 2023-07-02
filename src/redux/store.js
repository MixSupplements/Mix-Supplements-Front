import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/cart';
import wishlistSlice, { getWishlist } from './slices/wishlist';
import tokenSlice from './slices/token';

const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice,
        token: tokenSlice
    },
})

// store.dispatch(getWishlist());

export default store;