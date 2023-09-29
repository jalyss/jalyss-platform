import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchCities = createAsyncThunk("cities/cities", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/cities`);
  return response.data;
});

export const fetchCitie = createAsyncThunk("cities/citie", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/citie/${id}`);
  return response.data;
});

export const createCitie = createAsyncThunk(
  "cities/citie",
  async (body, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.post(
      `${config.API_ENDPOINT}/citie`,
      body,
      configs
    );
    dispatch(fetchCitie());
    return response.data;
  }
);

export const removeCitie = createAsyncThunk(
  "cities/citie",
  async (id, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const response = await axios.delete(
      `${config.API_ENDPOINT}/citie/${id}`,
      configs
    );
    dispatch(fetchCities());
    return response.data;
  }
);

export const editCitie = createAsyncThunk(
  "cities/citie",
  async (args, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const { id, ...body } = args;
    console.log("args", args);
    const response = await axios.patch(
      `${config.API_ENDPOINT}/citie/${id}`,
      body,
      configs
    );
    return response.data;
  }
);

export const citieSlice = createSlice({
  name: "citie",
  initialState: {
    citie: null,
    cities: {
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
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cities.items = action.payload;
    });
  },
});
export default citieSlice.reducer;
