import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditModal from "../../../components/Commun/Modal";

import {
  Box,
  Button,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { editClient, fetchClient } from "../../../store/client";
import { fetchCommand } from "../../../store/command";
import EditIcon from "@mui/icons-material/Edit";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

const profileclient = () => {
  const client = useSelector((state) => state.client);
  const commandStore = useSelector((state) => state.command);

  const [editClientData, setEditClientData] = useState(null);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [renderEditView, setRenderEditView] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState([]);

  useEffect(() => {
    dispatch(fetchClient(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(fetchCommand(id));
  }, [dispatch, id]);

  useEffect(() => {
    setEditClientData({ ...client });
  }, [client]);

  const toggleView = () => {
    setRenderEditView(!renderEditView);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  console.log(id, "aaaaaaaaaaaa");

  const handleSubmit = async () => {
    const body = {
      ...editClientData,
    };
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );
        body.logoId = response.data.id;
      }
      delete body.logo;
      delete body.Mediaclient;

      const editedClient = { ...body, clientId };
      dispatch(editClient(editedClient));
      showSuccessToast("client edited successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error editing client:", error);
      showErrorToast(error.message);
    }
  };
  const toggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
  };
  const onCanceltoggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
    setRenderEditView(false);
  };
  const mapClientItems = (items) => {
    return items.map((e) => ({
      id: e.id,
      educationLevel: e.educationLevel,
      functionalArea: e.functionalArea,
      jobTitle: e.jobTitle,
      country: e.country,
      city: e.city,
      isCoach: e.isCoach,
    }));
  };

  const mapCommandItems = (items) => {
    return items.map((e) => ({
      id: e.id,
      city: e.city,
      confirm: e.confirm,
      delivered: e.delivered,
      paid: e.paid,
      hasDelivery: e.hasDelivery,
      branchId: e.branchId,
    }));
  };

  useEffect(() => {
    if (client?.clients?.items) {
      setRows(mapClientItems(client.clients.items));
    }
  }, [client.clients.items]);
  const columns = [
    {
      field: "educationLevel",
      headerName: "educationLevel",
      width: 155,
      editable: false,
    },

    { field: "functionalArea", headerName: "functionalArea", width: 155, editable: false },
    { field: "jobTitle", headerName: "jobTitle", width: 155, editable: false },
    { field: "country", headerName: "country", width: 155, editable: false },
    {
      field: "city",
      headerName: "city",
      width: 155,
      editable: false,
    },
    {
      field: "isCoach",
      headerName: "isCoach",
      width: 155,
      editable: false,
    },
  ];
  useEffect(() => {
    if (commandStore?.commands?.items) {
      setRow(mapCommandItems(commandStore.commands.items));
    }
  }, [commandStore?.commands.items]);
  const column = [
    {
      field: "city",
      headerName: "city",
      width: 155,
      editable: false,
    },

    { field: "confirm", headerName: "confirm", width: 155, editable: false },
    { field: "delivered", headerName: "delivered", width: 155, editable: false },
    { field: "paid", headerName: "paid", width: 155, editable: false },
    {
      field: "hasDelivery",
      headerName: "hasDelivery",
      width: 155,
      editable: false,
    },
    {
      field: "branchId",
      headerName: "branchId",
      width: 155,
      editable: false,
    },
  ];
  return (
    <Box sx={{ maxWidth: "90%", height: "100%", margin: "auto" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            height: "100%",
          }}
        >
          <Box sx={{ flexBasis: "45%", my: 3, ml: 5 }}>
            {!renderEditView ? (
              <>
                <div className="table-container">
                  <Typography
                    style={{
                      fontFamily: "Arial",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "table-row",
                    }}
                  >
                    <span
                      style={{
                        display: "table-cell",
                        fontSize: "large",
                        paddingRight: "40px",
                      }}
                    >
                      full name (English):
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {client?.fullNameEn}
                    </span>
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Arial",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "table-row",
                    }}
                  >
                    <span
                      style={{
                        display: "table-cell",
                        fontSize: "large",
                        paddingRight: "40px",
                      }}
                    >
                      full name (Arab):
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {client?.fullNameAr}
                    </span>
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Arial",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "table-row",
                    }}
                  >
                    <span
                      style={{
                        display: "table-cell",
                        fontSize: "large",
                        paddingRight: "40px",
                      }}
                    >
                      Email:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {client?.email}
                    </span>
                  </Typography>

                  <Typography
                    style={{
                      fontFamily: "Arial",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "table-row",
                    }}
                  >
                    <span
                      style={{
                        display: "table-cell",
                        fontSize: "large",
                        paddingRight: "40px",
                      }}
                    >
                      Adresse:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {client?.address}
                    </span>
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Arial",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "table-row",
                    }}
                  >
                    <span
                      style={{
                        display: "table-cell",
                        fontSize: "large",
                        paddingRight: "40px",
                      }}
                    >
                      Telephone Number:
                    </span>
                    <span style={{ display: "table-cell" }}>{client?.tel}</span>
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "Arial",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      display: "table-row",
                    }}
                  >
                    <span
                      style={{
                        display: "table-cell",
                        fontSize: "large",
                        paddingRight: "40px",
                      }}
                    >
                      Account Balance:
                    </span>
                    <span style={{ display: "table-cell" }}>
                      {client?.accountBalance}
                    </span>
                  </Typography>
                </div>
              </>
            ) : (
              <>
                <TextField
                  label="Name"
                  value={editClientData?.fullNameEn || ""}
                  onChange={(e) => {
                    setEditClientData({
                      ...editClientData,
                      name: e.target.value,
                    });
                  }}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    style: {
                      color: "#4b0082",
                    },
                  }}
                  sx={{
                    color: "#8a2be2",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                  }}
                />
                <TextField
                  label="Name"
                  value={editClientData?.fullNameAr || ""}
                  onChange={(e) => {
                    setEditClientData({
                      ...editClientData,
                      name: e.target.value,
                    });
                  }}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    style: {
                      color: "#4b0082",
                    },
                  }}
                  sx={{
                    color: "#8a2be2",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                  }}
                />
                <TextField
                  label="Email"
                  value={editClientData?.email || ""}
                  onChange={(e) => {
                    setEditClientData({
                      ...editClientData,
                      email: e.target.value,
                    });
                  }}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    style: {
                      color: "#4b0082",
                    },
                  }}
                  sx={{
                    color: "#8a2be2",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                  }}
                />

                <TextField
                  label="Adresse"
                  value={editClientData?.address || ""}
                  onChange={(e) => {
                    setEditClientData({
                      ...editClientData,
                      address: e.target.value,
                    });
                  }}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    style: {
                      color: "#4b0082",
                    },
                  }}
                  sx={{
                    color: "#8a2be2",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                  }}
                />
                <TextField
                  label="Telephone Number"
                  value={editClientData?.tel || ""}
                  onChange={(e) => {
                    setEditClientData({
                      ...editClientData,
                      tel: e.target.value,
                    });
                  }}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    style: {
                      color: "#4b0082",
                    },
                  }}
                  sx={{
                    color: "#8a2be2",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                  }}
                />
                <TextField
                  label="Account Balance"
                  value={editClientData?.accountBalance || ""}
                  onChange={(e) => {
                    setEditClientData({
                      ...editClientData,
                      accountBalance: +e.target.value,
                    });
                  }}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    style: {
                      color: "#4b0082",
                    },
                  }}
                  sx={{
                    color: "#8a2be2",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                    "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#8a2be2",
                      },
                  }}
                />
              </>
            )}
          </Box>
          <Box
            sx={{
              flexBasis: "45%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              mr: 5,
            }}
          >
            <div
              className="position-relative"
              style={{ height: "55%", width: "80%" }}
            >
              <img
                className="img-fluid mt-1"
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : editClientData?.avatar?.path ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU"
                }
                alt="Card image cap"
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "8px",
                  filter: "blur(0.5px)",
                }}
              />
              <div className="position-absolute top-50 start-50 translate-middle">
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />

                {renderEditView && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "62%",
                      transform: "translate(-50%, -50%)",
                      color: "#8a2be2",
                      backgroundColor: "#fff",
                      border: "1px solid #8a2be2",
                      "&:hover": {
                        backgroundColor: "#8a2be2",
                        color: "#fff",
                      },
                    }}
                    onClick={handleButtonClick}
                  >
                    <EditIcon fontSize="large" />
                  </IconButton>
                )}
              </div>
            </div>
          </Box>
        </Box>
      </CardContent>
    
        <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 2,
                  },
                },
              }}
              pageSizeOptions={[2]}
              disableRowSelectionOnClick
            />
          </Box>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={row}
              columns={column}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
          </Box>
          <Box display="flex" justifyContent="center" mt={9}>
        {renderEditView ? (
          <Button
            onClick={() => {
              toggleShowDelete();
            }}
            variant="contained"
            color="primary"
          >
            Save Client
          </Button>
        ) : (
          <Button
            onClick={() => {
              toggleView();
            }}
            variant="contained"
            color="primary"
          >
            Update Client
          </Button>
        )}
      </Box>
      <EditModal
        toggleShow={onCanceltoggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={true}
        ofDelete={!true}
        title={
          <div
            style={{ width: "200%", marginLeft: "100%" }}
            className="d-flex justify-content-center text-align-center"
          >
            Are you sure !
          </div>
        }
        body={
          <div className="d-flex justify-content-center align-items-center">
            You want to edit this client ?
          </div>
        }
        fn={() => {
          handleSubmit();
        }}
      />
    </Box>
  );
};

export default profileclient;
