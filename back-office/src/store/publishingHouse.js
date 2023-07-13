import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchPublishingHouses = createAsyncThunk(
  "publishingHouses/publishingHouses",
  async () => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/publishing-houses/`
    );
    return response.data;
  }
);


export const createPublishingHouse = createAsyncThunk(
  "publishingHouses/publishingHouse",
  async (dto) => {
    try {
      const response = await axios.post(`${config.API_ENDPOINT}/publishing-houses/`,
        dto
      );
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error creating PublishingHouse:', error);
      throw error;
    }
  }
);

export const fetchPublishingHouse = createAsyncThunk(
  "publishingHouses/publishingHouse",
  async (id) => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/publishing-houses/${id}`
    );
    return response.data;
  }
);

export const deletePublishingHouse = createAsyncThunk(
  "publishingHouses/publishingHouse",
  async (id) => {
    const response = await axios.delete(
      `${config.API_ENDPOINT}/publishing-houses/${id}`
    );
    return response.data;
  }
);


export const updatePublishingHouse = createAsyncThunk(
  "publishingHouses/publishingHouse",
  async (args, { dispatch }) => {
    const { ...rest } = args;
    const response = await axios.patch(
      `${config.API_ENDPOINT}/publishing-houses/${rest.id}`,
      rest
    );
    dispatch(fetchPublishingHouses());
    return response.data;
  }
);

export const publishingHouseSlice = createSlice({
  name: "publishingHouse",
  initialState: {
    publishingHouse: null,
    publishingHouses: {
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
    builder.addCase(fetchPublishingHouses.fulfilled, (state, action) => {
      state.publishingHouses.items = action.payload;
    });
    builder.addCase(fetchPublishingHouse.fulfilled, (state, action) => {
      state.publishingHouse = action.payload;
    });
  },
});
export default publishingHouseSlice.reducer;
