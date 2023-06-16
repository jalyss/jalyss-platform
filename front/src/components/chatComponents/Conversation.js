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
import { useSelector, useDispatch } from "react-redux";
import "../../assets/styles/conversation.css";
import { loadLanguages } from "i18next";
import { fetchMessages } from "../../store/chat";
import Lottie from "lottie-react";
import typing from "../../assets/typing.json"

const Conversation = ({ setChatRoomList, room, user }) => {
  const authStore = useSelector((state) => state.auth?.me);


  const dispatch = useDispatch();


  const socket = io("http://localhost:3001");


  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [openPicker, setPicker] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [number, setNumber] = useState(20);
  const [messages, setMessages] = useState("");
  const [inbox, setInbox] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [exist, setExist] = useState([])
  const [lastSeenMessageId, setLastSeenMessageId] = useState('')


  const userName = user?.user?.fullNameEn

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/chatRoom/one/${user?.userId}/${authStore?.id}`)
      .then(res => {
        console.log("there is chatrom", res.data.id)
        setExist(res.data.id)
        axios
          .get(
            `http://localhost:3001/api/v1/messages/${res.data.id}`,
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
      })
      .catch(err => console.log(err))
  }, [messages.length])


  useEffect(() => {
    // dispatch(fetchMessages(chat?.id,20))
    // setInbox(messagess.items)
  }, []);




  useEffect(() => {
    function chatRoomList(value) {
      console.log(value);
      setChatRoomList(value);
    }
    socket.on(`chat-room/${authStore?.id}`, chatRoomList);

    return () => {
      socket.off(
        `chat-room/${authStore?.id}`,
        chatRoomList
      );
    };
  }, [socket]);



  useEffect(() => {
    function getMsg(value) {
      console.log(value);
      setInbox((Inbox) => [...Inbox, value]);
    }
    socket.on(`msgToClient/${exist}`, getMsg);

    socket.on("typing", (data) => {
      if (data.userId !== authStore?.id) { setIsTyping(data.isTyping) }
    });
    return () => {
      socket.off(`msgToClient/${exist}`, getMsg);
      socket.off("typing");

    };
  }, [socket]);

  useEffect(() => {
    socket.on('msgSeen', (data) => {
      const { messageId, userId } = data;
      if (messageId === inbox[inbox.length - 1]?.id && userId === authStore?.id) {
        setLastSeenMessageId(messageId);
      }
    });

    return () => {
      socket.off('msgSeen');
    };
  }, [inbox, authStore?.id]);




  const handleSubmit = (e) => {
    if (messages.trim() !== "") {
      e.preventDefault();
      if (exist) {
        let payload = {
          chatRoomId: exist,
          userId: authStore?.id,
          text: messages
        }
        socket.emit('msgToServer', payload)
      }
      else {
        let payload = {
          receiverId: user.userId,
          senderId: authStore?.id,
          text: messages,
        };
        socket.emit("create-chat-room", payload);
      }
      const lastMessage = inbox[inbox.length - 1];
      console.log("last message", lastMessage)
      if (lastMessage.id) {
        const payload = {
          messageId: lastMessage.id,
          userId: user.userId,
        };
        socket.emit('msgSeen', payload);
      }
      setMessages("");
      ;
    } else {
      return;
    }
  };

  const handleTyping = () => {
    socket.emit("typingState", { userId: authStore?.id, isTyping: true });
  };

  const handleStopTyping = () => {
    socket.emit("typingState", { userId: authStore?.id, isTyping: false });
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
                <Avatar alt="profile picture" src={user?.user?.avatar ? user.user.avatar.path : Icon} />
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
              className={`d-flex ${e.userId !== authStore?.id
                  ? "justify-content-start"
                  : "justify-content-end"
                }`}
            >


              {/* <img src = {e.user.avatarId}  style={{ width: '40px', height: '40px', borderRadius: '50%' }}/> */}
              <p
                key={i}
                className={
                  e.userId === authStore?.id
                    ? "sent-message"
                    : "received-message"
                }
              >
                {e.text}
              </p>

            </div>
            <div>
              {
                e.id === lastSeenMessageId && (
                  <p>Seen...</p>
                )}

            </div>

          </div>
        ))}
        {isTyping && (
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

            <p style={{ marginLeft: "5px", marginTop: "7px" }}>{userName} is typing</p>    <Lottie animationData={typing} loop={true} style={{ width: "100px", marginLeft: "-34px" }} />
          </div>
        )}
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
          onFocus={handleTyping}
          onBlur={handleStopTyping}
          onSubmit={handleSubmit}

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
                        setPickerOpen(!pickerOpen);
                      }}
                    >
                      <Box
                        sx={{
                          display: pickerOpen ? "inline" : "none",
                          zIndex: 10,
                          position: "absolute",
                          bottom: 50,
                          right: 10,
                        }}
                      >
                        <Picker
                          data={data}
                          onEmojiSelect={(emoji) => {
                            setSelectedEmoji(emoji.native);
                            setMessages(`${messages}${emoji.native}`);
                            setPickerOpen(false);
                          }}
                        />
                      </Box>
                      <Smiley />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              setPickerOpen={setPickerOpen}
              onChange={(e) => {
                setMessages(`${e.target.value}`);
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
