import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEducationLevels,
  removeEducationLevel,
  fetchEducationLevel,
  editEducationLevel,
} from "../../../store/educationLevel";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Commun/buttons/AddButton";
import Modal from "../../../components/Commun/Modal";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";


import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";
function EducationLevelList() {
  const [basicModal, setBasicModal] = useState(false);
  const educationLevelStore = useSelector((state) => state.educationLevel);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedEducationLevelId, setSelectededucationLevelId] = useState("");
  const [educationLevelOpen, setEducationLevelOpen] = useState(false);
  // const [educationLevel, setEducationLevel] = useState({
  //   nameAr: "",
  //   nameEn: "",
  // });

  const [nameAr,setNameAr]=useState("")
  const [nameEn, setNameEn] = useState("")
// const id = selectedEducationLevelId
const level =useSelector((state)=>educationLevelStore?.educationLevels?.items);
  const educationLevelDetailsOpen = () => {
    setEducationLevelOpen(true);
  };

  const educationLevelDetailsClose = () => {
    setEducationLevelOpen(false);
  };
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const handleEditEducationLevel = (e) => {
    e.preventDefault(e);
    const UpdatedEducationLevel={
      nameAr,
      nameEn,
    };
const id = selectedEducationLevelId;

    if (level) {
      dispatch(editEducationLevel({id,...UpdatedEducationLevel}))
        .then(() => {
          showSuccessToast("Education level updated successfully");
          dispatch(fetchEducationLevels());
          educationLevelDetailsClose();
        })
        .catch((error) => {
          showErrorToast(error.message);
        });
    }
  };

  useEffect(() => {
    if(level){
      setNameAr(level.nameAr);
      setNameEn(level.nameEn);
    }else {
      dispatch(fetchEducationLevel(selectedEducationLevelId));
    }
  },[dispatch,selectedEducationLevelId,level]);

  const handleDeleteeducationLevelClick = () => {
    dispatch(removeEducationLevel(selectedEducationLevelId)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("educationLevel has been deleted");
        toggleShow();
      }
    });
  };

  useEffect(() => {
    dispatch(fetchEducationLevels());
    dispatch(fetchEducationLevel(selectedEducationLevelId));
    dispatch(editEducationLevel(selectedEducationLevelId));
  }, [dispatch,selectedEducationLevelId]);
  console.log(educationLevelStore, "educationLevelStore");




  useEffect(() => {
    if (educationLevelStore?.educationLevels?.items && Array.isArray(educationLevelStore.educationLevels.items)) {
      let aux = educationLevelStore.educationLevels.items.map((e) => {
        return {
          id: e.id,
          nameAr: e.nameAr,
          nameEn: e.nameEn,
          createdAt: e.createdAt,
        };
      });
      setRows(aux);
    }
  }, [educationLevelStore?.educationLevels?.items]);

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
            onClick={() => {setSelectededucationLevelId(id);
                            educationLevelDetailsOpen();
                            console.log(setSelectededucationLevelId)
            }}
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
          <AddButton
            title={"Add level"}
            mb={20}
            onClick={() => navigate("addLevel")}
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
            confirm={() => handleDeleteeducationLevelClick()}
          />
                    <Modal
            bodOfDelete="Are you sure you want to delete this level?"
            basicModal={basicModal}
            ofDelete={true}
            toggleShow={toggleShow}
            confirm={() => handleDeleteeducationLevelClick()}
          />
          <Dialog open={educationLevelOpen} onClose={educationLevelDetailsClose}>
        <DialogTitle>Job Details</DialogTitle>
        <DialogContent>
          {selectedEducationLevelId && (
            <div>

              <TextField
        label="Name (Arabic)"
        variant="outlined"
        fullWidth
      

        value={educationLevelStore?.educationLevels?.items.nameAr }
        onChange={(e) =>
          setNameAr(e.target.value )
        }
        margin="normal"
      />

              <TextField
        label="Name (English)"
        variant="outlined"
       
        fullWidth
        value={educationLevelStore?.educationLevels?.items.nameEn }
        onChange={(e) =>
          setNameEn(e.target.value )
        }
        margin="normal"
      />
              <p>Created At: {educationLevelStore?.educationLevels?.items.createdAt}</p>
            </div>
          )}


        </DialogContent>
        <DialogActions>
          <Button onClick={educationLevelDetailsClose} color="primary">
            Close
          </Button>
          <Button onClick={handleEditEducationLevel} color="primary">
                Save
              </Button>
        </DialogActions>
      </Dialog>
        </div>
      </div>
    </div>
  );
}

export default EducationLevelList;

