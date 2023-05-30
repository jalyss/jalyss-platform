import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CircleDashed, MagnifyingGlass } from "phosphor-react";
import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import SearchIconWrapper from "../components/SearchIconWrapper";
import StyledInputBase from "../components/SearchInputBase";
import Icon from "../assets/styles/profile.png";
import StyledBadge from "../components/StyledBadge";

import { useSelector } from "react-redux";
import axios from "axios";



const ConnectedUsers = ({ socket }) => {
  const authStore = useSelector(state => state.auth)

  const [connectedUsers, setConnectedUsers] = useState([])

  useEffect(() => {
    if (authStore.me) {
      function listConnectedUsers(users) {
        console.log(users);
        setConnectedUsers(users)
      }
      socket.on(`connected-users/${authStore.me.id}`, listConnectedUsers)
      return () => { socket.off(`connected-users/${authStore.me.id}`, listConnectedUsers) }
    }
  }, [socket, authStore.me])

  const ChatElement = ({ user }) => {

    return (
      <Box
        sx={{
          width: "100%",
          height: 65,
          borderRadius: 1,
          backgroundColor: "#fff",
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={Icon} />
            </StyledBadge>
            <Stack>
              <Typography variant="subtitle1">{user.user.fullNameEn}</Typography>
            </Stack>
          </Stack>
        </Stack>
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
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" style={{ whiteSpace: "nowrap" }}>
            Online Users
          </Typography>
          <IconButton>
            <CircleDashed />
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
          {connectedUsers.map((user) => 
            
            <ChatElement user={user} /> )
          }

        </Stack>
      </Stack>
    </Box>
  );
};

export default ConnectedUsers;