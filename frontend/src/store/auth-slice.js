import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = !state.isLogin;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
