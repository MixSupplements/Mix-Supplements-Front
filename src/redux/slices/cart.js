import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../APIs/config";

// const localCart = JSON.parse(localStorage.getItem('cart'));

const getCart = createAsyncThunk("cartSlice/getCart",async (_, { getState }) => {
    try {
        let cart;
        const token = getState().token;
        if(token) {
            const res = await axiosInstance.get('/cart')
            // ! important not done yet
            let totalPrice;
            res.data.map(item => totalPrice += item.product.price * item.quantity);
            let count;
            res.data.map(item => count += item.quantity)
            cart = { count: count, totalPrice:totalPrice, cartItems: res.data }
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
            const localCart = localStorage.getItem('cart');
            cart = localCart ? JSON.parse(localCart) : {count: 0, totalPrice:0, cartItems: []};
        }
        return cart
    } catch (error) { console.log(error) }
})

// const init = localCart ? localCart :{
//     count: 0,
//     totalPrice: 0,
//     cartItems: []
// }
const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {count: 0, totalPrice:0, cartItems: []},
    reducers: {
        addToCart: (state, action) => {
            if(localStorage.getItem('token')){
                axiosInstance.post(`/cart/${action.payload.item._id}`)
            }
            state.count += action.payload.count;
            state.totalPrice += action.payload.item.price * action.payload.count;
            state.cartItems.push({product: action.payload.item, quantity: action.payload.count});
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            if(localStorage.getItem('token')){
                axiosInstance.delete(`/cart/${action.payload.item._id}`)
            }
            const index = state.cartItems.findIndex(item => item.product._id === action.payload.item._id);
            state.count -= state.cartItems[index].quantity;
            state.totalPrice -= action.payload.item.price * state.cartItems[index].quantity;
            if(index !== -1){
                state.cartItems.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        increaseCountByOne: (state, action) => {
            if(localStorage.getItem('token')){
                axiosInstance.post(`/cart/${action.payload.item._id}`)
            }
            state.count += 1;
            const index = state.cartItems.findIndex(item => item.product._id === action.payload.item._id);
            if(index !== -1){
                state.cartItems[index].quantity += 1;
            }
            state.totalPrice += action.payload.item.price;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        decreaseCountByOne: (state, action) => {
            if(localStorage.getItem('token')){
                axiosInstance.patch(`/cart/${action.payload.item._id}/decrease`)
            }
            state.count -= 1;
            const index = state.cartItems.findIndex(item => item.product._id === action.payload.item._id);
            if(state.cartItems[index].quantity === 1){
                if(index !== -1){
                    state.cartItems.splice(index, 1);
                }
            } else {
                if(index !== -1){
                    state.cartItems[index].quantity -= 1;
                }
            }
            state.totalPrice -= action.payload.item.price;
            localStorage.setItem('cart', JSON.stringify(state));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCart.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const {addToCart, removeFromCart, increaseCountByOne, decreaseCountByOne} = cartSlice.actions;
export {getCart};
export default cartSlice.reducer;
