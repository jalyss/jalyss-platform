import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";



export const fetchsessions = createAsyncThunk("session/sessions",async ()=>{
    const response =await axios.get(`${config.API_ENDPOINT}/session`)
    return response.data;

})
export const fetchOnesession= createAsyncThunk("session/session",async (id)=>{
  const response =await axios.get(`${config.API_ENDPOINT}/session/${id}`)
  return response.data;
})

export const deletsessions = createAsyncThunk("session/deletsessions", async (id, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokensession'));
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  const response = await axios.delete(`${config.API_ENDPOINT}/session/${id}`, configs);
  dispatch(fetchsessions());
 
  return response.data;
});

export const editsession = createAsyncThunk("sessions/Updtsessions", async (args, { dispatch }) => {
  const {id,...body} = args

  let token = JSON.parse(localStorage.getItem('token'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }

  const response = await axios.patch(`${config.API_ENDPOINT}/session/${id}`,body,configs);
  dispatch(fetchtarif(id))
  return response.data;
});


export const sessionSlice = createSlice({
    name: "sessions",
    initialState: {
        session: null,
        sessions: {
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
      builder.addCase(fetchsessions.fulfilled, (state, action) => {
        state.sessions.items = action.payload;
      });
      builder.addCase(fetchOnesession.fulfilled, (state, action) => {
        state.session=action.payload;
      });
    },
  });
  export default sessionSlice.reducer;