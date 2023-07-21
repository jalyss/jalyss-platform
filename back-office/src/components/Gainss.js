import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Box } from "@mui/material";
import Modal from "../components/Commun/Modal";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import StyledInput from "./Commun/inputs/StyledInput";
import { deleteGain, editGain, fetchGains } from "../store/gain";

function Gainss() {
  const dispatch = useDispatch();
  const gainsStore = useSelector((state) => state.gain);
  const { gains } = gainsStore;
  const [rows, setRows] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [idOfDelete, setIdOfDelete] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editRowId, setEditRowId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [contentOfDelete, setContentOfDelete] = useState("");

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });
  const [rowCount, setRowCount] = React.useState(0);
  React.useEffect(() => {
    setRowCount(gains.items?.length);
  }, [rowCount]);

  useEffect(() => {
    dispatch(fetchGains());
  }, [dispatch]);

  useEffect(() => {
    if (editModal && editRowId) {
      const row = rows.find((row) => row.id === editRowId);
      if (row) {
        setEditContent(row.content);
      }
    }
  }, [editModal, editRowId, rows]);

  useEffect(() => {
    if (gains?.items?.length) {
      let aux = gains?.items.map((e) => {
        return {
          ...e,
          content: e.content,
          createdAt: e.createdAt.slice(0, 10),
        };
      });
      setRows(aux);
    }
  }, [gains.items]);

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };
  const toggleShow2 = () => {
    setEditModal(!editModal);
  };
  useEffect(() => {
    if (basicModal && idOfDelete) {
      const gainToDelete = gains.items.find((gain) => gain.id === idOfDelete);
      if (gainToDelete) {
        setContentOfDelete(gainToDelete.content);
      }
    }
  }, [basicModal, idOfDelete, gains.items]);

  const handleDeleteGainClick = (id) => {
    dispatch(deleteGain(id))
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
    const content = editContent;
    dispatch(editGain({ id: editRowId, content: content }))
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
    setEditContent("");
    toggleShow2();
  };

  const columns = [
    {
      field: "content",
      headerName: "Content",
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
        <div className="mb-3">Gain's List</div>
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
            <span style={{ color: "red", margin: "10px" }}>
              {contentOfDelete}
            </span>
            {` Feature?`}
          </div>
        }
        confirm={() => {
          handleDeleteGainClick(idOfDelete);
          setBasicModal(false);
        }}
      />

      <Modal
        basicModal={editModal}
        setBasicModal={setEditModal}
        toggleShow={toggleShow2}
        normal={true}
        title="Edit Gain"
        body={
          <div
            className="d-flex justify-content-center align-items-center "
            style={{ marginRight: "50px" }}
          >
            <StyledInput
              value={editContent}
              label="Content"
              onChange={(e) => {
                setEditContent(e.target.value);
              }}
            />
          </div>
        }
        fn={handleEdit}
      />
    </div>
  );
}

export default Gainss;
