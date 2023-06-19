import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const createTarif = createAsyncThunk(
  "tarifs/createTarif",
  async (body, { dispatch }) => {
    const response = await axios.post(`${config.API_ENDPOINT}/tarifs`, body);
    dispatch(fetchtarifs(response.data));
    return response.data;
  }
);

export const removeTarif = createAsyncThunk(
  "tarifs/deleteTarif",
  async (idi) => {
    // const { id } = args;
    const response = await axios.delete(
      `${config.API_ENDPOINT}/tarifs/${idi}`
    );
    console.log("hmd",response.data);
    return response.data;
  }
);

export const editTarif = createAsyncThunk(
  "tarifs/editTarif",
  async (args) => {
    const { id, body } = args;
    const response = await axios.patch(
      `${config.API_ENDPOINT}/tarifs/${id}`,
      body
    );
    return response.data;
  }
);

export const fetchtarifs = createAsyncThunk(
  "tarifs/fetchtarifs",
  async () => {
    const response = await axios.get(`${config.API_ENDPOINT}/tarifs`);
    return response.data;
  }
);

export const fetchTarifById = createAsyncThunk(
  "tarifs/fetchTarifById",
  async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/tarifs/one/${id}`);
    return response.data;
  }
);

export const tarifslice = createSlice({
  name: "tarif",
  initialState: {
    tarif: null,
    tarifs: {
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
    builder.addCase(fetchtarifs.fulfilled, (state, action) => {
        state.tarifs.items = action.payload.items;
        state.tarifs.count = action.payload.count;

      })
      builder.addCase(fetchTarifById.fulfilled, (state, action) => {
        state.tarif = action.payload;
      })
  },
});

export default tarifslice.reducer;
