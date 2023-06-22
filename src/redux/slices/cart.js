import { createSlice } from "@reduxjs/toolkit";

const init = {
    count: 0,
    totalPrice: 0,
    cartItems: []
}
const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: init,
    reducers: {
        addToCart: (state, action) => {
            state.count += action.payload.count;
            state.totalPrice += action.payload.item.price * action.payload.count;
            state.cartItems.push({item: action.payload.item, count: action.payload.count});
        },
        removeFromCart: (state, action) => {
            const index = state.cartItems.findIndex(item => item.item._id === action.payload.item._id);
            state.count -= state.cartItems[index].count;
            state.totalPrice -= action.payload.item.price * state.cartItems[index].count;
            if(index !== -1){
                state.cartItems.splice(index, 1);
            }
        },
        increaseCountByOne: (state, action) => {
            state.count += 1;
            const index = state.cartItems.findIndex(item => item.item._id === action.payload.item._id);
            if(index !== -1){
                state.cartItems[index].count += 1;
            }
            state.totalPrice += action.payload.item.price;
        },
        decreaseCountByOne: (state, action) => {
            state.count -= 1;
            const index = state.cartItems.findIndex(item => item.item._id === action.payload.item._id);
            if(state.cartItems[index].count === 1){
                if(index !== -1){
                    state.cartItems.splice(index, 1);
                }
            } else {
                if(index !== -1){
                    state.cartItems[index].count -= 1;
                }
            }
            state.totalPrice -= action.payload.item.price;
        }
    }
})

export const {addToCart, removeFromCart, increaseCountByOne, decreaseCountByOne} = cartSlice.actions;

export default cartSlice.reducer;
