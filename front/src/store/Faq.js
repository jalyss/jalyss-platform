import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchFreqQs = createAsyncThunk("freqQ/freqQs", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/questions/`);
  return response.data;
});

export const fetchFreqQ = createAsyncThunk("freqQ/freqQ", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/questions/${id}`);
  return response.data;
});

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    question: null,
    questions: {
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
    builder.addCase(fetchFreqQs.fulfilled, (state, action) => {
      state.questions.items = action.payload;
    });
    builder.addCase(fetchFreqQ.fulfilled, (state, action) => {
      state.question = action.payload;
    });
  },
});
export default questionSlice.reducer;
