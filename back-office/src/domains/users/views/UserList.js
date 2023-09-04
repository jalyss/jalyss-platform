import React, { useEffect, useState } from "react";
import { Box, Button} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { fetchUsers, removeUser } from "../../../store/user";
import { useDispatch, useSelector } from "react-redux";
import isEnglish from "../../../helpers/isEnglish";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { IoIosPersonAdd } from "react-icons/io";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import Modal from "react-bootstrap/Modal";
import { Dialog, DialogContent } from "@mui/material";

function UserList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleClick = (avatar) => {
    setSelectedAvatar(avatar);
    setOpen(true);
  };

  const handleClosee = () => {
    setOpen(false);
  };
  const columns = [
    {
      field: "avatar",
      headerName: "avatar",
      width: 120,
      editable: false,
      renderCell: (params) => (
        <>
          <img
             src={params.row.avatar?.path}
            alt="avatar"
            style={{
              width: "60%",
              borderRadius: "40px",
              height: "110%",
              cursor: "pointer",
            }}
            onClick={() => handleClick(params.row.avatar?.path)}
          />
          <Dialog
            open={open}
            onClose={handleClosee}
            style={{ borderRadius: "50px" }}
          >
            <DialogContent>
              <img
                src={selectedAvatar}
                alt="avatar"
                style={{ width: "100%", borderRadius: "40px" }}
              />
            </DialogContent>
          </Dialog>
        </>
      ),
    },

    {
      field: "fullName",
      headerName: "Full name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email ",
      width: 150,
      sortable: false,
      description: "This column has a value getter and is not sortable.",
    },

    {
      field: "isActive",
      headerName: "isActive ",
      width: 100,
      sortable: false,
    },
    {
      field: "isClient",
      headerName: "isClient",
      width: 100,
    },

    {
      field: "isCoach",
      headerName: "isCoach",
      width: 100,
      editable: true,
      sortable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",

      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiOutlineEye />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              setElementId(id), handleShow();
            }}
            color="error"
          />,
        ];
      },
    },
  ];

  const userStore = useSelector((state) => state.user);
  const userStores = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const isEng = isEnglish();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  console.log(userStores, "userStore");
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  useEffect(() => {
    if (userStore.users.items.length) {
      let aux = userStore.users.items.map((e) => {
        return {
          ...e,
          fullName: isEng ? e.fullNameEn : e.fullNameAr,
          Avatar: e.avatar,
          isClient: e.isClient,
          isCoach: e.isCoach,
          isActive: e.isActive,
        };
      });

      console.log("users", aux);
      setRows(aux);
    }
  }, [userStore.users.items]);

  const handleDeleteClick = (id) => {
    dispatch(removeUser(id)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("User has been deleted");
      }
    });
  };

  const handleEditClick = (id) => {
    console.log(id);
    navigate(`edit/${id}`);
  };

  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleDeleteClick(elementId), handleClose();
              }}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div className="top-0 start-0" style={{ marginLeft: 800 }}>
        <Button
          type="button"
          onClick={() => navigate("create")}
          variant="outlined"
          endIcon={<IoIosPersonAdd />}
        >
          <span className="btn btn-sm ">Add user</span>
        </Button>
      </div>
      <div className="position-relative">
        <h1 style={{ paddingLeft: 10, paddingTop: 10 }}>User List</h1>

        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}
export default UserList;
