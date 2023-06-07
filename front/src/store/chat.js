import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../configs";




export const fetchMessages = createAsyncThunk("messages/chatromm", async (args) => {
    const {chatRoomId,number} = args
    const response = await axios.get(`${config.API_ENDPOINT}/messages/${chatRoomId}`, {
        params : {
            numberMessages : number
        }
       
    }) 
    console.log("messages,response.data")
    return response.data
})

export const fetchChatRoom = createAsyncThunk("chatRoom/user", async (userId) => {
    const response = await axios.get(`${config.API_ENDPOINT}/chatRoom/${userId}`)
    console.log("chatRooms",response.data,userId)
    return response.data

})

export const fetchOneRoom = createAsyncThunk("one/chatromm", async (id) => {
    
    const response = await axios.get(`${config.API_ENDPOINT}/chatRoom/one/${id}`)
    console.log("oooooooooooneRoom",response.data)

    return response.data
})


export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chat: null,
        chatRooms: {
            items: [],
            count: 0,
        },
        messagess: {
            items: [],
            count: 0,
        },
        error: null,
        deleteError: null,
        saveError: null,
        createChatroomError: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchChatRoom.fulfilled, (state, action) => {
            state.chatRooms.items = action.payload
        });
        builder.addCase(fetchOneRoom.fulfilled, (state, action) => {
            state.chat = action.payload
        });
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.messages.items = action.payload
        });
    }
})
export default chatSlice.reducer