import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../APIs/config";

const getWishlist = createAsyncThunk("wishlistSlice/getWishlist", async (_, { getState }) => {
    try {
        let wishlist;
        const token = getState().token;
        if (token) {
            const res = await axiosInstance.get('/wishlist', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.length) {
                wishlist = { count: res.data.length, wishlistItems: res.data };
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
            }
            else {
                const localWishlist = localStorage.getItem('wishlist');
                wishlist = localWishlist ? JSON.parse(localWishlist) : { count: 0, wishlistItems: [] };
                wishlist.wishlistItems.forEach(async item => {
                    await axiosInstance.patch(`/wishlist/add/${item._id}`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                })
            }
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
                .then(res => console.log('wishlist updated successfully'))
                .catch(err => {console.log(err);
                localStorage.setItem("expiredToken", true);})
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
                .then(res => console.log('cart updated successfully'))
                .catch(err => {console.log(err);
                localStorage.setItem("expiredToken", true);})
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