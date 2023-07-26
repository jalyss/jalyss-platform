import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";
import { fetchcours } from "./courses";

export const fetchsessions = createAsyncThunk(
  "session/fetchsessions",
  async ({ take, skip }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${config.API_ENDPOINT}/session/${take}/${skip}`
      );

      console.log("resp", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchsessionsRequest = createAsyncThunk(
  "session/fetchsessionsRequest",
  async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/SessionRequest`);

    return response.data;
  }
);
export const fetchOnesessionReq = createAsyncThunk(
  "session/sessionReq",
  async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/SessionRequest/${id}`);
    return response.data;
  }
);
export const editReq = createAsyncThunk(
  "sessions/editReq",
  async (args) => {
    const { id, status } = args;
    let token = JSON.parse(localStorage.getItem("token"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.patch(
      `${config.API_ENDPOINT}/SessionRequest/${id}`,
      status,
      configs
    );
   
    return response.data;
  }
);

export const deletsessionsReq = createAsyncThunk(
  "session/deletsessionsReq",
  async (id, { dispatch }) => {
   
    let token = JSON.parse(localStorage.getItem("tokensession"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.delete(
      `${config.API_ENDPOINT}/SessionRequest/${id}`,
      configs
    );
    dispatch(fetchsessionsRequest());

    return response.data;
  }
);

export const fetchOnesession = createAsyncThunk(
  "session/session",
  async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/session/${id}`);
    return response.data;
  }
);

export const findAllSessionTitles = createAsyncThunk(
  "session/session",
  async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/session`);
    return response.data;
  }
);

export const deletsessions = createAsyncThunk(
  "session/deletsessions",
  async (args, { dispatch }) => {
    const { id, ...queries } = args;
    let token = JSON.parse(localStorage.getItem("tokensession"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.delete(
      `${config.API_ENDPOINT}/session/${id}`,
      configs
    );
    dispatch(fetchsessions(queries));

    return response.data;
  }
);

export const editsession = createAsyncThunk(
  "sessions/Updtsessions",
  async (args, { dispatch }) => {
    const { id, body } = args;
    let token = JSON.parse(localStorage.getItem("token"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.patch(
      `${config.API_ENDPOINT}/Session/${id}`,
      body,
      configs
    );
    // dispatch(fetchsessions(id))
    return response.data;
  }
);

export const CreateNeswSession = createAsyncThunk(
  "session/addsession",
  async (body, { dispatch }) => {
    const response = await axios.post(`${config.API_ENDPOINT}/session`, body);
    dispatch(fetchsessions());
    return response.data;
  }
);
export const FetchSessionsHasLectures = createAsyncThunk(
  "sessionHasLect/fetchSessionHasLect",
  async () => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/SessionHasLecture`
    );

    return response.data;
  }
);

export const CreateSessionHasLecture = createAsyncThunk(
  "sessionHasLect/addSessionHasLect",
  async (body, { dispatch }) => {
    const response = await axios.post(
      `${config.API_ENDPOINT}/SessionHasLecture`,
      body
    );
    dispatch(fetchcours());
    return response.data;
  }
);

export const sessionSlice = createSlice({
  name: "sessions",
  initialState: {
    session: null,
    request:null,
    sessions: {
      items: [],
      count: 0,
    },
    sessionHasLect: {
      items: [],
    },
    sessionRequest: {
      items: [],
    },
    error: null,
    deleteError: null,
    saveError: null,
    createUserError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchsessions.fulfilled, (state, action) => {
      state.sessions.items = action.payload.items;
      state.sessions.count = action.payload.count;
    });
    builder.addCase(fetchOnesession.fulfilled, (state, action) => {
      state.session = action.payload;
    });
    builder.addCase(fetchOnesessionReq.fulfilled, (state, action) => {
      state.request = action.payload;
    });
    builder.addCase(FetchSessionsHasLectures.fulfilled, (state, action) => {
      state.sessionHasLect = action.payload;
    });
    builder.addCase(fetchsessionsRequest.fulfilled, (state, action) => {
      state.sessionRequest = action.payload;
    });
  },
});
export default sessionSlice.reducer;
