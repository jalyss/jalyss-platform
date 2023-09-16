import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEducationLevels,
  removeEducationLevel,
} from "../../../store/educationLevel";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Commun/buttons/AddButton";
import Modal from "../../../components/Commun/Modal";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";
function EducationLevelList() {
  const [basicModal, setBasicModal] = useState(false);
  const educationLevelStore = useSelector((state) => state.educationLevel);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectededucationLevelId, setSelectededucationLevelId] = useState("");
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

  useEffect(() => {
    dispatch(fetchEducationLevels());
  }, [dispatch]);
  console.log(educationLevelStore, "educationLevelStore");

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
        </div>
      </div>
    </div>
  );
}

export default EducationLevelList;
