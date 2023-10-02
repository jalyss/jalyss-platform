import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchCommands = createAsyncThunk("commands/commands", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/commands`);
  return response.data;
});

export const fetchCommandsByClientId = createAsyncThunk(
  "commands/commandsByClientId",
  async (id) => {
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const response = await axios.get(
      `${config.API_ENDPOINT}/commands/by-client/${id}`,
      configs
    );
    return response.data;
  }
);

export const fetchCommand = createAsyncThunk("commands/command", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/commands/one/${id}`);
  return response.data;
});

export const createCommand = createAsyncThunk(
  "commands/createCommand",
  async (body, { dispatch }) => {
    const x = body.branshId;
    delete body.branshId;
    const response = await axios.post(
      `${config.API_ENDPOINT}/commands/${x}/`,
      body
    );
    dispatch(fetchCommand(response.data.id)); // for dispath the result on state.command to see its data in the next page after checkout
    return response.data;
  }
);

export const updateCommand = createAsyncThunk(
  "commands/createCommand",
  async (args, { dispatch }) => {
    const { id, ...body } = args;

    const response = await axios.patch(
      `${config.API_ENDPOINT}/commands/${id}`,
      body
    );
    dispatch(fetchCommand(response.data.id));
    return response.data;
  }
);

export const updatePaidCommandStatus = createAsyncThunk(
  "commands/updatePaidCommandStatus",
  async (args, { dispatch }) => {
    const { id, ...body } = args;
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const response = await axios.put(
      `${config.API_ENDPOINT}/commands/paid/${id}`,
      body,
      configs
    );
    dispatch(fetchCommand(response.data.id));
    dispatch(fetchCommandsByClientId(response.data.clientId))
    return response.data;
  }
);
export const confirmCommand = createAsyncThunk(
  "commands/confirmCommand",
  async (args, { dispatch }) => {
    const { id, ...body } = args;
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const response = await axios.put(
      `${config.API_ENDPOINT}/commands/confirm/${id}`,
      body,
      configs
    );
    dispatch(fetchCommand(response.data.id));
    dispatch(fetchCommandsByClientId(response.data.clientId))
    return response.data;
  }
);
export const updateDeliveredCommandStatus = createAsyncThunk(
  "commands/updateDeliveredCommandStatus",
  async (args, { dispatch }) => {
    const { id, ...body } = args;
    let token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const configs = {
      headers: {
        Authorization: "Bearer " + token.Authorization,
      },
    };
    const response = await axios.put(
      `${config.API_ENDPOINT}/commands/delivered/${id}`,
      body,
      configs
    );
    dispatch(fetchCommand(response.data.id));
    dispatch(fetchCommandsByClientId(response.data.clientId))
    return response.data;
  }
);

export const deleteCommand = createAsyncThunk(
  "commands/createCommand",
  async (body, { dispatch }) => {
    const response = await axios.delete(
      `${config.API_ENDPOINT}/commands/${body}`,
      body
    );
    dispatch(fetchCommand(response.data.id)); // for dispath the result on state.command to see its data in the next page after checkout
    return response.data;
  }
);

export const fetchCommandLine = createAsyncThunk(
  "commands/commandLine",
  async () => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/commands/commandLine/all`
    );
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
    builder.addCase(fetchCommandsByClientId.fulfilled, (state, action) => {
      state.commands.items = action.payload;
    });
  },
});
export default commandSlice.reducer;
