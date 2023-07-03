import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../APIs/config";

const getCart = createAsyncThunk("cartSlice/getCart",async (_, { getState }) => {
    try {
        let cart;
        const token = getState().token;
        if(token) {
            const res = await axiosInstance.get('/cart')
            let totalPrice = 0;
            let count = 0;
            res.data.cart.forEach(item => {
                totalPrice +=  Number(item.product.price) * Number(item.quantity);
                count += Number(item.quantity);
            });
            if(res.data.cart.length !== 0) {
                cart = { count, totalPrice, cartItems: res.data.cart }
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                const localCart = localStorage.getItem('cart');
                cart = localCart ? JSON.parse(localCart) : {count: 0, totalPrice:0, cartItems: []};
                cart.cartItems.forEach(item => {
                    axiosInstance.post(`cart/${item.product._id}`, {quantity: item.quantity})
                })
            }
        }
        else {
            const localCart = localStorage.getItem('cart');
            cart = localCart ? JSON.parse(localCart) : {count: 0, totalPrice:0, cartItems: []};
        }
        return cart
    } catch (error) { console.log(error) }
})

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {count: 0, totalPrice:0, cartItems: []},
    reducers: {
        addToCart: (state, action) => {
            if(localStorage.getItem('token')){
                axiosInstance.post(`/cart/${action.payload.item._id}`)
                .then(res => console.log('cart updated successfully'))
                .catch(err => console.log(err))
            }
            state.count += action.payload.count;
            state.totalPrice += action.payload.item.price * action.payload.count;
            state.cartItems.push({product: action.payload.item, quantity: action.payload.count});
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            if(localStorage.getItem('token')){
                axiosInstance.delete(`/cart/${action.payload.item._id}`)
                .then(res => console.log('cart updated successfully'))
                .catch(err => console.log(err))
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
            const index = state.cartItems.findIndex(item => item.product._id === action.payload.item._id);
            if(state.cartItems[index].product.quantity > state.cartItems[index].quantity){
                if(localStorage.getItem('token')){
                    axiosInstance.post(`/cart/${action.payload.item._id}`)
                    .then(res => console.log('cart updated successfully'))
                    .catch(err => console.log(err))
                }
                state.count += 1;
                if(index !== -1){
                    state.cartItems[index].quantity += 1;
                }
                state.totalPrice += action.payload.item.price;
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        decreaseCountByOne: (state, action) => {
            if(localStorage.getItem('token')){
                axiosInstance.patch(`/cart/${action.payload.item._id}/decrease`)
                .then(res => console.log('cart updated successfully'))
                .catch(err => console.log(err))
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
        },
        resetCart: (state, action) => {
            state.count = 0;
            state.totalPrice = 0;
            state.cartItems = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCart.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const {addToCart, removeFromCart, increaseCountByOne, decreaseCountByOne, resetCart} = cartSlice.actions;
export {getCart};
export default cartSlice.reducer;
