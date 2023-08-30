import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const fetchtarifspaces =createAsyncThunk("tarif/tarifs", async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/tarifs`)

    return response.data;
  })

export const fetchtarifspace = createAsyncThunk("tarif/tarifs", async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/tarifs/one/${id}`);

    return response.data;
  });

  export const tarifsSlice = createSlice({
    name: "tarif",
    initialState:{
      tarif: null,
      tarifs: {
        items: [],
        count: 0,
      },
      error: null,
      deleteError: null,
      saveError: null,
      createCategoryError: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchtarifspaces.fulfilled,(state, action)=>{
            state.tarifs.items=action.payload
          });
   
     
    },
  });
  export default tarifsSlice.reducer;
  