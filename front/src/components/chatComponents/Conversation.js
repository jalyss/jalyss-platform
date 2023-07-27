import {
  Stack,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  InputAdornment,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import StyledBadge from "../Commun/StyledBadge";
import Icon from "../../assets/styles/profile.png";
import {
  CaretDown,
  LinkSimple,
  MagnifyingGlass,
  PaperPlaneTilt,
  Phone,
  Smiley,
  VideoCamera,
  Checks,
} from "phosphor-react";
import StyledInput from "../Commun/inputs/StyledInput";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "../../assets/styles/conversation.css";

import { fetchMessages } from "../../store/chat";
import Lottie from "lottie-react";
import typing from "../../assets/typing.json";
import { useRef } from "react";
import { SocketContext } from "../../apps/Client";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../store/user";
import config from "../../configs";
import { set } from "lodash";

const Conversation = ({
  setChatRoomList,
  room,
  selectedUser,
  socket,
  setSelectedUser,
}) => {
  const myId = useSelector((state) => state.auth.me?.id);
  const userStore = useSelector((state) => state.user);
  const { user } = userStore;

  // const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [openPicker, setPicker] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const [number, setNumber] = useState(20);
  const [message, setMessage] = useState("");
  const [inbox, setInbox] = useState([]);
  const [isTyping, setIsTyping] = useState([]);
  const [exist, setExist] = useState(null);

  const messagesEndRef = useRef(null);
  const { userId } = useParams();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };
  useEffect(() => {
    if (selectedUser) scrollToBottom();
  }, [inbox, selectedUser]);



  useEffect(() => {
    axios
      .get(
        `${config.API_ENDPOINT}/chatRoom/by-participants/${
          userId ? userId : selectedUser?.userId
        }/${myId}`
      )
      .then((res) => {
        
        setExist(res.data.id);
        if(!selectedUser)
        setSelectedUser(
          res.data.participants.filter(
            (participant) => participant.userId !== myId
          )[0]
        );
        
      })
      .catch((err) =>
        axios
          .get(
            `${config.API_ENDPOINT}/chatRoom/one/${
              userId ? userId : selectedUser?.userId
            }`
          )
          .then((res) => {
            if(!selectedUser)
            setSelectedUser(res.data)
            setExist(res.data.id);
            setInbox([])
          }).catch(err=>console.log(err))
      );
  }, [myId, userId]);

  useEffect(() => {
    if (exist) {
      axios
        .get(`${config.API_ENDPOINT}/messages/${exist}`, {
          params: {
            numberMessages: number,
          },
        })
        .then((response) => {
          let aux = [];
          for (let i = response.data.length - 1; i >= 0; i--) {
            aux.push(response.data[i]);
          }

          setInbox(aux);
        })
        .catch((err) => console.log(err));
    }
  }, [exist]);

  useEffect(() => {
    if (
      inbox[inbox.length - 1]?.chatRoomId === exist &&
      !inbox[inbox.length - 1]?.seen
    ) {
      if (inbox[inbox.length - 1]?.userId !== myId) {
        const payload = {
          chatRoomId: inbox[inbox.length - 1]?.chatRoomId,
          userId: myId,
          num: number,
        };
        console.log('seen');
        socket.emit("msg-seen", payload);
      }
    }
  }, [exist, inbox]);

  useEffect(() => {
    function getMsg(value) {
      console.log(value);
      setInbox((Inbox) => [...Inbox, value]);
    }

    function getIsTyping(data) {
      if (data.id !== myId) {
        let aux = isTyping.slice();
        let typing = false;
        for (let i = 0; i < aux.length; i++) {
          if (aux[i].id === data.id) typing = true;
        }
        if (!typing) {
          aux.push(data);
          setIsTyping(aux);
        }
      }
    }
    function removeIsTyping(data) {
      if (data.id !== myId) {
        let aux = isTyping.slice();
        aux.filter((e) => e.id !== data.id);
        setIsTyping(aux);
      }
    }
    function getInbox(data) {
      let aux = [];
          for (let i = data.length - 1; i >= 0; i--) {
            aux.push(data[i]);
          }

          setInbox(aux);
     
    }
    function getChatRoomCreated(data) {
      setExist(data.id);
    }
    socket.on(`msg-to-client/${exist}`, getMsg);
    socket.on(`typing/${exist}`, getIsTyping);
    socket.on(`no-typing/${exist}`, removeIsTyping);
    socket.on(`messages/${exist}`, getInbox);
    socket.on(`chat-room-created/${myId}`, getChatRoomCreated);

    return () => {
      socket.off(`msg-to-client/${exist}`, getMsg);
      socket.off(`typing/${exist}`, getIsTyping);
      socket.off(`no-typing/${exist}`, removeIsTyping);
      socket.off(`messages/${exist}`, getInbox);
      socket.off(`chat-room-created/${myId}`, getChatRoomCreated);
    };
  }, [socket, exist, myId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      if (exist) {
        let payload = {
          chatRoomId: exist,
          userId: myId,
          text: message,
        };
        socket.emit("msg-to-server", payload);
      } else {
        let payload = {
          receiverId: userId ? userId : selectedUser?.userId,
          senderId: myId,
          text: message,
        };
        socket.emit("create-chat-room", payload);
      }

      setMessage("");
    } else {
      return;
    }
  };

  const handleTyping = () => {
    socket.emit(`is-typing`, { userId: myId, chatRoomId: exist });
  };

  const handleStopTyping = () => {
    socket.emit(`is-typing`, { userId: myId, chatRoomId: exist });
  };

  return (
    <Stack height="100%" maxHeight="100vh" width="100%">
      {!selectedUser ? (
        <h1>No conversation</h1>
      ) : (
        <>
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
                    {selectedUser?.name
                      ? selectedUser.name
                      : selectedUser?.user
                      ? selectedUser.user.fullNameEn
                      : ""}
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
              overflowY: "scroll",
              scrollBehavior: "unset",
            }}
            ref={messagesEndRef}
          >
            {inbox.map((e, i) => (
              <div className="containerr" key={i}>
                <div
                  className={`d-flex  ${
                    e.userId !== myId
                      ? "justify-content-start"
                      : "justify-content-end"
                  }`}
                >
                  <img
                    src={e?.user?.avatar ? e?.user?.avatar?.path : Icon}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit:"cover"
                    }}
                  />
                  <div>
                    <p
                      key={i}
                      className={
                        e.userId === myId ? "sent-message" : "received-message"
                      }
                    >
                      {e.text}
                    </p>
                    <div>
                      {i === inbox.length - 1 &&
                        e.seen &&
                        e.userId === myId && (
                          <p>
                            <Checks size={25} weight="thin" color="green" /> at{" "}
                            {e.updatedAt.slice(11, 16)}
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping.length ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <p style={{ marginLeft: "5px", marginTop: "7px" }}>
                  {isTyping.map((elem) => elem.fullNameEn + " ")} is typing
                </p>{" "}
                <Lottie
                  animationData={typing}
                  loop={true}
                  style={{ width: "100px", marginLeft: "-34px" }}
                />
              </div>
            ) : null}
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
              onKeyDown={handleTyping}
              // onFocus={handleTyping}
              // onBlur={handleStopTyping}
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
                                setMessage(`${message}${emoji.native}`);
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
                    setMessage(`${e.target.value}`);
                  }}
                  value={message}
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
                  <IconButton onSubmit={handleSubmit} type="submit">
                    <PaperPlaneTilt color="#fff" />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default Conversation;
