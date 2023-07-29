import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchcours = createAsyncThunk("cours/couses", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/lecture`);
  return response.data;
});

export const fetchOnecouse = createAsyncThunk("cours/courseOne", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/lecture/${id}`);
  return response.data;
});

export const deletcours = createAsyncThunk(
  "cours/deletcours",
  async (id, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("token"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.delete(
      `${config.API_ENDPOINT}/Lecture/${id}`,
      configs
    );
    dispatch(fetchcours());
    console.log(response.data);
    return response.data;
  }
);

export const editCours = createAsyncThunk(
  "cours/Updtcours",
  async (args, { dispatch }) => {
    const { id, ...body } = args;

    let token = JSON.parse(localStorage.getItem("token"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await axios.patch(
      `${config.API_ENDPOINT}/lecture/${id}`,
      body,
      configs
    );
    dispatch(fetchOnecouse(id));
    return response.data;
  }
);

export const CreateNeswcours = createAsyncThunk(
  "cours/addcours",
  async (body, { dispatch }) => {
    const response = await axios.post(`${config.API_ENDPOINT}/lecture`, body);
    dispatch(fetchcours());
    return response.data;
  }
);

export const coursSlice = createSlice({
  name: "courses",
  initialState: {
    cours: null,
    courses: {
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
    builder.addCase(fetchcours.fulfilled, (state, action) => {
      state.courses.items = action.payload;
    });
    builder.addCase(fetchOnecouse.fulfilled, (state, action) => {
      state.cours = action.payload;
    });
  },
});
export default coursSlice.reducer;
