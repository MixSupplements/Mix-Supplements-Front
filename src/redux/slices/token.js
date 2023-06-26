import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "tokenSlice",
    initialState: localStorage.getItem("token") || "",
    reducers: {
        setToken: (state, action) => {
            return action.payload;
        }
    }
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
