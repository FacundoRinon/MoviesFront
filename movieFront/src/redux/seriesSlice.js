import { createSlice } from "@reduxjs/toolkit";

const seriesSlice = createSlice({
  name: "series",
  initialState: [],
  reducers: {
    setSeries(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = seriesSlice;
export const { setSeries } = actions;
export default reducer;
