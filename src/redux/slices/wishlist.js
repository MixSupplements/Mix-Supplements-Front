import { createSlice } from "@reduxjs/toolkit";

const localWishlist = JSON.parse(localStorage.getItem('wishlist'));

const init = localWishlist ? localWishlist :{
    count: 0,
    wishlistItems: []
}
const wishlistSlice = createSlice({
    name: 'wishlistSlice',
    initialState: init,
    reducers:{
        addToWishlist: (state, action) => {
            state.count += 1;
            state.wishlistItems.push(action.payload);
            localStorage.setItem('wishlist', JSON.stringify(state));
        },
        removeFromWishlist: (state, action) => {
            const index = state.wishlistItems.findIndex(item => item._id === action.payload._id);
            state.count -= 1;
            if(index !== -1){
                state.wishlistItems.splice(index, 1);
            }
            localStorage.setItem('wishlist', JSON.stringify(state));
        }
    }
})

export const {addToWishlist, removeFromWishlist} = wishlistSlice.actions;

export default wishlistSlice.reducer;