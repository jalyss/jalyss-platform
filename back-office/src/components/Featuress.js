import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFeatures, editFeature, fetchFeatures } from "../store/tarifss";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Commun/Modal";
import { showErrorToast, showSuccessToast } from "../utils/toast";

function Featuress() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [idOfDelete, setIdOfDelete] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const [editRowId, setEditRowId] = useState("");
  const [editInputVisible, setEditInputVisible] = useState(false);

  const navigate = useNavigate();
  const featuresStore = useSelector((state) => state.tarifss);
  const { features } = featuresStore;

  useEffect(() => {
    dispatch(fetchFeatures());
  }, []);

  useEffect(() => {
    if (features?.items.length) {
      let aux = features?.items.map((e) => {
        return {
          ...e,
          label: e.label,
          createdAt: e.createdAt.slice(0, 10),
        };
      });
      setRows(aux);
    }
  }, [features.items]);

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const handleDeleteFeatureClick = (id) => {
    dispatch(deleteFeatures(id))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Feature has been deleted");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });
  };

  const handleEditLabelClick = (rowId, currentLabel) => {
    setEditRowId(rowId);
    setEditLabel(currentLabel);
    setEditInputVisible(true);
  };

  const handleEditLabelChange = (e) => {
    setEditLabel(e.target.value);
  };
console.log("editlab",editLabel);
  const handleEditLabelSave = () => {
 const label=editLabel
    dispatch(editFeature({id:editRowId,label:label})).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Features has been Updated");
      }
    })
    .catch((error) => {
      showErrorToast(error.message);
    });
    // Clear the edit state
    setEditRowId("");
    setEditLabel("");
    setEditInputVisible(false);
  };

  const handleEditLabelKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEditLabelSave();
    }
  };

  const columns = [
   {
    field: "label",
    headerName: "Label",
    width: 330,
    editable: false,
    renderCell: (params) => {
      console.log(params,"params");
      if (params.row.id === editRowId && editInputVisible) {
        return (
          <input
            type="text"
            value={editLabel}
            onChange={handleEditLabelChange}
            onKeyPress={handleEditLabelKeyPress}
            autoFocus
          />
        );
      } else {
        return params.value;
      }
    },
  },,
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 330,
      sortable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 330,
      cellClassName: "actions",
      getActions: ({ id, label }) => {
        return [
          <GridActionsCellItem
            icon={<AiFillEdit />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={() => handleEditLabelClick(id, label)}
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            color="inherit"
            onClick={() => {
              toggleShow();
              setIdOfDelete(id);
            }}
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <div className="position-relative">
        <div className="mb-3">Feature's List</div>
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
      <Modal
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        toggleShow={toggleShow}
        ofDelete={true}
        bodOfDelete={
          <div className="d-flex justify-content-center align-items-center">
            Are you sure you want to delete this feature?
          </div>
        }
        confirm={() => {
          handleDeleteFeatureClick(idOfDelete);
          setBasicModal(false);
        }}
      />
    </div>
  );
}

export default Featuress;
