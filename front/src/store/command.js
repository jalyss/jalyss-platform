import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchCommands = createAsyncThunk("commands/commands", async () => {
  let token = JSON.parse(localStorage.getItem("token")).Authorization;
  let configs = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.get(`${config.API_ENDPOINT}/commands/by-user`, {
    ...configs,
  });
  return response.data;
});

export const fetchCommand = createAsyncThunk("commands/command", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/commands/one/${id}`);
  return response.data;
<<<<<<< HEAD
  });

export const createCommand= createAsyncThunk("commands/createCommand", async (body,{dispatch}) => {
  const response = await axios.post(`${config.API_ENDPOINT}/commands/TUN/`,body);
 dispatch(fetchCommand(response.data.id)) // for dispath the result on state.command to see its data in the next page after checkout
  return response.data;
  });
=======
});
>>>>>>> 85605acd57b9d48711948ee24f0d5706c11e49a3

export const createCommand = createAsyncThunk(
  "commands/createCommand",
  async (body, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("token")).Authorization;
    let configs = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.post(
      `${config.API_ENDPOINT}/commands/TUN/`,
      body,configs
    );
    dispatch(fetchCommand(response.data.id));
    return response.data;
  }
);

export const commandSlice = createSlice({
  name: "command",
  initialState: {
    command: null,
    commands: {
      items: [],
      count: 0,
    },
    error: null,
    deleteError: null,
    saveError: null,
    createCommandError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCommands.fulfilled, (state, action) => {
      state.commands.items = action.payload;
    });
    builder.addCase(fetchCommand.fulfilled, (state, action) => {
      state.command = action.payload;
    });
  },
});
export default commandSlice.reducer;
