import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEducationLevels,
  removeEducationLevel,
  createEducationLevel,
} from "../../../store/educationLevel";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Commun/Modal";
import { GridActionsCellItem } from "@mui/x-data-grid";

import {
 
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function EducationLevelList() {
  const educationLevelStore = useSelector((state) => state.educationLevel);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectededucationLevelId, setSelectededucationLevelId] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [isAddLevelModalOpen, setAddLevelModalOpen] = useState(false); // State for Add Level Modal

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const handleDeleteeducationLevelClick = () => {
    dispatch(removeEducationLevel(selectededucationLevelId)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("educationLevel has been deleted");
        toggleShow();
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameAr || !nameEn) {
      console.log("Please fill in all required fields");
      return;
    }

    var body = {
      nameAr,
      nameEn,
    };

    const submitCreate = async () => {
      let aux = { ...body };
      try {
        await dispatch(createEducationLevel(aux));
        showSuccessToast(" Education Level created successfully");
        setAddLevelModalOpen(false);
        setNameAr("");
        setNameEn("");
        dispatch(fetchEducationLevels());
      } catch (error) {
        console.log(error);
        showErrorToast(error.message);
      }
    };
    submitCreate();
  };

  useEffect(() => {
    dispatch(fetchEducationLevels());
  }, [dispatch]);

  useEffect(() => {
    if (educationLevelStore?.educationLevels?.items) {
      let aux = educationLevelStore?.educationLevels?.items.map((e) => {
        return {
          id: e.id,
          nameAr: e.nameAr,
          nameEn: e.nameEn,
          createdAt: e.createdAt,
        };
      });
      setRows(aux);
    }
  }, [educationLevelStore.educationLevels.items]);

  const columns = [
    {
      field: "nameAr",
      headerName: "nameAr",
      width: 155,
      editable: false,
    },
    { field: "nameEn", headerName: "nameEn", width: 155, editable: false },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 155,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 155,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiOutlineEye />}
            label="Add"
            className="textPrimary"
            onClick={() => navigate(`profileducationLevel/${id}`)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShow();
              setSelectededucationLevelId(id);
            }}
            color="error"
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <div>
        <div className="container">
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>
            Education Level List
          </h2>
          <hr />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddLevelModalOpen(true)} // Open the Add Level Modal
            style={{ marginBottom: 20 }}
          >
            Add level
          </Button>
          <Box sx={{ height: 400, width: "100%" }}>
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
          </Box>
          <Modal
            bodOfDelete="Are you sure you want to delete this level?"
            basicModal={basicModal}
            ofDelete={true}
            toggleShow={toggleShow}
            confirm={() => handleDeleteeducationLevelClick()}
          />
          {/* Add Level Modal */}
          <Modal
            open={isAddLevelModalOpen}
            onClose={() => setAddLevelModalOpen(false)} // Close the Add Level Modal
          >
            <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
              <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="d-flex flex-wrap">
                  <div className=" m-3">
                    <Grid item xs={12}>
                      <Typography variant="h4" align="center" gutterBottom>
                        Create education level
                      </Typography>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="nameEn"
                          variant="outlined"
                          fullWidth
                          value={nameEn}
                          onChange={(e) => setNameEn(e.target.value)}
                          required
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="nameAr"
                          variant="outlined"
                          fullWidth
                          value={nameAr}
                          onChange={(e) => setNameAr(e.target.value)}
                          required
                          margin="normal"
                        />
                      </Grid>
                      <div className="w-100 d-flex justify-content-center">
                        <Button type="submit" variant="contained" color="primary">
                          Save
                        </Button>
                      </div>
                    </Grid>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default EducationLevelList;
