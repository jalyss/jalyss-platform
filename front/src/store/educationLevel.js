import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const fetchEducationLevels = createAsyncThunk("educationLevels/educationLevels", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/education-Levels`);
  return response.data;
});



export const educationLevelsSlice = createSlice({
  name: "educationLevels",
  initialState: {
    educationLevel: null,
    educationLevels: {
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
    builder.addCase(fetchEducationLevels.fulfilled, (state, action) => {
      state.educationLevels.items = action.payload;
    });
   
  },
});
export default educationLevelsSlice.reducer;