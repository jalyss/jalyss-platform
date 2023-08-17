import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchGains = createAsyncThunk("gains/gains", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/gains`);
  console.log("gainStore",response.data);
  return response.data;
});
export const CreateGain = createAsyncThunk(
  "gains/Creategain",
  async (body, { dispatch }) => {
    const response = await axios.post(`${config.API_ENDPOINT}/gains`, body);
    dispatch(fetchGains());

    return response.data;
  }
);
export const deleteGain = createAsyncThunk(
  "gains/deletegain",
  async (id, { dispatch }) => {
    const response = await axios.delete(`${config.API_ENDPOINT}/gains/${id}`);
    dispatch(fetchGains());
    return response.data;
  }
);


export const editGain = createAsyncThunk(
  "gains/editgain",
  async (args, { dispatch }) => {
    const { id, ...body } = args;
    console.log("argsss", args);
    let token = JSON.parse(localStorage.getItem("token"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await axios.patch(
      `${config.API_ENDPOINT}/gains/${id}`,
      body,
      configs
    );

    dispatch(fetchGains());

    return response.data;
  }
);

export const fetchPrerequires = createAsyncThunk(
  "prerequire/prerequire",
  async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/prerequire`);

    return response.data;
  }
);
export const CreatePrereq = createAsyncThunk(
  "prereq/Create-prereq",
  
  async (body, { dispatch }) => {
    const response = await axios.post(`${config.API_ENDPOINT}/prerequire`, body);
    dispatch(fetchPrerequires());

    return response.data;
  }
);
export const deletePrerequire = createAsyncThunk(
  "prerequire/delete-prerequire",
  async (id, { dispatch }) => {
    const response = await axios.delete(
      `${config.API_ENDPOINT}/prerequire/${id}`
    );
    dispatch(fetchPrerequires());
    return response.data;
  }
);

export const editPrerequire = createAsyncThunk(
  "prerequire/edit-prerequire",
  async (args, { dispatch }) => {
    const { id, ...body } = args;
    console.log("argsss", args);
    let token = JSON.parse(localStorage.getItem("token"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await axios.patch(
      `${config.API_ENDPOINT}/prerequire/${id}`,
      body,
      configs
    );

    dispatch(fetchPrerequires());
    return response.data;
  }
);

const gainSlice = createSlice({
  name: "gains",
  initialState: {
    gain: null,
    Prerequire: null,
    gains: { 
      items: [],
      count: 0,
    },
    prerequires: {
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
    builder.addCase(fetchGains.fulfilled, (state, action) => {
      state.gains.items = action.payload; 
    });

    builder.addCase(fetchPrerequires.fulfilled, (state, action) => {
      state.prerequires.items = action.payload;
    });
  },
});

export default gainSlice.reducer;
