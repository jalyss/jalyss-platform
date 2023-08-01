import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";

export const fetchMessages = createAsyncThunk(
  "messages/chatromm",
  async (args) => {
    const { chatRoomId, number } = args;
    const response = await axios.get(
      `${config.API_ENDPOINT}/messages/${chatRoomId}`,
      {
        params: {
          numberMessages: number,
        },
      }
    );
    console.log("messages,response.data");
    return response.data;
  }
);

export const fetchChatRoom = createAsyncThunk(
  "chatRoom/user",
  async (userId) => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/chatRoom/${userId}`
    );
    console.log("chatRooms", response.data, userId);
    return response.data;
  }
);

export const createChatRoomGroup = createAsyncThunk(
  "chatRoom/update",
  async (args, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem('tokenAdmin'))
    const configs = {
      headers: {
        Authorization: 'Bearer ' + token.Authorization
      }
    }
    const response = await axios.post(
      `${config.API_ENDPOINT}/chatRoom/group`,
      args,configs
    );
    dispatch(findAllRooms())
    return response.data;
  }
);
export const updateChatRoom = createAsyncThunk(
  "chatRoom/update",
  async (args, { dispatch }) => {
    const { id,...rest } = args;
    let token = JSON.parse(localStorage.getItem('tokenAdmin'))
    const configs = {
      headers: {
        Authorization: 'Bearer ' + token.Authorization
      }
    }
    const response = await axios.patch(
      `${config.API_ENDPOINT}/chatRoom/${id}`,
      rest,configs
    );
    dispatch(findAllRooms())
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "user-chatroom",
  async (args, { dispatch }) => {
    const { userId, chatRoomId } = args;
    console.log({ userId, chatRoomId }, "res");
    const response = await axios.delete(
      `${config.API_ENDPOINT}/user-chatroom`,
      {
        userId,
        chatRoomId,
      }
    );
    dispatch(findAllRooms(c));
    return response.data;
  }
);

export const fetchOneRoom = createAsyncThunk("one/chatromm", async (id) => {
  const response = await axios.get(`${config.API_ENDPOINT}/chatRoom/one/${id}`);
  console.log("oooooooooooneRoom", response.data);

  return response.data;
});

export const deleteChatRoom = createAsyncThunk("one/chatromm", async (id) => {
  const response = await axios.delete(`${config.API_ENDPOINT}/chatroom/${id}`);
  return response.data;
});

export const findAllRooms = createAsyncThunk(
  "chatRoom/all/all-chatsRooms",
  async () => {
    const response = await axios.get(
      `${config.API_ENDPOINT}/chatRoom/all/all-chatsRooms`
    );
    console.log("Room", response.data);

    return response.data;
  }
);

export const addUser = createAsyncThunk(
  "user-chatroom",
  async (args, { dispatch }) => {
    const { userId, chatRoomId } = args;
    const response = await axios.post(`${config.API_ENDPOINT}/user-chatroom`, {
      userId,
      chatRoomId,
    });
    console.log("userAdded", response.data);
    dispatch(fetchOneRoom(chatRoomId));
    return response.data;
  }
);

export const notSeenMessages = createAsyncThunk("notSeen", async (id) => {
  const response = await axios.get(
    `${config.API_ENDPOINT}/messages/notSeen/${id}`
  );
  console.log("NotSeen", response.data);
  return response.data.length;
});

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: null,

    chatRooms: {
      items: [],
      count: 0,
    },

    allChatRooms: {
      items: [],
      count: 0,
    },
    messagess: {
      items: [],
      count: 0,
    },
    notSeen: 0,
    error: null,
    deleteError: null,
    saveError: null,
    createChatroomError: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchChatRoom.fulfilled, (state, action) => {
      state.chatRooms.items = action.payload;
    });
    builder.addCase(fetchOneRoom.fulfilled, (state, action) => {
      state.chat = action.payload;
    });
    builder.addCase(findAllRooms.fulfilled, (state, action) => {
      state.allChatRooms.items = action.payload;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messagess.items = action.payload;
    });
    builder.addCase(notSeenMessages.fulfilled, (state, action) => {
      state.notSeen = action.payload;
    });
  },
});
export default chatSlice.reducer;