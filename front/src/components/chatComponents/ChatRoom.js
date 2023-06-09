import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Badge
} from "@mui/material";
import { CircleDashed, MagnifyingGlass ,BookOpen} from "phosphor-react";
import React, { useEffect, useState } from "react";
import Search from "../Search";
import SearchIconWrapper from "../SearchIconWrapper";
import StyledInputBase from "../SearchInputBase";
import Icon from "../../assets/styles/profile.png";
import StyledBadge from "../StyledBadge";
import { useSelector ,useDispatch} from "react-redux";
import { fetchOneRoom } from "../../store/chat";



const ChatRoom = ({ chatRoomList,setRoom,room,setActiveComponent }) => {

  const authStore = useSelector(state => state.auth)
  const chatStore = useSelector((state)=>state.chat)
  const {chat} = chatStore
  const dispatch = useDispatch();


  const ChatElement = () => {
    return (
      <Box
        sx={{
          width: "100%",
          height: 65,
          borderRadius: 1,
          backgroundColor: "#fff",
        }}
      >
        {chatRoomList.map((chatRoom,i) => {
          let name = ''
          if (chatRoom.name === null)
            name = chatRoom.participants.filter(p => p.userId !== authStore.me?.id)[0].user.fullNameEn
          else {
            name = chatRoom.name
          }
          return (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
key={i}
onClick={()=>{
  dispatch(fetchOneRoom(chatRoom.id))
  setActiveComponent("conversation")
}}

            >
              <Stack direction="row" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar src={Icon} />
                </StyledBadge>
                <Stack>
                  <Typography variant="subtitle1">{name}</Typography>
                  <Typography variant="caption">{chatRoom.messages[0].text}</Typography>
                </Stack>

              </Stack>
              <Stack spacing={2} alignItems="center">
                <Typography sx={{ fontWeight: 600 }} variant="caption">
                 {chatRoom.messages[0].createdAt.slice(11,16)}
                </Typography>
                <Badge color="primary" badgeContent={2}></Badge>
              </Stack>
            </Stack>
          )
        }

        )}
      </Box>
    );
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: 320,
        backgroundColor: "#F8FAFF",
        boxShadow: "0px 0px 2px",
      }}
    >
      <Stack p={3} spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Discussion</Typography>
          <IconButton>
            <BookOpen />
          </IconButton>
        </Stack>
        <Stack sx={{ width: "100%" }} spacing={3}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#57385c" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search" />
          </Search>
          <Divider />
          <ChatElement />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatRoom;
