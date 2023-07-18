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

export const updatechatroomname = createAsyncThunk("chatRoom/user",  async (args, { dispatch }) =>{
    const { ...rest } = args
    const response = await axios.patch(`${config.API_ENDPOINT}/chatRoom/${rest.id}`,rest)
    console.log("chatRooms",response.data,userId)
    return response.data

})

export const createChatRoom = createAsyncThunk("chatRoom", async (args, { dispatch })  => {
    // try{
    //     let token = await localStorage.getItem('tokenAdmin')
    //     const configs = {
    //         headers: {
    //             Authorization: 'Bearer ' + token.Authorization
    //         }
    //     }
    //     console.log(token,"as")
        const { text,receiverId,name,} = args
        console.log({text,receiverId,name},"res")
        receiverId.slice(1)
        const response = await axios.post(`${config.API_ENDPOINT}/chatRoom/backoffice/e5a50c5d-c173-4fc5-a93a-5b8ad2deccfa`,{
            text,
            receiverId,
            name
        })
        console.log("userOut",response.data)
        return response.data
    // }catch(err){
    //     console.log(err)
    // }
    })
    
export const deleteUser = createAsyncThunk("user-chatroom", async (args, { dispatch })  => {
    const { userId,chatRoomId } = args
    console.log({userId,chatRoomId},"res")
    const response = await axios.delete(`${config.API_ENDPOINT}/user-chatroom`,{
        userId,chatRoomId
    })
    console.log("userOut",response.data)
    dispatch(fetchOneRoom(chatRoomId))
    return response.data
})


export const fetchOneRoom = createAsyncThunk("one/chatromm", async (id) => {
    const response = await axios.get(`${config.API_ENDPOINT}/chatRoom/one/${id}`)
    console.log("oooooooooooneRoom",response.data)
    return response.data
})

export const deleteChatRoom = createAsyncThunk(
    "one/chatromm",
    async (id) => {
      const response = await axios.delete(
        `${config.API_ENDPOINT}/chatroom/${id}`
      );
      return response.data;
    }
  );


export const findAllRooms = createAsyncThunk("chatRoom/all/all-chatsRooms", async () => {
  const response = await axios.get(`${config.API_ENDPOINT}/chatRoom/all/all-chatsRooms`)   
   console.log("Room",response.data)

    return response.data
})

export const addUser = createAsyncThunk("user-chatroom", async (args , {dispatch}) => {
   const {userId,chatRoomId}=args
    const response = await axios.post(`${config.API_ENDPOINT}/user-chatroom`,{userId,chatRoomId})   
     console.log("userAdded",response.data)
  dispatch(fetchOneRoom(chatRoomId))
      return response.data
  })
  


export const notSeenMessages = createAsyncThunk("notSeen",async(id)=> {
    const response = await axios.get(`${config.API_ENDPOINT}/messages/notSeen/${id}`)
    console.log("NotSeen",response.data)
    return response.data.length
})


export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chat: null,
        
        chatRooms: {
            items: [],
            count: 0,
        },
          
        AllchatRooms: {
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
            state.chatRooms.items = action.payload
        });
        builder.addCase(fetchOneRoom.fulfilled, (state, action) => {
            state.chat = action.payload
        });
        builder.addCase(findAllRooms.fulfilled, (state, action) => {
            state.AllchatRooms.items = action.payload
        });
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.messagess.items = action.payload
        });
        builder.addCase(notSeenMessages.fulfilled, (state, action) => {
            state.notSeen = action.payload
        });
    }
})
export default chatSlice.reducer