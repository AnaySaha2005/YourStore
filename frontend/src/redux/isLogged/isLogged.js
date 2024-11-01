import { createSlice } from "@reduxjs/toolkit";

export const isLoggedSlice = createSlice({
  name: "isLogged",
  initialState: {
    value: false,
    loginData: {},
  },
  reducers: {
    login: (state, action) => {
      if (!action.payload) {
        state.value = false;
        state.loginData = {};
      } else {
        state.value = true;
        console.log(action.payload)
        state.loginData = action.payload;
      }
    },
    logout: (state) => {
      console.log(state)
      state.value = false;
      state.loginData = {};
    },
    update: (state, action) => {
      state.loginData.itemList.push(action.payload);
    },
    remove: (state, action) => {
      state.loginData.itemList = state.loginData.itemList.filter((item) => {
       
        return item._id != action.payload._id;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, update, remove } = isLoggedSlice.actions;

export default isLoggedSlice.reducer;
