import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";


export const fetchCommands = createAsyncThunk("commands/commands", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/commands/TUN`);
  return response.data;
});

export const  nonDeliveredCommands = createAsyncThunk("commands/commands", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/commands/nonDeliveredCommands`);
  const commands = response.data;
  const  nonDeliveredCommands = commands.filter(command => !command.hasDelivery);
  return  nonDeliveredCommands;
});

export const fetchCommand = createAsyncThunk("commands/command", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/commands/one/${id}`);
  return response.data;
});

export const createCommand = createAsyncThunk("commands/createCommand", async (body, { dispatch }) => {
const x= body.branshId
delete body.branshId
  const response = await axios.post(`${config.API_ENDPOINT}/commands/${x}/`, body);
  dispatch(fetchCommand(response.data.id)) // for dispath the result on state.command to see its data in the next page after checkout
  return response.data;
});

export const updateCommand = createAsyncThunk("commands/createCommand", async (body, { dispatch }) => {
  const response = await axios.post(`${config.API_ENDPOINT}/commands/one`, body);
  dispatch(fetchCommand(response.data.id)) // for dispath the result on state.command to see its data in the next page after checkout
  return response.data;
});

export const fetchCommandLine = createAsyncThunk("commands/commandLine", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/commands/commandLine/all`)
  return response.data;
})

export const commandSlice = createSlice({
  name: "command",
  initialState: {
    command: null,
    commands: {
      items: [],
      count: 0,
    },
    commandLines: {
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
    builder.addCase(fetchCommandLine.fulfilled, (state, action) => {
      state.commandLines.items = action.payload;
    });
  },
});
export default commandSlice.reducer;
