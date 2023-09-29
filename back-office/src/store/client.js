import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchClients = createAsyncThunk("clients/clients", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/clients`);
  return response.data;
});

export const getOneClient = createAsyncThunk("clients/getOne", (data) => {
  // const response = await axios.get(`${config.API_ENDPOINT}/clients/one/${id}`);
  return data;
});

export const createClient = createAsyncThunk(
  "clients/createClients",
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

export const removeClients = createAsyncThunk(
  "clients/deleteClients",
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
export const editClients = createAsyncThunk(
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
    dispatch(fetchClients());
    return response.data;
  }
);

export const clientsGetSlice = createSlice({
  name: "clients/clients",
  initialState: {
    items: [],
    count: 0,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchClients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const createOneSlice = createSlice({
  name: "clients/createClients",
  initialState: {
    items: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(createClient.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const clientUpdateOneSlice = createSlice({
  name: "clients/editclient",
  initialState: {
    items: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(editClients.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(editClients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editClients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const clientDeleteOneSlice = createSlice({
  name: "clients/deleteClients",
  initialState: {
    items: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(removeClients.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(removeClients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeClients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const getOneClientSlice = createSlice({
  name: "clients/getOne",
  initialState: {
    client: {},
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getOneClient.fulfilled, (state, action) => {
      state.loading = false;
      state.client = { ...action.payload };
    });
    builder.addCase(getOneClient.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOneClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default {
  getOneClient: getOneClientSlice.reducer,
  getAllClient: clientsGetSlice.reducer,
  createOne: createOneSlice.reducer,
  deleteClient: clientDeleteOneSlice.reducer,
  updateClient: clientUpdateOneSlice.reducer,
};
