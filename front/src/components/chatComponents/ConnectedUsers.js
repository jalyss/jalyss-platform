import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  CircleDashed,
  MagnifyingGlass,
  WifiHigh,
  ChatText,
} from "phosphor-react";
import React, { useEffect, useState, useMemo } from "react";
import Search from "../Commun/Search";
import SearchIconWrapper from "../Commun/SearchIconWrapper";
import StyledInputBase from "../Commun/inputs/SearchInputBase";
import Icon from "../../assets/images/profile.png";
import StyledBadge from "../Commun/StyledBadge";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConnectedUsers = ({
  socket,
  setActiveComponent,
  setSelectedUser,
  screen,
}) => {
  const authStore = useSelector((state) => state.auth);

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleChatTextClick = (user) => {
    setSelectedUser(user);
    if (screen === "md") setActiveComponent("conversation");
    navigate(`/chat-box/user/${user?.userId}`);
  };

  useEffect(() => {
    if (authStore.me) {
      socket.emit("online-users", authStore.me.id);
    }
  }, [socket, authStore.me]);

  useEffect(() => {
    if (authStore.me) {
      function listConnectedUsers(users) {
        console.log('connected user',users);
        setConnectedUsers(users);
      }
      socket.on(`connected-users/${authStore.me.id}`, listConnectedUsers);
      return () => {
        socket.off(
          `connected-users/${authStore.me.id}`,
          listConnectedUsers
        );
      };
    }
  }, [socket, authStore.me]);

  const ChatElement = ({ user }) => {
    return (
      <Box
        sx={{
          width: "100%",
          height: 65,
          borderRadius: 1,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={user.user.avatar ? user.user.avatar.path : Icon} />
            </StyledBadge>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={19}
            >
              <Typography variant="subtitle1">
                {user.user.fullNameEn}
              </Typography>
              <IconButton>
                <ChatText
                  color="#57385c"
                  onClick={() => handleChatTextClick(user)}
                />
              </IconButton>
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
        width: "100%",
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
          <Typography variant="h5" style={{ whiteSpace: "nowrap" }}>
            Online Users
          </Typography>
          <IconButton>
            <WifiHigh style={{ color: "black" }} />
          </IconButton>
        </Stack>
        <Stack sx={{ width: "100%" }} spacing={3}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#57385c" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Search>
          <Divider />
          {connectedUsers
            .filter((u) => u.userId !== authStore.me?.id)
            .filter((u) =>
              u.user.fullNameEn.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((user) => (
              <ChatElement
                user={user}
                handleChatTextClick={handleChatTextClick}
              />
            ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ConnectedUsers;
