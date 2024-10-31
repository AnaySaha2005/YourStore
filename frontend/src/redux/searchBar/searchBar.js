import { createSlice } from "@reduxjs/toolkit";

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState: "",
  reducers: {

    update: (state, action) => {
      state=action.payload;
      return state;
    },
   
  },
});

// Action creators are generated for each case reducer function
export const { update } = searchBarSlice.actions;

export default searchBarSlice.reducer;
