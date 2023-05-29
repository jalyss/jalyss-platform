import React,{useEffect, useState} from "react";
import { Avatar, Box, Divider, IconButton, Stack, Switch } from "@mui/material";
import { useTheme } from "@emotion/react";
import Icon from "../assets/styles/profile.png";
import { Phone, ChatCircleDots, Users, Gear } from "phosphor-react";
import Chats from "./Chats";
import Conversation from "./conversation/Conversation";
import axios from "axios";
import { useSelector } from "react-redux";

import ConnectedUsers from "./ConnectedUsers";

const Chatroom = () => {
  const authStore = useSelector(state => state.auth)

  const theme = useTheme();
  console.log(theme);
  const [chatRoomList,setChatRoomList] = useState([])
  const [show,setShow]=useState(false)
  const [mesg,setMesg]=useState(false)

  useEffect(()=>{
    axios.get(`http://localhost:3001/api/v1/chatRoom/${"f62d33bd-9633-453f-9428-6c10368ac296"}`).then((response)=>{
      let data = response.data
      console.log(data)
      setChatRoomList(data)
    }).catch(err=>console.log(err))
  },[])

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
                <ChatCircleDots  onClick={() => setMesg(!mesg)}/>
              </IconButton>
            </Box>
            <Box p={1} sx={{ backgroundColor: "#57385c", borderRadius: 1.5 }}>
              <IconButton sx={{ width: "max-content", color: "#fcfefe" }}>
                <Users className="users" onClick={() => setShow(!show)}/>
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
   { show&&<ConnectedUsers /> }  
     { mesg&&<Chats chatRoomList={chatRoomList}/>}
      <Conversation setChatRoomList={setChatRoomList}/>

    </div>
  );
};

export default Chatroom;
