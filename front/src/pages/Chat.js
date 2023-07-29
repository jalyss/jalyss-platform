import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Divider, IconButton, Stack, Switch } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Phone, ChatCircleDots, Users, Broadcast } from "phosphor-react";
import { Link } from "react-router-dom";

import Conversation from "../components/chatComponents/Conversation";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ConnectedUsers from "../components/chatComponents/ConnectedUsers";
import { SocketContext } from "../apps/Client";
import ChatRoom from "../components/chatComponents/ChatRoom";
import GroupChat from "../components/chatComponents/GroupChat";
import { styled } from "@mui/system";
import { fetchMessages, fetchChatRoom } from "../store/chat";
import config from "../configs";


const Stack0 = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
  },
}));

const Stack1 = styled("div")(({ theme }) => ({
  flexDirection: "column",
  width: "max-content",
  alignItems: "center",
  display: "flex",
  gap: 10,
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
  },
}));

const Stack2 = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  gap: 10,
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
  },
}));

const Box1 = styled("div")(({ theme }) => ({
  padding: 10,
  backgroundColor: "white",
  height: "100vh",
  boxShadow: "0px 0px 2px",
  width: 100,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: 60,
  },
}));

const BoxDiscussion = styled("div")(({ theme }) => ({
  backgroundColor: "#57385c",
  borderRadius: 6,
  padding: 8,
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const BoxLg = styled("div")(({ theme }) => ({
  width: 500,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const BoxMd = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const BoxLgConversation = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const theme = useTheme();

  const myId = useSelector((state) => state.auth.me?.id);

  const [chatRoomList, setChatRoomList] = useState([]);
  const [room, setRoom] = useState({});
  const [activeComponentMd, setActiveComponentMd] = useState("chatRoom");
  const [activeComponentLg, setActiveComponentLg] = useState("chatRoom");

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (myId) {
      axios
        .get(`${config.API_ENDPOINT}/chatRoom/by-user${myId}`)
        .then((response) => {
          const data = response.data;
          setChatRoomList(data);
          // setSelectedUser(
          //   data[0].participants.find((participant) => participant.user.id !== myId)
          // );
        })
        .catch((err) => console.log(err));
    }
  }, [myId]);

  useEffect(() => {
    function handleChatRooms(value) {
      setChatRoomList(value);
      console.log('seens');
    }
    socket.on(`chat-rooms/${myId}`, handleChatRooms);

    return () => {
      socket.off(`chat-rooms/${myId}`, handleChatRooms);
    };
  }, [socket, myId]);
  const handleChangeComponent = (string) => {
    setActiveComponentLg(string);
    setActiveComponentMd(string);
  };

  

  return (
    <div className="d-flex chatContainer">
      <Box1>
        <Stack0>
          <Stack1 spacing={3}>
            <Box p={1} sx={{ backgroundColor: "#57385c", borderRadius: 1.5 }}>
              <IconButton
                sx={{ width: "max-content", color: "#fcfefe" }}
                onClick={() => {
                  handleChangeComponent("chatRoom");
                }}
              >
                <ChatCircleDots />
              </IconButton>
            </Box>
            <Box p={1} sx={{ backgroundColor: "#57385c", borderRadius: 1.5 }}>
              <IconButton
                sx={{ width: "max-content", color: "#fcfefe" }}
                onClick={() => {
                  handleChangeComponent("connectedUsers");
                }}
              >
                <Broadcast className="users" />
              </IconButton>
            </Box>
            <Box p={1} sx={{ backgroundColor: "#57385c", borderRadius: 1.5 }}>
              <IconButton
                sx={{ width: "max-content", color: "#fcfefe" }}
                onClick={() => {
                  handleChangeComponent("GroupChat");
                }}
              >
                <Users />
              </IconButton>
            </Box>
          </Stack1>
          <div className="w-100 d-flex optionChat">
            <Stack2>
              <Switch defaultChecked color="warning" />
              <Avatar />
            </Stack2>
          </div>
        </Stack0>
      </Box1>

      {activeComponentLg === "connectedUsers" && (
        <BoxLg>
          <ConnectedUsers
            socket={socket}
            setActiveComponent={handleChangeComponent}
            setSelectedUser={setSelectedUser}
            screen="lg"
          />
        </BoxLg>
      )}

      {activeComponentLg === "chatRoom" && (
        <BoxLg>
          <ChatRoom
            chatRoomList={chatRoomList.filter((room) => !room.isGroup)}
            setRoom={setRoom}
            room={room}
            setActiveComponent={handleChangeComponent}
            setSelectedUser={setSelectedUser}
            screen="lg"
          />
        </BoxLg>
      )}

      {activeComponentLg === "GroupChat" && (
        <BoxLg>
          <GroupChat
            chatRoomList={chatRoomList.filter((room) => room.isGroup)}
            setRoom={setRoom}
            room={room}
            setActiveComponent={handleChangeComponent}
            setSelectedUser={setSelectedUser}
            screen="lg"
          />
        </BoxLg>
      )}

      <BoxLgConversation>
        <Conversation
          // setChatRoomList={setChatRoomList}
          // room={room}
          selectedUser={selectedUser}
          socket={socket}
          setSelectedUser={setSelectedUser}
        />
      </BoxLgConversation>

      {activeComponentMd === "connectedUsers" && (
        <BoxMd>
          <ConnectedUsers
            socket={socket}
            setActiveComponent={handleChangeComponent}
            setSelectedUser={setSelectedUser}
            screen="md"
          />
        </BoxMd>
      )}

      {activeComponentMd === "chatRoom" && (
        <BoxMd>
          <ChatRoom
            chatRoomList={chatRoomList.filter((room) => !room.isGroup)}
            setRoom={setRoom}
            room={room}
            setActiveComponent={handleChangeComponent}
            setSelectedUser={setSelectedUser}
            screen="md"
          />
        </BoxMd>
      )}

      {activeComponentMd === "GroupChat" && (
        <BoxMd>
          <GroupChat
            chatRoomList={chatRoomList.filter((room) => room.isGroup)}
            setRoom={setRoom}
            room={room}
            setActiveComponent={handleChangeComponent}
            setSelectedUser={setSelectedUser}
            screen="md"
          />
        </BoxMd>
      )}

      {activeComponentMd === "conversation" && (
        <BoxMd>
          <Conversation
            selectedUser={selectedUser}
            socket={socket}
            setSelectedUser={setSelectedUser}
          />
        </BoxMd>
      )}
    </div>
  );
};

export default Chat;
