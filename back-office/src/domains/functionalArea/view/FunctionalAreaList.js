import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFunctionalAreas,
  removeFunctionalArea,
  editFunctionalArea,
} from "../../../store/functionalArea";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Commun/buttons/AddButton";
import Modal from "../../../components/Commun/Modal";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

function FunctionalAreaList() {
  const [basicModal, setBasicModal] = useState(false);
  const functionalAreaStore = useSelector((state) => state.functionalArea);
  const [currentArea, setCurrentArea] = useState(null);

  useEffect(() => {
    setCurrentArea(null);
  }, [functionalAreaStore.id]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedfunctionalAreaId, setSelectedfunctionalAreaId] = useState("");
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const handleDeletefunctionalAreaClick = () => {
    dispatch(removeFunctionalArea(selectedfunctionalAreaId)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("functionalArea has been deleted");
       
      }
    });
  };
  const handleEditFunctionalArea = () => {
    if (currentArea) {
      dispatch(editFunctionalArea(currentArea))
        .then(() => {
          showSuccessToast("Area  updated successfully");
          dispatch(fetchFunctionalAreas());
          handleAreaDetailsClose();
        })
        .catch((error) => {
          showErrorToast(error.message);
        });
    }
  };
  useEffect(() => {
    dispatch(fetchFunctionalAreas());
  }, [dispatch]);
  console.log(functionalAreaStore, "functionalAreaStore");

  useEffect(() => {
    if (functionalAreaStore?.functionalAreas?.items && Array.isArray(functionalAreaStore.functionalAreas.items)) {
      let aux = functionalAreaStore?.functionalAreas?.items.map((e) => {
        return {
          id: e.id,
          nameAr: e.nameAr,
          nameEn: e.nameEn,
          createdAt: e.createdAt,
        };
      });
      setRows(aux);
    }
  }, [functionalAreaStore.functionalAreas.items]);

  const [areaDetailsOpen, setAreaDetailsOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  const handleViewAreaDetails = (area) => {
    setSelectedArea(area);
    setCurrentArea({ ...area });
    setAreaDetailsOpen(true);
  };

  const handleAreaDetailsClose = () => {
    setAreaDetailsOpen(false);
  };
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
      getActions: ({ id, nameAr, nameEn, createdAt }) => {
        return [
          <GridActionsCellItem
            icon={<AiOutlineEye />}
            label="view"
            className="textPrimary"
            onClick={() =>
              handleViewAreaDetails({ id, nameAr, nameEn, createdAt })
            }   
                     color="success"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShow();
              setSelectedfunctionalAreaId(id);
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
            {" "}
            Functional Area List
          </h2>
          <hr />
          <AddButton
            title={"Add level"}
            mb={20}
            onClick={() => navigate("addFuctionalArea")}
          />
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
            confirm={() => handleDeletefunctionalAreaClick()}
          />
             <Dialog open={areaDetailsOpen} onClose={handleAreaDetailsClose}>
            <DialogTitle>Area Details</DialogTitle>
            <DialogContent>
              {selectedArea && (
                <div>
                  <TextField
                    label="Name (Arabic)"
                    variant="outlined"
                    fullWidth
                    value={currentArea?.nameAr}
                    onChange={(e) =>
                      setCurrentArea({ ...currentArea, nameAr: e.target.value })
                    }
                    margin="normal"
                  />
                  <TextField
                    label="Name (English)"
                    variant="outlined"
                    fullWidth
                    value={currentArea?.nameEn}
                    onChange={(e) =>
                      setCurrentArea({ ...currentArea, nameEn: e.target.value })
                    }
                    margin="normal"
                  />
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAreaDetailsClose} color="primary">
                Close
              </Button>
              <Button onClick={handleEditFunctionalArea} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default FunctionalAreaList;
