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
  UserList,
  Plugs
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
import Modal from "../Commun/Modal"

const Conversation = ({ setChatRoomList, room, userr, socket }) => {
  const [basicModal,setBasicModal]=useState(false)
  const [basicModal2,setBasicModal2]=useState(false)
  const myId = useSelector((state) => state.auth.me?.id);
  const userStore = useSelector((state) => state.user)
  const { user } = userStore
  console.log("hahaa", userr)
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
  const [groupeChatName,setGroupeChatName] = useState(null)
  const [participants, setParticipants] = useState([])

  const userName = user ? user.fullNameEn : userr?.user?.fullNameEn;
  const messagesEndRef = useRef(null);
  const { userId } = useParams()
  console.log("uu", userId);
  const toggleShow=()=>{
    setBasicModal(!basicModal)
  }
  const toggleShow2=()=>{
    setBasicModal2(!basicModal2)
  }
  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [inbox]);


  useEffect(() => {
    dispatch(fetchUser(userId))
  }, [userId, userr?.userId])

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/v1/chatRoom/by-participants/${userId?userId:userr?.userId}/${myId}`)
      .then((res) => {
    
        setExist(res.data.id);
      })
      .catch((err) => console.log("je error", err));
  }, [myId, userId]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/v1/chatRoom/one/${userId?userId:userr?.userId}`)
      .then((res) => {
        setExist(res.data.id);
        setGroupeChatName(res.data.name)
        setParticipants(res.data.participants)
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    if (exist) {
      axios
        .get(`http://localhost:3001/api/v1/messages/${exist}`, {
          params: {
            numberMessages: number,
          },
        })
        .then((response) => {
          let aux = [];
          for (let i = response.data.length - 1; i >= 0; i--){
            aux.push(response.data[i]);
          }
          console.log(aux[aux.length - 1]);
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
        socket.emit("msg-seen", payload);
      }
    }
  }, [exist, inbox]);

  useEffect(() => {
    function getMsg(value) {
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
      setInbox(data);
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
          receiverId:
            //  user.userId
           [ userId ? userId : userr?.userId ]
          ,
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
                <Avatar
                  alt="profile picture"
                  src={user ? user.avatar.path : userr?.user?.avatar? userr?.user?.avatar.path : Icon }

                />
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography variant="subtitle2">
             
                {groupeChatName?groupeChatName:userName}
              </Typography>
              <Typography variant="caption">Online</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <span
             className="tt"
             title="See all members">
            <IconButton>
              <UserList onClick={toggleShow}/>
            </IconButton>
            </span>
            <span
             className="tt"
             title="Leave the groupe">
            <IconButton>
              <Plugs  onClick={toggleShow2} />
            </IconButton>
            </span>
            {/* <IconButton>
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
              className={`d-flex  ${e.userId !== myId
                  ? "justify-content-start"
                  : "justify-content-end"
                }`}
            >
              <span 
               className="tt"
               data-bs-placement="bottom"
               title={e.user?.fullNameEn}
              >
              <img src={ e.user?.avatar ? e.user.avatar.path : Icon} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
           </span>  
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
              {i === inbox.length - 1 && e.seen && e.userId === myId && (
                <p><Checks size={25} weight="thin" color="green" /> at {e.updatedAt.slice(11, 16)}</p>
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
              <IconButton onClick={handleSubmit}>
                <PaperPlaneTilt color="#fff" />
              </IconButton>
            </Stack>
          </Box>
          <Modal basicModal={basicModal} setBasicModal={setBasicModal} normal={true} toggleShow={toggleShow} withoutSave={true} body={
            <Stack sx={{display:"grid" , gridTemplateColumns:"repeat(3,1fr)"}}>
            {participants?.map((elem)=>{
              return(<Stack
                sx={{ height: "100%", width: "100%",marginBottom:"12px" }}
                alignItems="center"
                justifyContent="center"
                spacing={10}
              >
              <Avatar  src = {elem.user.avatar?elem.user.avatar.path:Icon}/>
              {elem.user.fullNameEn}
              
              
              </Stack>)
            })}
         
            </Stack>
          } 
          title = "See all Members"/>
                <Modal basicModal={basicModal2} setBasicModal={setBasicModal2} ofDelete={true} toggleShow={toggleShow2}  bodOfDelete={
                  <>
                  Are you sure to leave the groupe ? 
                  </>
                }
           
         
       
          title = "leave the groupe"/>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Conversation;
