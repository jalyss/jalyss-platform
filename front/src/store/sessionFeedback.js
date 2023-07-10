import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";




export const fetchFeedBacksBySessionId= createAsyncThunk("sessionsFeedback/feedback", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/session-feedBacks/${id}`);
  return response.data;
});

export const createFeedBack = createAsyncThunk(
    "sessions/sessionsFeedback",
    async ({content,sessionId},{dispatch}) => {
      const token = JSON.parse(localStorage.getItem("token")).Authorization;
  
      const configs = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
  
      const response = await axios.post(
        `${config.API_ENDPOINT}/session-feedBacks`,
        { content, sessionId },
        configs
      );
      console.log("feedbStore",response.data);
      dispatch(fetchFeedBacksBySessionId(sessionId))
      return response.data;
    }
  );

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedback: null,
    feedbacks: {
      items: [],
      count: 0,
    },
    error: null,
    deleteError: null,
    saveError: null,
    createCategoryError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFeedBacksBySessionId.fulfilled, (state, action) => {
      state.feedbacks.items = action.payload;
    });
   
   
  },
});
export default feedbackSlice.reducer;
