import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLogin: false,
  email: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.data = action.payload;
            state.isLogin = true
        },
        removeUser: (state, action) => {
            state.data = {};
            state.isLogin = false
        },
        addEmailForOTP: (state, action) => {
            state.email = action.payload;
        },
        removeEmailForOTP: (state, action) => {
            state.email = "";
        },
    }
})

export const { addUser, removeUser, addEmailForOTP, removeEmailForOTP } = userSlice.actions
export default userSlice.reducer