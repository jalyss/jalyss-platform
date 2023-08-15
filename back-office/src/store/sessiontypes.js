import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";



export const fetchsessionstypes = createAsyncThunk("type/types",async ()=>{
    const response =await axios.get(`${config.API_ENDPOINT}/sessionType`)
  
    return response.data;

})
export const CreateSessionType = createAsyncThunk(
  "type/CreateType",
  async (body, { dispatch }) => {
    const response = await axios.post(`${config.API_ENDPOINT}/sessionType`, body);
    dispatch(fetchsessionstypes());

    return response.data;
  }
);
export const deleteSessionType = createAsyncThunk(
  "types/deletetype",
  async (id, { dispatch }) => {
    const response = await axios.delete(`${config.API_ENDPOINT}/sessionType/${id}`);
    dispatch(fetchsessionstypes());
    return response.data;
  }
);


export const editSessionType = createAsyncThunk(
  "types/editType",
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
      `${config.API_ENDPOINT}/sessionType/${id}`,
      body,
      configs
    );

    dispatch(fetchsessionstypes());

    return response.data;
  }
);



export const typeSlice = createSlice({
    name: "sessiontype",
    initialState: {
        type: null,
        types: {
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
      builder.addCase(fetchsessionstypes.fulfilled, (state, action) => {
        state.types.items = action.payload;
      });
     
    },
  });
  export default typeSlice.reducer;