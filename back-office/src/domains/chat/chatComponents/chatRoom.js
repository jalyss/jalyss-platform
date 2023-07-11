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
import { users } from "../../../constants/users";
import React, { useEffect, useState } from "react";
import Search from "../../../components/Commun/Search";
import SearchIconWrapper from "../../../components/Commun/SearchIconWrapper";
import StyledInputBase from "../../../components/Commun/inputs/SearchInputBase";
import Icon from "../../../assets/logo.jpg";
import StyledBadge from "../../../components/Commun/StyledBadge";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneRoom, notSeen } from "../.././../store/chatStore";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Modal from "../../../components/Commun/Modal";
import ModalEdit from "../../../components/Commun/Modal";
import { Add } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";
import { TbUsersPlus } from "react-icons/tb";
import { BiDotsVerticalRounded } from "react-icons/bi";

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
  const { notSeen } = chatStore || {};
  let number = notSeen;
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]); // Updated state for multiple members
  const [basicModalEdit, setBasicModalEdit] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredChatRoom, setHoveredChatRoom] = useState(null);
  const [isButtonVisible, setisButtonVisible] = useState(false);
  const handleMouseEnter = (chatRoomId) => {
    setHoveredChatRoom(chatRoomId);
  };

  const handleMouseLeave = () => {
    setHoveredChatRoom(null);
  };

  // const filteredChatRooms = chatRoomList.filter((chatRoom) => {
  //   let name = chatRoom.participants.filter(
  //     (p) => p.userId !== authStore?.id
  //   )[0].user.fullNameEn;
  //   return name.toLowerCase().includes(searchText.toLowerCase());
  // });
  const filteredChatRooms = [
    {
      id: "chatRoomId1",
      participants: [
        {
          userId: "userId1",
          user: {
            fullNameEn: "John Doe",
          },
        },
        {
          userId: "userId2",
          user: {
            fullNameEn: "Jane Smith",
          },
        },
      ],
      name: null,
      messages: [
        {
          text: "Hello there!",
          createdAt: "2023-07-09T09:30:00.000Z",
          userId: "userId2",
        },
      ],
      _count: {
        messages: 5,
      },
    },
  ];

  const handleMemberInputChange = (event) => {
    const { value } = event.target;

    const filtered = users.filter((user) =>
      user.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const handleMemberSelection = (name) => {
    setSelectedMembers((prevMembers) => [...prevMembers, name]);
    setFilteredMembers([]);
  };
  const handleRemoveMember = (name) => {
    setSelectedMembers((prevMembers) =>
      prevMembers.filter((member) => member !== name)
    );
  };

  const toggleShow = () => {
    setBasicModal(!basicModal);
  }
   const toggleShowEdit = () => {
    setBasicModalEdit(!basicModalEdit);
  };
  const renderMembers = () => {
    return (
      <>
        <input
          type="text"
          style={{ width: "168%", marginTop: "5px" }}
          placeholder={
            selectedMembers?.length > 1
              ? selectedMembers.join(" ")
              : "select members"
          } // Display selected members as a space-separated string
          onChange={handleMemberInputChange}
        />
        {filteredMembers.length > 0 && (
          <ul className="user-list">
            {filteredMembers.map((user) => (
              <li
                key={user.name}
                onClick={() => handleMemberSelection(user.name)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
        {selectedMembers.length > 0 && (
          <div>
            <ul>
              {selectedMembers.map((member) => (
                <li key={member}>
                  {member}
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemoveMember(member)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  };

  const ChatElement = () => {
    return (
      <>
        <Box
          sx={{
            width: "100%",
            height: 65,
            borderRadius: 1,
            backgroundColor: "#fff",
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
                direction="row"
                alignItems="center"
                onMouseEnter={() => handleMouseEnter(chatRoom.id)}
                onMouseLeave={handleMouseLeave}
                justifyContent="space-between"
                key={i}
              >
                <Stack
                  onClick={() => {
                    setSelectedUser(user);

                    if (screen === "md") setActiveComponent("conversation");
                    navigate(`/chat/${user?.userId}`);
                  }}
                  direction="row"
                  spacing={2}
                >
                  <StyledBadge
                    onClick={() => {
                      setSelectedUser(user);

                      if (screen === "md") setActiveComponent("conversation");
                      navigate(`/chat/${user?.userId}`);
                    }}
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar src={Icon} />
                  </StyledBadge>
                  <Stack>
                    <Typography variant="subtitle1">{name}</Typography>
                    <Typography variant="caption">
                      {chatRoom.messages[0].text}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack spacing={2} alignItems="center">
                  <Typography sx={{ fontWeight: 600 }} variant="caption">
                    {chatRoom.messages[0].createdAt.slice(11, 16)}
                  </Typography>
                  {chatRoom?._count?.messages ? (
                    <Badge
                      color="primary"
                      badgeContent={chatRoom?._count?.messages}
                    ></Badge>
                  ) : chatRoom.messages[0].userId !== authStore.id ? (
                    <Checks size={25} weight="thin" color="green" />
                  ) : (
                    <Checks size={25} weight="light" color="blue" />
                  )}

                  {/* <Badge color="primary" badgeContent={chatRoom?._count?.messages}></Badge> */}
                </Stack>
                {hoveredChatRoom === chatRoom.id ? (
                  <button
                    onClick={() => toggleShowEdit()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "30px",
                      height: "65.5px",
                      border: "none",
                      backgroundColor: "grey",
                      cursor: "pointer",
                      borderRadius: "0 10px 10px 0",
                      color:"white"
                    }}
                  >
                   <BiDotsVerticalRounded/>
                  </button>
                ) : null}
              </Stack>
            );
          })}
        </Box>
      </>
    );
  };

  return (
    <>
      <Modal
        toggleShow={toggleShow}
        basicModal={basicModal}
        setBasicEditModal={setBasicModal}
        titleEdit="Group Discussion"
        body={
          <>
            <label>
              <span>Name:</span>
              <input
                type="text"
                placeholder="name"
                style={{ width: "185%", marginTop: "5px" }}
              />
            </label>

            <label>
              <span>Members:</span>
              <>{renderMembers()}</>
            </label>

            <label>
              <span>Logo:</span>
              <div
                style={{
                  width: "160%",
                  height: "130px",
                  background: `url(https://fontawesome.com/social/cloud-arrow-down?f=&s=)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 5,
                  marginTop: "5px",
                }}
              >
                <input
                  type="file"
                  placeholder="Input 3"
                  style={{
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                />
              </div>
            </label>
          </>
        }
        normal={true}
        ofDelete={false}
        bodOfDelete={null}
      />
 <ModalEdit
        toggleShow={toggleShowEdit}
        basicModal={basicModalEdit}
        setBasicModal={setBasicModalEdit}
        title="Group Discussion (Edit)"
        body={
          <>
            <label>
              <span>Name:</span>
              <input
                type="text"
                placeholder="name"
                style={{ width: "185%", marginTop: "5px" }}
              />
            </label>

            <label>
              <span>Members:</span>
              <>{renderMembers()}</>
            </label>

            <label>
              <span>Logo:</span>
              <div
                style={{
                  width: "160%",
                  height: "130px",
                  background: `url(https://fontawesome.com/social/cloud-arrow-down?f=&s=)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 5,
                  marginTop: "5px",
                }}
              >
                <input
                  type="file"
                  placeholder="Input 3"
                  style={{
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                />
              </div>
            </label>
          </>
        }
        normal={true}
        ofDelete={false}
        bodOfDelete={null}
      />
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
            <button
              type="button"
              onClick={() => {
                toggleShow();
              }}
              className="create-button"
              style={{
                backgroundColor: "#57385c", // Example background color
                color: "#fff",
                border: "none",
                padding: "6px 8px",
                borderRadius: "100%",
                fontSize: "1rem",
              }}
            >
              <TbUsersPlus />
            </button>

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
    </>
  );
};

export default ChatRoom;
