import { Stack, Box, Avatar, Typography, IconButton, Divider, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledBadge from "../../components/StyledBadge";
import Icon from "../../assets/styles/profile.png"
import { CaretDown, LinkSimple, MagnifyingGlass, PaperPlaneTilt, Phone, Smiley, VideoCamera } from "phosphor-react";
import StyledInput from "../../components/StyledInput";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { io } from 'socket.io-client';
import axios from "axios";
import { useSelector } from "react-redux";
import "../../assets/styles/conversation.css"
import { loadLanguages } from "i18next";

const Conversation = ({ setChatRoomList }) => {
  const authStore = useSelector(state => state.auth)
  const socket = io('http://localhost:3001');
 
  const [openPicker, setPicker] = useState(false)
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [number, setNumber] = useState(20)
  const [messages,setMessages] = useState("")
  const [inbox,setInbox]=useState([])

  

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/messages/5f621766-a53c-4496-86d8-9befd06018ae', {
      params: {
        numberMessages: number
      }
    }).then(response=>{
      setInbox(response.data)
    }).catch(err=>console.log(err))
  }, [])
  useEffect(() => {
    function chatRoomList(value) {
      console.log(value);
      setChatRoomList(value)
    
    }
    socket.on('chat-room/f62d33bd-9633-453f-9428-6c10368ac296', chatRoomList);
    

    return () => {
      socket.off('chat-room/f62d33bd-9633-453f-9428-6c10368ac296', chatRoomList);
    }
  }, [socket])
  useEffect(() => {
    function getMsg(value) {
      console.log(value);
      setInbox((Inbox)=>([...Inbox,value]))
    
    }
    socket.on('msgToClient/5f621766-a53c-4496-86d8-9befd06018ae', getMsg);
    

    return () => {
      socket.off('msgToClient/5f621766-a53c-4496-86d8-9befd06018ae', getMsg);
    }
  }, [socket])
const handleSubmit=(e) => {
  if(messages.trim() !== "") {
  e.preventDefault()
  let payload = {
    receiverId: '0258036f-268e-43c4-ba33-1f42de18187f',
    senderId: authStore.me.id,
    text: messages
  }
  socket.emit('create-chat-room', payload)

/* let payload = {
 chatRoomId: '5f621766-a53c-4496-86d8-9befd06018ae',
userId: authStore.me.id,
text: messages
 }
socket.emit('msgToServer', payload) */
  setMessages("")}
  else { return }

}
  return (
    <Stack height="100%" maxHeight="100vh" width="auto">
      <Box
        p={2}
        sx={{
          height: "15vh",
          width: "150vh",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px",
        }}
      >
        <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ width: "100%", height: "100%" }}>
          <Stack direction="row" spacing={2}>
            <Box>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar alt="profile picture" src={Icon} />
              </StyledBadge>

            </Box>
            <Stack spacing={0.2}>
              <Typography variant="subtitle2">MESTIRI</Typography>
              <Typography variant="caption">Online</Typography>

            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <IconButton>
              <VideoCamera />
            </IconButton>
            <IconButton>
              <Phone />
            </IconButton>
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton>
              <CaretDown />
            </IconButton>
          </Stack>
        </Stack>

      </Box>

      <Box
        sx={{
          height: "70vh",
          width: "150vh",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 2px",
          overflow: "auto",
        }}
      >
{inbox.map((e,i)=> (
  <div className="containerr" key={i}>
    <div className={`d-flex ${e.userId !== authStore.me.id? "justify-content-start":"justify-content-end"}`}>
{/* <img src = {e.user.avatarId}  style={{ width: '40px', height: '40px', borderRadius: '50%' }}/> */}
  <p
  key={i}
  className={e.userId === authStore.me.id ? "sent-message" : "received-message"}
>
  {e.text}
</p></div></div>
  )
)}
      </Box>
      <Box
        p={4}
        sx={{

          width: "150vh",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 2px",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={3} component='form' onSubmit={handleSubmit}>
          <Stack sx={{ width: "100%" }} >
            <StyledInput fullWidth placeholder="write a message . . ." variant="filled" InputProps={{
              disableUnderline: true,
              startAdornment: <InputAdornment>
                <IconButton>
                  <LinkSimple />
                </IconButton>
              </InputAdornment>,
              endAdornment: <InputAdornment>
                <IconButton onClick={() => {
                  setPicker((prev) => !prev)
                }}>
                  <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "absolute", bottom: 50, right: 10 }}>
                    <Picker data={data} onEmojiSelect={console.log} />
                  </Box>
                  <Smiley />
                </IconButton>
              </InputAdornment>

            }} setPicker={setPicker}  onChange={e=>setMessages(e.target.value)}
            value={messages}
            />
          </Stack>
          <Box sx={{ height: 48, width: 48, background: "#57385c", borderRadius: 1.5 }}>
            <Stack sx={{ height: "100%", width: "100%" }} alignItems="center" justifyContent="center">
              <IconButton onSubmit={handleSubmit}>
                <PaperPlaneTilt color="#fff" />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Conversation;
