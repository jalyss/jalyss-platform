import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../configs";
import axios from "axios";

export const fetchClients = createAsyncThunk("clients/clients", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/clients`);
 
  return response.data;
});

export const fetchClient = createAsyncThunk(
  "clients/fetchclient",
  async (clientId) => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/clients/${clientId}`
    );
    return response.data;
  }
);

export const createClient = createAsyncThunk(
    "clients/createclient",
    async (body, { dispatch }) => {
      const response = await axios.post(`${config.API_ENDPOINT}/clients`, body);
      dispatch(fetchClient(response.data.id));
      return response.data;
    }
  );
export const editClient = createAsyncThunk(
  "clients/editclient",
  async (args) => {
    const { clientId, ...rest } = args;
    console.log(args, "args");
    console.log(rest, "rest");
    const response = await axios.patch(
      `${config.API_ENDPOINT}/clients/${clientId}`,
      { ...rest }
    );
    console.log(response.data, "response.data");
    return response.data;
  }
);



export const removeClient = createAsyncThunk(
  "clients/removeclient",
  async (id, { dispatch }) => {
    const response = await axios.delete(`${config.API_ENDPOINT}/clients/${id}`);
    dispatch(fetchClients());

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
    deleteError: null,
    saveError: null,
    createUserError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.clients.items = action.payload;
    });
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.client = action.payload;
    });
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchClient.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default clientSlice.reducer;
