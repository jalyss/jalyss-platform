import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const fetchJobTitles = createAsyncThunk("jobTitles/jobTitles", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/job-titles`);
  return response.data;
});



export const jobTitlesSlice = createSlice({
  name: "jobTitles",
  initialState: {
    jobTitle: null,
    jobTitles: {
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
    builder.addCase(fetchJobTitles.fulfilled, (state, action) => {
      state.jobTitles.items = action.payload;
    });
   
  },
});
export default jobTitlesSlice.reducer;