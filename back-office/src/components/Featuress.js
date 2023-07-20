import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFeatures, editFeature, fetchFeatures } from "../store/tarifss";
import {
  DataGrid,
  GridActionsCellItem,
  
} from "@mui/x-data-grid";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Box } from "@mui/material";
import Modal from "../components/Commun/Modal";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import StyledInput from "./Commun/inputs/StyledInput";

function Featuress() {
  const dispatch = useDispatch();
  const featuresStore = useSelector((state) => state.tarifss);
  const { features } = featuresStore;
  const [rows, setRows] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [idOfDelete, setIdOfDelete] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const [editRowId, setEditRowId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [labelOfDelete, setLabelOfDelete] = useState("");

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });
  const [rowCount, setRowCount] = React.useState(0);
  React.useEffect(() => {
    setRowCount(features.items?.length);
  }, [rowCount]);

  useEffect(() => {
    if (editModal && editRowId) {
      const row = rows.find((row) => row.id === editRowId);
      if (row) {
        setEditLabel(row.label);
      }
    }
    if (basicModal && editRowId) {
      const row = rows.find((row) => row.id === editRowId);
      if (row) {
        setEditLabel(row.label);
      }
    }
  }, [editModal, editRowId, rows]);

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
  const toggleShow2 = () => {
    setEditModal(!editModal);
  };
  useEffect(() => {
    if (basicModal && idOfDelete) {
      const row = rows.find((row) => row.id === idOfDelete);
      if (row) {
        setLabelOfDelete(row.label);
      }
    }
  }, [basicModal, idOfDelete, rows]);

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

  const handleEdit = () => {
    const label = editLabel;
    dispatch(editFeature({ id: editRowId, label: label }))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Features has been Updated");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });

    setEditRowId("");
    setEditLabel("");
    toggleShow2();
  };

  const columns = [
    {
      field: "label",
      headerName: "Label",
      width: 330,
      editable: false,
    },
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
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiFillEdit style={{ color: "blue" }} />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={() => {
              toggleShow2();
              setEditRowId(id);
            }}
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            color="error"
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
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={rowCount}
            paginationMode="server"
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
           
            {`Are you sure you want to delete `}
            <span style={{ color: "red" ,margin:"10px"}}>{labelOfDelete}</span>
            {` Feature?`}
          </div>
        }
        confirm={() => {
          handleDeleteFeatureClick(idOfDelete);
          setBasicModal(false);
        }}
      />

      <Modal
        basicModal={editModal}
        setBasicModal={setEditModal}
        toggleShow={toggleShow2}
        normal={true}
        title="Edit feature"
        body={
          <div
            className="d-flex justify-content-center align-items-center "
            style={{ marginRight: "50px" }}
          >
            <StyledInput
              value={editLabel}
              label="Label"
              onChange={(e) => {
                setEditLabel(e.target.value);
              }}
            />
          </div>
        }
        fn={handleEdit}
      />
    </div>
  );
}

export default Featuress;
