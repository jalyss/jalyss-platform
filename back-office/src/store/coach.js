import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";



export const fetchCoachs = createAsyncThunk(" coache /coaches",async ()=>{
    const response =await axios.get(`${config.API_ENDPOINT}/coaching`) 
     return response.data;

})


export const fetchCoach= createAsyncThunk("coache/coaachId",async (id)=>{
  const response =await axios.get(`${config.API_ENDPOINT}/coaching/${id}`)
  return response.data;
})

export const editCoach = createAsyncThunk("coache/Updtcoche", async (args, { dispatch }) => {
  const {id,...body} = args

  let token = JSON.parse(localStorage.getItem('token'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }

  const response = await axios.patch(`${config.API_ENDPOINT}/coaching/${id}`,body,configs);
  dispatch(fetchCoach(id))
  return response.data;
});

export const deleteCoach = createAsyncThunk("coache/deletcoache", async (id, { dispatch }) => {
  let token = JSON.parse(localStorage.getItem('tokensession'));
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  const response = await axios.delete(`${config.API_ENDPOINT}/coaching/${id}`, configs);
  dispatch(fetchCoachs());
 
  return response.data;
});
export const CreateNeswcoach = createAsyncThunk("coach/addcoach", async (body, {dispatch  }) => {
  let token = JSON.parse(localStorage.getItem('token'))
  const configs = {
    headers: {
      Authorization: 'Bearer ' + token  
    } 
  }
  const response = await axios.post(`${config.API_ENDPOINT}/coaching`, body, configs);
  dispatch(fetchCoachs())  
  return response.data;
});

export const coachesSlice = createSlice({
    name: "coach",
    initialState: {
        coach: null,
        coachs: {
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
      builder.addCase(fetchCoachs.fulfilled, (state, action) => {
        state.coachs.items = action.payload;
      });
      builder.addCase(fetchCoach.fulfilled, (state, action) => {
        state.coach=action.payload;
      });
    },
  });
  export default coachesSlice.reducer;