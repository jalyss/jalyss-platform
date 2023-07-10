import React, { useContext, useEffect, useState, useRef } from "react";
import { Avatar, Box, Divider, IconButton, Stack, Switch } from "@mui/material";
import { useTheme } from "@emotion/react";
// import Icon from "../assets/styles/profile.png";
import {
  Phone,
  ChatCircleDots,
  Users,
  Gear,
  AddressBook,
  Broadcast,
  CellSignalFull,
} from "phosphor-react";
import "../../assets/styles/chat.css";
import Conversation from "../chat/chatComponents/conversation";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ConnectedUsers from "../chat/chatComponents/connectedUser";
import { SocketContext } from "../../apps/Client";
import ChatRoom from "../chat/chatComponents/chatRoom";
import { styled } from "@mui/material/styles";
const Chat = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const theme = useTheme();

  const myId = useSelector((state) => state.auth.me?.id);
  const [authorId, setAuthorId] = useState([]);

  const [chatRoomList, setChatRoomList] = useState([]);
  const [room, setRoom] = useState({});
  const [activeComponentMd, setActiveComponentMd] = useState("chatRoom");
  const [activeComponentLg, setActiveComponentLg] = useState("chatRoom");
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    if (myId)
      axios
        .get(`http://localhost:3001/api/v1/chatRoom/${myId}`)
        .then((response) => {
          let data = response.data;
          console.log(data);
          setChatRoomList(data);
          setSelectedUser(
            data[0].participants.filter(
              (particip) => particip.user.id !== myId
            )[0]
          );
        })
        .catch((err) => console.log(err));
  }, [myId]);
  useEffect(() => {
    function chatRoomList(value) {
      setChatRoomList(value);
    }
    //socket.on(`chat-rooms/${myId}`, chatRoomList);

    return () => {
      //  socket.off(`chat-rooms/${myId}`, chatRoomList);
    };
  }, [socket, myId]);

  const handleChangeComponent = (string) => {
    setActiveComponentLg(string);
    setActiveComponentMd(string);
  };

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

            {/* <Box p={1}
              sx={{ backgroundColor: "#57385c", borderRadius: 1.5 }}

            >
              <IconButton sx={{ width: "max-content", color: "#fcfefe" }}
                onClick={() => {
                  handleChangeComponent("chatRoom")

                }}>
                <Users />
              </IconButton>
            </Box> */}
            {/* <Divider sx={{ width: "48px" }} />
            <IconButton>
              <Gear />
            </IconButton> */}
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
            screen={"lg"}
          />
        </BoxLg>
      )}
      {activeComponentLg === "chatRoom" && (
        <BoxLg>
          <ChatRoom
            chatRoomList={chatRoomList}
            setRoom={setRoom}
            room={room}
            setActiveComponent={handleChangeComponent}
            setSelectedUser={setSelectedUser}
            screen={"lg"}
          />
        </BoxLg>
      )}

      <BoxLgConversation>
        <Conversation
          setChatRoomList={setChatRoomList}
          room={room}
          userr={selectedUser}
          socket={socket}
        />
      </BoxLgConversation>

      {activeComponentMd === "connectedUsers" && (
        <BoxMd>
          <ConnectedUsers
            socket={socket}
            setActiveComponent={handleChangeComponent}
            setSelectedUser={setSelectedUser}
            screen={"md"}
          />
        </BoxMd>
      )}
      {activeComponentMd === "chatRoom" && (
        <BoxMd>
          <ChatRoom
            chatRoomList={chatRoomList}
            setRoom={setRoom}
            room={room}
            setActiveComponent={handleChangeComponent}
            setSelectedUser={setSelectedUser}
            screen={"md"}
          />
        </BoxMd>
      )}
      {activeComponentMd === "conversation" && (
        <BoxMd>
          <Conversation
            setChatRoomList={setChatRoomList}
            room={room}
            userr={selectedUser}
            socket={socket}
          />
        </BoxMd>
      )}
    </div>
  );
};

export default Chat;
