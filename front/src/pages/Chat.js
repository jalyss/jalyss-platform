import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Divider, IconButton, Stack, Switch } from "@mui/material";
import { useTheme } from "@emotion/react";
// import Icon from "../assets/styles/profile.png";
import { Phone, ChatCircleDots, Users, Gear } from "phosphor-react";

import Conversation from "../components/chatComponents/Conversation";
import axios from "axios";
import { useSelector } from "react-redux";

import ConnectedUsers from "./ConnectedUsers";
import { SocketContext } from "../apps/Client";
import ChatRoom from "../components/chatComponents/ChatRoom";
import { styled } from "@mui/material/styles";

const Chat = () => {
  const authStore = useSelector((state) => state.auth);
  const socket = useContext(SocketContext);
  const theme = useTheme();
  console.log(theme);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [show, setShow] = useState(false);
  const [mesg, setMesg] = useState(false);

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
    gap:10,
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
    },
  }));

  const Stack2 = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    gap:10,
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
    },
  }));
  const Box1 = styled("div")(({ theme }) => ({
    padding:10,
    backgroundColor: "white",
    height: "100vh",
    boxShadow: "0px 0px 2px",
    width: 100,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: 60,
    },
  }));

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/v1/chatRoom/${"f62d33bd-9633-453f-9428-6c10368ac296"}`
      )
      .then((response) => {
        let data = response.data;
        console.log(data);
        setChatRoomList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex chatContainer">
      <Box1 >
        <Stack0>
          <Stack1 spacing={3}>
            <Box p={1} sx={{ backgroundColor: "#57385c", borderRadius: 1.5 }}>
              <IconButton sx={{ width: "max-content", color: "#fcfefe" }}>
                <ChatCircleDots onClick={() => setMesg(!mesg)} />
              </IconButton>
            </Box>
            <Box p={1} sx={{ backgroundColor: "#57385c", borderRadius: 1.5 }}>
              <IconButton sx={{ width: "max-content", color: "#fcfefe" }}>
                <Users className="users" onClick={() => setShow(!show)} />
              </IconButton>
            </Box>
            <Box p={1} sx={{ backgroundColor: "#57385c", borderRadius: 1.5 }}>
              <IconButton sx={{ width: "max-content", color: "#fcfefe" }}>
                <Phone />
              </IconButton>
            </Box>
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
      {show && <ConnectedUsers socket={socket} />}
      {mesg && <ChatRoom chatRoomList={chatRoomList} />}
      <Conversation setChatRoomList={setChatRoomList} />
    </div>
  );
};

export default Chat;
