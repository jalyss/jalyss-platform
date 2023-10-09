import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchClients = createAsyncThunk(
  "clients/clients",
  async (args) => {
   
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const response = await axios.get(`${config.API_ENDPOINT}/clients`, {
      ...configs,
      params:args,
    });
    return response.data;
  }
);

export const fetchClient = createAsyncThunk("clients/client", async (id) => {
  let token = JSON.parse(localStorage.getItem("tokenAdmin"));
  const configs = {
    headers: {
      Authorization: "Bearer " + token.Authorization,
    },
  };
  const response = await axios.get(
    `${config.API_ENDPOINT}/clients/one/${id}`,
    configs
  );
  return response.data;
});

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (body, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const response = await axios.post(
      `${config.API_ENDPOINT}/clients`,
      body,
      configs
    );
    dispatch(fetchClients());
    return response.data;
  }
);

export const removeClient = createAsyncThunk(
  "clients/deleteClient",
  async (id, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const response = await axios.delete(
      `${config.API_ENDPOINT}/clients/${id}`,
      configs
    );
    dispatch(fetchClients());
    return response.data;
  }
);
export const editClient = createAsyncThunk(
  "clients/editclient",
  async (args, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const { id, ...body } = args;
    const response = await axios.patch(
      `${config.API_ENDPOINT}/clients/${id}`,
      body,
      configs
    );
    dispatch(fetchClient(id));
    return response.data;
  }
);

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    client: null,
    clients: {
      items: [],
      count: 0,
    },
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.clients.items = action.payload;
    });
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.client = action.payload;
    });
  },
});

export default clientSlice.reducer;
