import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import config from "../configs";
import axios from "axios";



export const fetchProviders = createAsyncThunk("providers/providers", async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/providers/`);
    return response.data;
  });

  export const fetchProvider = createAsyncThunk("providers/provider", async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/providers/${id}`);
    return response.data;
  });

  export const createProvider = createAsyncThunk("providers/createProvider", async (body, { dispatch }) => {
      const response = await axios.post(`${config.API_ENDPOINT}/providers`, body);
      dispatch(fetchProvider(response.data));
      return response.data;
    }
  );
  
  export const editProvider = createAsyncThunk("providers/editprovider",
  async (args) => {
    const { id, body } = args;
    const response = await axios.patch(
      `${config.API_ENDPOINT}/providers/${id}`,
      body
    );
    return response.data;
  }
);

  export const removeProvider= createAsyncThunk("providers/deleteprovider",async (id) => {
  
      const response = await axios.delete(
        `${config.API_ENDPOINT}/providers/${id}`
      );
      return response.data;
    }
  );


  

  // Create a slice for managing providers
export const providerSlice = createSlice({
    name: "provider",
    initialState: {
      provider: null,
      providers: {
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
      builder.addCase(fetchProviders.fulfilled, (state, action) => {
        state.providers.items = action.payload;
      });
      builder.addCase(fetchProvider.fulfilled, (state, action) => {
        state.provider = action.payload;
      });
    },
  });
  
  export default providerSlice.reducer;
  