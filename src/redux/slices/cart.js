import { createSlice } from "@reduxjs/toolkit";

const init = {
    count: 0,
    cartItems: []
}
const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: init,
    reducers: {
        addToCart: (state, action) => {
            state.count = state.count + action.payload.count;
            state.cartItems.push({item: action.payload.item, count: action.payload.count});
        },
        removeFromCart: (state, action) => {
            state.count = state.count - action.payload.count;
            const index = state.cartItems.findIndex(item => item.item._id === action.payload.item._id);
            if(index !== -1){
                state.cartItems.splice(index, 1);
            }
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;
