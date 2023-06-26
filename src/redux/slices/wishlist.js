import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../APIs/config";

const getWishlist = createAsyncThunk("wishlistSlice/getWishlist", async () => {
    try {
        let wishlist;
        if (localStorage.getItem('token')) {
            const res = await axiosInstance.get('/wishlist', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            wishlist = { count: res.data.length, wishlistItems: res.data };
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
        else {
            const localWishlist = localStorage.getItem('wishlist');
            wishlist = localWishlist ? JSON.parse(localWishlist) : { count: 0, wishlistItems: [] };
        }
        return wishlist;
    } catch (error) { console.log(error); }
})

const wishlistSlice = createSlice({
    name: 'wishlistSlice',
    initialState: { count: 0, wishlistItems: [] },
    reducers: {
        addToWishlist: (state, action) => {
            if (localStorage.getItem('token')) {
                axiosInstance.patch(`/wishlist/add/${action.payload._id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            }
            state.count += 1;
            state.wishlistItems.push(action.payload);
            localStorage.setItem('wishlist', JSON.stringify(state));
        },
        removeFromWishlist: (state, action) => {
            if (localStorage.getItem('token')) {
                axiosInstance.patch(`/wishlist/remove/${action.payload._id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            }
            state.count -= 1;
            state.wishlistItems = state.wishlistItems.filter((item) => action.payload._id !== item._id);
            localStorage.setItem('wishlist', JSON.stringify(state));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getWishlist.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export { getWishlist };
export default wishlistSlice.reducer;