// import React, { useState } from "react";
// import {
//   Avatar,
//   Box,
//   Divider,
//   IconButton,
//   Stack,
//   Typography,
//   Badge,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   DialogContentText,
// } from "@mui/material";
// import {
//   CircleDashed,
//   MagnifyingGlass,
//   BookOpen,
//   Checks,
// } from "phosphor-react";
// import Search from "../Commun/Search";
// import SearchIconWrapper from "../Commun/SearchIconWrapper";
// import StyledInputBase from "../Commun/inputs/SearchInputBase";
// import Icon from "../../assets/styles/profile.png";
// import StyledBadge from "../Commun/StyledBadge";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchOneRoom,
//   notSeenMessages,
//   deleteChatRoom,
// } from "../../store/chat";
// import "../../assets/styles/conversation.css";

// const GroupChat = ({
//   chatRoomList,
//   setRoom,
//   room,
//   setActiveComponent,
//   setSelectedUser,
//   screen,
// }) => {
//   const navigate = useNavigate();
//   const authStore = useSelector((state) => state.auth?.me);
//   const chatStore = useSelector((state) => state.chat);
//   const { notSeen } = chatStore;
//   const dispatch = useDispatch();

//   const [searchText, setSearchText] = useState("");
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const handleGroupChatClick = (group) => {
//     setSelectedGroup(group);
//     navigate(`/group-chat/${group.id}`);
//   };

//   const handleDeleteDialogOpen = () => {
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteDialogClose = () => {
//     setDeleteDialogOpen(false);
//   };

//   const handleDeleteGroupChat = () => {
//     // Add your delete group chat logic here
//     // Example:
//     // dispatch(deleteChatRoom(selectedGroup.id));
//     // handleDeleteDialogClose();
//     console.log("Delete group chat", selectedGroup);
//   };
//   console.log(chatRoomList);

//   const filteredGroupChats = chatRoomList?.filter((groupChat) => {
//     return groupChat.name.toLowerCase().includes(searchText.toLowerCase());
//   });
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         height: "100vh",
//         width: "100%",
//         backgroundColor: "#F8FAFF",
//         boxShadow: "0px 0px 2px",
//       }}
//     >
//       <Stack p={3} spacing={2}>
//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//         >
//           <Typography variant="h5">Group Chat</Typography>
//           <IconButton>
//             <BookOpen />
//           </IconButton>
//         </Stack>
//         <Stack sx={{ width: "100%" }} spacing={3}>
//           <Search>
//             <SearchIconWrapper>
//               <MagnifyingGlass color="#57385c" />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search"
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </Search>
//           <Divider />
//           {filteredGroupChats.map((groupChat, index) => (
//             <Stack
//               key={index}
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               <Stack direction="row" spacing={2}>
//                 <StyledBadge
//                   overlap="circular"
//                   anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                   variant="dot"
//                 >
//                   <Avatar src={Icon} />
//                 </StyledBadge>
//                 <Stack>
//                   <Typography variant="subtitle1">{groupChat.name}</Typography>
//                   <Typography variant="caption">
//                     {groupChat.messages.length > 0
//                       ? groupChat.messages[0].text
//                       : ""}
//                   </Typography>
//                 </Stack>
//               </Stack>
//               <Stack spacing={2} alignItems="center">
//                 <Typography sx={{ fontWeight: 600 }} variant="caption">
//                   {groupChat.messages.length > 0
//                     ? groupChat.messages[0].createdAt.slice(11, 16)
//                     : ""}
//                 </Typography>
//                 {groupChat.messages.length > 0 ? (
//                   <Badge
//                     color="primary"
//                     badgeContent={groupChat.messages.length}
//                   />
//                 ) : (
//                   <Checks size={25} weight="light" color="blue" />
//                 )}
//               </Stack>
//               <Stack spacing={1} alignItems="center">
//                 <IconButton
//                   onClick={() => handleGroupChatClick(groupChat)}
//                   title="Open Group Chat"
//                 >
//                   <CircleDashed size={24} />
//                 </IconButton>
//                 <IconButton
//                   onClick={handleDeleteDialogOpen}
//                   title="Delete Group Chat"
//                 >
//                   <CircleDashed size={24} />
//                 </IconButton>
//               </Stack>
//             </Stack>
//           ))}
//         </Stack>
//       </Stack>

//       {/* Delete Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={handleDeleteDialogClose}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Delete Group Chat</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this group chat?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteDialogClose}>Cancel</Button>
//           <Button onClick={handleDeleteGroupChat} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default GroupChat;

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
import Icon from "../../assets/styles/profile.png";
import StyledBadge from "../Commun/StyledBadge";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneRoom, notSeenMessages } from "../../store/chat";
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
  const [identifier, setIdentifier] = useState("")



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
    // const filteredUsers = filteredChatRooms.filter(
    //   (e) => e.participants.length === 2
    // );
    // const filteredGroups = filteredChatRooms.filter(
    //   (e) => e.participants.length > 2
    // );
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


          let name = ''
          let user = chatRoom.participants.filter(p => p.userId !== authStore?.id)[0]
          if (chatRoom.name === null)
            name = chatRoom.participants.filter(p => p.userId !== authStore?.id)[0].user.fullNameEn
          else {
            name = chatRoom.name
          }
          return (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              key={i}
              onClick={() => {
                setSelectedUser(chatRoom)
                
                if (screen === 'md')
                setActiveComponent("conversation")
                navigate(`/chat/${chatRoom.id}`)

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
                  {chatRoom.messages[0].createdAt.slice(11, 16)}
                </Typography>
                {chatRoom?._count?.messages? <Badge color="primary" badgeContent={chatRoom?._count?.messages}></Badge> : chatRoom.messages[0].userId !== authStore.id ? (<Checks size={25} weight="thin" color="green" />) :

                  (
                    <Checks size={25} weight="light" color="blue" />

                  )}
                 
                {/* <Badge color="primary" badgeContent={chatRoom?._count?.messages}></Badge> */}
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
          <Typography variant="h5">Groups</Typography>
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
