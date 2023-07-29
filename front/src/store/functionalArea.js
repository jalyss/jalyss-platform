import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const fetchFunctionalAreas = createAsyncThunk("functionalAreas/functionalAreas", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/functional-areas`);
  return response.data;
});



export const functionalAreaSlice = createSlice({
  name: "functionalArea",
  initialState: {
    functionalArea: null,
    functionalAreas: {
      items: [],
      count: 0,
    },
    error: null,
    deleteError: null,
    saveError: null,
    createUserError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFunctionalAreas.fulfilled, (state, action) => {
      state.functionalAreas.items = action.payload;
    });
   
  },
});
export default functionalAreaSlice.reducer;
