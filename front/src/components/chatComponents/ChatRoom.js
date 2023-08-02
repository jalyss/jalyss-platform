import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Badge,
} from "@mui/material";
import {
  CircleDashed,
  MagnifyingGlass,
  BookOpen,
  Checks,
} from "phosphor-react";
import React, { useEffect, useState } from "react";
import Search from "../Commun/Search";
import SearchIconWrapper from "../Commun/SearchIconWrapper";
import StyledInputBase from "../Commun/inputs/SearchInputBase";
import Icon from "../../assets/images/profile.png";
import StyledBadge from "../Commun/StyledBadge";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const ChatRoom = ({
  chatRoomList,
  setRoom,
  room,
  setActiveComponent,
  setSelectedUser,
  screen,
}) => {
  const navigate = useNavigate();
  const authStore = useSelector((state) => state.auth?.me);
  const chatStore = useSelector((state) => state.chat);
  const { notSeen } = chatStore;
  let number = notSeen;
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [identifier, setIdentifier] = useState("");

  const filteredChatRooms = chatRoomList.filter((chatRoom) => {
    let name = chatRoom.participants.filter(
      (p) => p.userId !== authStore?.id
    )[0].user.fullNameEn;
    return name.toLowerCase().includes(searchText.toLowerCase());
  });
  const containerStyle = {
    width: "200px",
    height: "200px",
  };

  const ChatElement = () => {
    return (
      <Box
        sx={{
          width: "100%",
          height: 65,
          borderRadius: 1,
          // backgroundColor: "#fff",
        }}
      >
        {filteredChatRooms.map((chatRoom, i) => {
          setIdentifier(chatRoom.id);

          let name = "";
          let user = chatRoom.participants.filter(
            (p) => p.userId !== authStore?.id
          )[0];
          if (chatRoom.name === null)
            name = chatRoom.participants.filter(
              (p) => p.userId !== authStore?.id
            )[0].user.fullNameEn;
          else {
            name = chatRoom.name;
          }
          return (
            <Stack
              className="pointer"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              key={i}
              onClick={() => {
                setSelectedUser(user);

                if (screen === "md") setActiveComponent("conversation");
                navigate(`/chat-box/user/${user?.userId}`);
              }}
            >
              <Stack direction="row" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar src={user?.user?.avatar ? user?.user?.avatar?.path : Icon} />
                </StyledBadge>
                <Stack>
                  <Typography variant="subtitle1">{name}</Typography>
                  <Typography variant="caption">
                    {chatRoom.messages[0]?.text}
                  </Typography>
                </Stack>
              </Stack>
              <Stack spacing={2} alignItems="center">
                <Typography sx={{ fontWeight: 600 }} variant="caption">
                  {chatRoom.messages[0]?.createdAt.slice(11, 16)}
                </Typography>
                {chatRoom?._count?.messages ? (
                  <Badge
                    color="primary"
                    badgeContent={chatRoom?._count?.messages}
                  ></Badge>
                ) : chatRoom.messages[0]?.userId !== authStore.id ? (
                  <Checks size={25} weight="thin" color="green" />
                ) : (
                  <Checks size={25} weight="light" color="blue" />
                )}

                {/* <Badge color="primary" badgeContent={chatRoom?._count?.messages}></Badge> */}
              </Stack>
            </Stack>
          );
        })}
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
            <StyledInputBase
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Search>
          <Divider />
          <ChatElement />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatRoom;
