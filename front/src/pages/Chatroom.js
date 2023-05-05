import React from "react";
import { Avatar, Box, Divider, IconButton, Stack, Switch } from "@mui/material";
import { useTheme } from "@emotion/react";
// import Icon from "../assets/styles/chat-121.png";
import { Phone, ChatCircleDots, Users, Gear } from "phosphor-react";
import Chats from "./Chats";
import Conversation from "./conversation/Conversation";


const Chatroom = () => {
  const theme = useTheme();
  console.log(theme);

 


  return (
    <div style={{display : "flex"}}>
      <Box
        p={2}
        sx={{
          backgroundColor: "white",
          height: "100vh",
          boxShadow: "0px 0px 2px",
          width: 100,
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: "100%" }}
          spacing={3}
        >
        <Stack alignItems="center" spacing={4}>
        <Box
            sx={{
              backgroundColor: "#57385c",
              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            {/* <img src={Icon}/> */}
          </Box>
          <Stack
            spacing={3}
            sx={{ width: "max-content" }}
            direction="column"
            alignItems="center"
          >
            <Box p={1} sx={{ backgroundColor: "#57385c", borderRadius: 1.5 }}>
              <IconButton sx={{ width: "max-content", color: "#fcfefe" }}>
                <ChatCircleDots />
              </IconButton>
            </Box>
            <Box p={1} sx={{ backgroundColor: "#57385c", borderRadius: 1.5 }}>
              <IconButton sx={{ width: "max-content", color: "#fcfefe" }}>
                <Users />
              </IconButton>
            </Box>
            <Box p={1} sx={{ backgroundColor: "#57385c", borderRadius: 1.5 }}>
              <IconButton sx={{ width: "max-content", color: "#fcfefe" }}>
                <Phone />
              </IconButton>
            </Box>
            <Divider sx={{ width: "48px" }} />
            <IconButton>
              <Gear />
            </IconButton>
          </Stack>
        </Stack>
         
          <Stack spacing={4}>
          <Switch defaultChecked color="warning"/>
            <Avatar />
            
          </Stack>
          
        </Stack>
       
      </Box>
      <Chats/>
      <Conversation/>
      
    </div>
  );
};

export default Chatroom;
