import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFunctionalAreas,
  removeFunctionalArea,
} from "../../../store/functionalArea";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Commun/buttons/AddButton";
import Modal from "../../../components/Commun/Modal";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";
function FunctionalAreaList() {
  const [basicModal, setBasicModal] = useState(false);
  const functionalAreaStore = useSelector((state) => state.functionalArea);
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
        toggleShow();
      }
    });
  };

  useEffect(() => {
    dispatch(fetchFunctionalAreas());
  }, [dispatch]);
  console.log(functionalAreaStore, "functionalAreaStore");

  useEffect(() => {
    if (functionalAreaStore?.functionalAreas?.items) {
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
            onClick={() => navigate(`profilfunctionalArea/${id}`)}
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
        </div>
      </div>
    </div>
  );
}

export default FunctionalAreaList;
