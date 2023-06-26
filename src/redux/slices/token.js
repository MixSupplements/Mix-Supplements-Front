import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "tokenSlice",
    initialState: "",
    reducers: {
        setToken: (state, action) => {
            return action.payload;
        }
    }
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
