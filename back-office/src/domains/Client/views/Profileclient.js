import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditModal from "../../../components/Commun/Modal";

import {
  Box,
  Button,
  CardContent,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { editClient, fetchClient } from "../../../store/client";

import EditIcon from "@mui/icons-material/Edit";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { Dialog, DialogContent } from "@mui/material";


const profileclient = () => {
  const client = useSelector((state) => state.client?.client);
  const clientStore = useSelector((state) => state.client?.client);
  const clientCommands = useSelector(
    (state) => state.client?.client?.clientCommands[0]?.commandLine
  );

  const [editClientData, setEditClientData] = useState(null);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [renderEditView, setRenderEditView] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  

  useEffect(() => {
    dispatch(fetchClient(id));
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
  console.log(id, "clientId");
  console.log(client, "heeeeeedha");
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

      const editedClient = { ...body, id };
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
 
  useEffect(() => {
    let aux = clientCommands?.map((e, i) => {
      return {
        id: e?.id || i,
        ...e,
      };
    });
    setRows(aux);
  }, [clientCommands]);
  console.log(clientCommands,"clientCommands");
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleClick = (cover) => {
    setSelectedAvatar(cover);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      field: "cover",
      headerName: "cover",
      width: 120,
      editable: false,
      renderCell: (params) => (
        <>
          <img
            src={params?.rows?.articleByBranch?.article?.cover}
            alt="cover"
            style={{
              width: "60%",
              borderRadius: "40px",
              height: "110%",
              cursor: "pointer",
            }}
            onClick={() => handleClick(params?.rows?.articleByBranch?.article?.cover)}
          />
          <Dialog
            open={open}
            onClose={handleClose}
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
      field: "title",
      headerName: "title",
      width: 155,
      editable: false,
      valueGetter: (params) => params?.rows?.articleByBranch?.article?.title,
    },
    {
      field: "Price",
      headerName: "Price",
      width: 155,
      editable: false,
      valueGetter: (params) => params?.rows?.articleByBranch?.price,
    },
    {
      field: "quantity",
      headerName: "quantity",
      width: 155,
      editable: false,
      valueGetter: (params) => params?.rows?.quantity,
    },
    {
      field: "code",
      headerName: "code",
      width: 155,
      editable: false,
      valueGetter: (params) => params?.rows?.articleByBranch?.article?.code,
    },
  ];
  console.log(rows,"aaaaaaa")
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
        <div className="table-container">
          {[
            { label: "full name (En)", value: client?.fullNameEn },
            { label: "full name (Ar)", value: client?.fullNameAr },
            { label: "Email", value: client?.email },
            { label: "Adresse", value: client?.address },
            { label: "Telephone Number", value: client?.tel },
            { label: "Account Balance", value: client?.accountBalance },
            { label: "is Coach", value: client?.isCoach ? "Yes" : "No" },
            { label: "city", value: client?.city?.nameEn },
            { label: "country", value: client?.country?.nameEn },
            { label: "Functional Area", value: client?.functionalArea?.nameEn },
            { label: "Job Title", value: client?.jobTitle?.nameEn },
            {
              label: "Education Level",
              value: client?.educationLevel?.nameEn || "No education level yet",
            },
          ].map((item, index) => (
            <Typography
              key={index}
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
                {item.label}:
              </span>
              <span style={{ display: "table-cell" }}>{item.value}</span>
            </Typography>
          ))}
        </div>
      ) :  (
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
          <TextField
            label="Is Coach"
            value={editClientData?.isCoach || ""}
            onChange={(e) => {
              setEditClientData({
                ...editClientData,
                isCoach: e.target.value === "true", // Convert the value to a boolean
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
            label="City"
            value={editClientData?.city.nameEn || ""}
            onChange={(e) => {
              setEditClientData({
                ...editClientData,
                city: +e.target.value,
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
            label="Country"
            value={editClientData?.country.nameEn || ""}
            onChange={(e) => {
              setEditClientData({
                ...editClientData,
                country: +e.target.value,
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
            label="Functional Area"
            value={editClientData?.functionalArea.nameEn || ""}
            onChange={(e) => {
              setEditClientData({
                ...editClientData,
                functionalArea: +e.target.value,
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
            label="Job Title"
            value={editClientData?.jobTitle.nameEn  || ""}
            onChange={(e) => {
              setEditClientData({
                ...editClientData,
                jobTitle: +e.target.value,
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
            label="Education Level"
            value={editClientData?.educationLevel?.nameEn || ""}
            onChange={(e) => {
              setEditClientData({
                ...editClientData,
                educationLevel: +e.target.value,
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
      <div className="position-relative" style={{ height: "55%", width: "80%" }}>
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


      {/* <Box sx={{ height: 400, width: "100%" }}>
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
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Box> */}
     
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
