import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit, AiOutlineEye } from "react-icons/ai";
import isEnglish from "../../../helpers/isEnglish";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { IoIosPersonAdd } from "react-icons/io";
import { findAllRooms, deleteChatRoom } from "../../../store/chatStore";
import DeleteModal from "../../../components/Commun/Modal";
import Select from "react-select";
import { BiDotsVerticalRounded } from "react-icons/bi";
import "../../../assets/styles/chatRoom.css";

function ChatList() {
  const dispatch = useDispatch();
  const isEng = isEnglish();
  const Navigate = useNavigate();

  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [basicModalDeleteid, setBasicModalDeleteid] = useState(false);
  const [open, setOpen] = useState(false);

  const AllchatRooms = useSelector((state) => state.chat.allChatRooms.items);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(findAllRooms());
  }, [dispatch]);

 

  const columns = [
    { field: "name", headerName: "Name", width: 150, editable: false },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate =
          date.toISOString().split("T")[0] +
          " At " +
          date.toISOString().split("T")[1].split(".")[0];
        return formattedDate;
      },
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate =
          date.toISOString().split("T")[0] +
          " At " +
          date.toISOString().split("T")[1].split(".")[0];
        return formattedDate;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiFillEdit />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,

          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShowDelete(id);
            }}
            color="error"
          />,
        ];
      },
    },
  ];

  const handleDeleteClick = (id) => {
    dispatch(deleteChatRoom(basicModalDeleteid)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Chat Room has been deleted");
        dispatch(findAllRooms());
        setBasicModalDelete(false);
      }
    });
  };

  const toggleShowDelete = (id) => {
    setBasicModalDeleteid(id);

    setBasicModalDelete(!basicModalDelete);
  };

  const handleEditClick = (id) => {
    Navigate(`edit/${id}`);
  };

  return (
    <div>
      <DeleteModal
        toggleShow={toggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={!true}
        ofDelete={true}
        bodOfDelete={
          <div className="d-flex justify-content-center align-items-center">
            You want to Delete this chat ?
          </div>
        }
        confirm={() => {
          handleDeleteClick();
        }}
      />
      <div>
        <div className="container">
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List Disscussion</h2>
          <hr></hr>
          <Button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              Navigate("create");
            }}
            variant="outlined"
          >
            <span className="btn btn-sm ">Add Chat</span>
          </Button>

          <Box height={300}>
            <DataGrid
              rows={AllchatRooms}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
