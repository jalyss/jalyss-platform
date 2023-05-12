import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Badge
} from "@mui/material";
import { CircleDashed, MagnifyingGlass } from "phosphor-react";
import React from "react";
import Search from "../components/Search";
import SearchIconWrapper from "../components/SearchIconWrapper";
import StyledInputBase from "../components/SearchInputBase";
import Icon from "../assets/styles/profile.png";
import StyledBadge from "../components/StyledBadge";

const Chats = () => {
  const ChatElement = () => {
    return (
      <Box
        sx={{
          width: "100%",
          height: 65 ,
          borderRadius: 1,
          backgroundColor: "#fff",
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
              <Avatar src={Icon} />
            </StyledBadge>
            <Stack>
              <Typography variant="subtitle1">Alaa Bouali</Typography>
              <Typography variant="caption">wink cv chaamel !</Typography>
            </Stack>
            
          </Stack>
          <Stack spacing={2} alignItems="center">
           <Typography sx={{fontWeight : 600}} variant="caption">
             10:46
           </Typography>
          <Badge color="primary" badgeContent={2}></Badge>
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">chats</Typography>
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
          <ChatElement />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
