import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchCountries = createAsyncThunk(
  "countries/countries",
  async (args) => {
    const response = await axios.get(`${config.API_ENDPOINT}/countries`, {
      params: args,
    });
    return response.data;
  }
);
export const fetchCountrie = createAsyncThunk(
  "countries/countrie",
  async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/countrie/${id}`);
    return response.data;
  }
);

export const createCountrie = createAsyncThunk(
  "countries/countrie",
  async (body, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.post(
      `${config.API_ENDPOINT}/countrie`,
      body,
      configs
    );
    dispatch(fetchCountrie());
    return response.data;
  }
);

export const removeCountrie = createAsyncThunk(
  "countries/countrie",
  async (id, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const response = await axios.delete(
      `${config.API_ENDPOINT}/countrie/${id}`,
      configs
    );
    dispatch(fetchCountries());
    return response.data;
  }
);

export const editCountrie = createAsyncThunk(
  "countries/countrie",
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
      `${config.API_ENDPOINT}/countrie/${id}`,
      body,
      configs
    );
    return response.data;
  }
);

export const findAllCitites = createAsyncThunk(
  "cities/cities",
  async (args) => {
    const { countryId, ...rest } = args;
    const response = await axios.get(
      `${config.API_ENDPOINT}/cities/${countryId}`,
      { params: rest }
    );
    return response.data;
  }
);

export const findAllBranches = createAsyncThunk(
  "branches/branches",
  async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/branches/all`);
    return response.data;
  }
);

export const commandSlice = createSlice({
  name: "country",
  initialState: {
    country: null,
    countries: {
      items: [],
      count: 0,
    },
    cities: {
      items: [],
      count: 0,
    },
    branches: {
      items: [],
      count: 0,
    },
    commandLines: {
      items: [],
      count: 0,
    },
    error: null,
    deleteError: null,
    saveError: null,
    createCommandError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries.items = action.payload;
    });
    builder.addCase(findAllCitites.fulfilled, (state, action) => {
      state.cities.items = action.payload;
    });
    builder.addCase(findAllBranches.fulfilled, (state, action) => {
      state.branches.items = action.payload;
    });
  },
});
export default commandSlice.reducer;
