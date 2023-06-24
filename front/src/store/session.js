import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchSessions = createAsyncThunk(
  "sessions/fetchSessions",
  async ({ categoryId, take, skip }) => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/session/${take}/${skip}`,
      {
        params: {
          categoryId,
        },
      }
    );
   
    return response.data;
  }
);

export const fetchSessionsFeedbacks = createAsyncThunk(
  "sessions/sessionsFeedbacks",
  async () => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/session-feedbacks`
    );
   
    return response.data;
  }
);

export const fetchSession = createAsyncThunk("sessions/session", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/session/${id}`);
  console.log("alooo", response.data);
  return response.data;
});

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    session: null,
    sessions: {
      items: [],
      count: 0,

    },
    feedback : {
      items : [],
      count : 0
    },
    error: null,
    deleteError: null,
    saveError: null,
    createUserError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSessions.fulfilled, (state, action) => {
      state.sessions.items = action.payload.items;
      state.sessions.count = action.payload.count;
    });
    builder.addCase(fetchSession.fulfilled, (state, action) => {
      state.session = action.payload;
    });
    builder.addCase(fetchSessionsFeedbacks.fulfilled, (state, action) => {
      state.feedback.items = action.payload;
    });
  },
});
export default sessionSlice.reducer;
