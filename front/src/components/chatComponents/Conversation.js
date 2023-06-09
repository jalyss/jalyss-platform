import {
  Stack,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledBadge from "../StyledBadge";
import Icon from "../../assets/styles/profile.png";
import {
  CaretDown,
  LinkSimple,
  MagnifyingGlass,
  PaperPlaneTilt,
  Phone,
  Smiley,
  VideoCamera,
} from "phosphor-react";
import StyledInput from "../StyledInput";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector ,useDispatch} from "react-redux";
import "../../assets/styles/conversation.css";
import { loadLanguages } from "i18next";
import { fetchMessages } from "../../store/chat";

const Conversation = ({ setChatRoomList,room,user }) => {
  const authStore = useSelector((state) => state.auth);
  const chatStore = useSelector((state)=>state.chat)
  const {chat} = chatStore
  const {messagess} = chatStore
  const dispatch = useDispatch();

console.log("uuuuuuuuuuuuuuser",user)
  const socket = io("http://localhost:3001");

  const [openPicker, setPicker] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [number, setNumber] = useState(20);
  const [messages, setMessages] = useState("");
  const [inbox, setInbox] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

// console.log("participant",chat.participants?.filter(e=>e.userId !== authStore.me?.id)[0].user.fullNameEn)
const userName = user?.user.fullNameEn 

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/v1/messages/${chat?.id}`,
        {
          params: {
            numberMessages: number,
          },
        }
      )
      .then((response) => {
        setInbox(response.data);
      })
      .catch((err) => console.log(err));


// dispatch(fetchMessages(chat?.id,20))
// setInbox(messagess.items)
  }, []);



  
  useEffect(() => {
    function chatRoomList(value) {
      console.log(value);
      setChatRoomList(value);
    }
    socket.on("chat-room/db80e846-2f9d-4985-8811-ee2d61ccd16a", chatRoomList);

    return () => {
      socket.off(
        "chat-room/db80e846-2f9d-4985-8811-ee2d61ccd16a",
        chatRoomList
      );
    };
  }, [socket]);



 useEffect(() => {
  function getMsg(value) {
    console.log(value);
    setInbox((Inbox) => [...Inbox, value]);
  }
  socket.on(`msgToClient/${chat?.id}`, getMsg);

  socket.on("typing", (data) => {
    setIsTyping(data.isTyping);
  });

 

  return () => {
    socket.off(`msgToClient/${chat?.id}`, getMsg);
    socket.off("typing");
  
  };
}, [socket]);



  const handleSubmit = (e) => {
    if (messages.trim() !== "") {
      e.preventDefault();
      // let payload = {
      //   receiverId: "user.userId",
      //   senderId: authStore.me.id,
      //   text: messages,
      // };
      // socket.emit("create-chat-room", payload);

       let payload = {
 chatRoomId: 'ece345a0-9dee-4596-b6e7-754a9748dca5',
userId: authStore.me.id,
text: messages
 }
socket.emit('msgToServer', payload) 
      setMessages("");
    } else {
      return;
    }
  };

  const handleTyping = () => {
    let payload = {
      isTyping : true , 
      userId : authStore.me?.id
    }
    socket.emit("typing", payload);
  };
  const handleStopTyping = () => {
    let payload = {
      isTyping : false , 
      userId : authStore.me?.id
    }
    socket.emit("typing", payload); 
  };
  return (
    <Stack height="100%" maxHeight="100vh" width="100%">
      <Box
        p={2}
        sx={{
          height: "15vh",
          width: "100%",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px",
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%", height: "100%" }}
        >
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
              <Typography variant="subtitle2">
                {/* RANIA */}
                {userName}
                </Typography>
              <Typography variant="caption">Online</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            {/* <IconButton>
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
            </IconButton> */}
          </Stack>
        </Stack>
      </Box>
      <Box
  sx={{
    height: "70vh",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 2px",
    overflow: "auto",
  }}
>
  {inbox.map((e, i) => (
    <div className="containerr" key={i}>
      <div
        className={`d-flex ${
          e.userId !== authStore.me.id
            ? "justify-content-start"
            : "justify-content-end"
        }`}
      >
       

        {/* <img src = {e.user.avatarId}  style={{ width: '40px', height: '40px', borderRadius: '50%' }}/> */}
        <p
          key={i}
          className={
            e.userId === authStore.me.id
              ? "sent-message"
              : "received-message"
          }
        >
          {e.text}
        </p>
       
      </div>
      <div>
    
    {isTyping && <p> {authStore.me.fullName} is typing...</p>}
  </div>
    </div>
  ))}
</Box>
      <Box
        p={4}
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 2px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          component="form"
          onSubmit={handleSubmit}
          onFocus={handleTyping}
          onBlur={handleStopTyping}
        >
          <Stack sx={{ width: "100%" }}>
            <StyledInput
              fullWidth
              placeholder="write a message . . ."
              variant="filled"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <LinkSimple />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={() => {
                        setPicker((prev) => !prev);
                      }}
                    >
                      <Box
                        sx={{
                          display: openPicker ? "inline" : "none",
                          zIndex: 10,
                          position: "absolute",
                          bottom: 50,
                          right: 10,
                        }}
                      >
                        <Picker data={data} onEmojiSelect={console.log} />
                      </Box>
                      <Smiley />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              setPicker={setPicker}
              onChange={(e) => {setMessages(e.target.value)                              
              }}
              value={messages}
            />
          </Stack>
          <Box
            sx={{
              height: 48,
              width: 48,
              background: "#57385c",
              borderRadius: 1.5,
            }}
          >
            <Stack
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent="center"
            >
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
