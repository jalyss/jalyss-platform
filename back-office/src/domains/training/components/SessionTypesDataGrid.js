import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DataGrid,
  GridActionsCellItem,
  
} from "@mui/x-data-grid";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Box } from "@mui/material";
import Modal from "../../../components/Commun/Modal";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import StyledInput from "../../../components/Commun//inputs/StyledInput";
import { deleteSessionType, editSessionType, fetchsessionstypes } from "../../../store/sessiontypes";
import moment from "moment";
function SessionTypesDataGrid() {
  const dispatch = useDispatch();
  const typesStore = useSelector((state) => state.sessiontypes);
  const { types } = typesStore;
  const [rows, setRows] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [idOfDelete, setIdOfDelete] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editRowId, setEditRowId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [titleOfDelete, setTitleOfDelete] = useState("");
console.log("types",types);
 

  useEffect(() => {
    if (editModal && editRowId) {
      const row = rows.find((row) => row.id === editRowId);
      if (row) {
        setEditTitle(row.title);
      }
    }
   
  }, [editModal, editRowId, rows]);

  useEffect(() => {
    dispatch(fetchsessionstypes());
  }, [dispatch]);

  useEffect(() => {
    if (types?.items?.length) {
        

      let aux = types?.items.map((e) => {
        const formattedCreatAt = moment(e.createdAt).format("YYYY-MM-DD");

        return {
          ...e,
          title: e.title,
          createdAt:formattedCreatAt,
        };
      });
      setRows(aux);
    }
  }, [types?.items]);

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
        setTitleOfDelete(row.title);
      }
    }
  }, [basicModal, idOfDelete, rows]);

  const handleDeleteFeatureClick = (id) => {
    dispatch(deleteSessionType(id))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Type has been deleted");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });
  };

  const handleEdit = () => {
    const title = editTitle;
    dispatch(editSessionType({ id: editRowId, title: title }))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Type has been Updated");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });

    setEditRowId("");
    setEditTitle("");
    toggleShow2();
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
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
        <div className="mb-3">Type's List</div>
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
           
            {`Are you sure you want to delete `}
            <span style={{ color: "red" ,margin:"10px"}}>{titleOfDelete}</span>
            {` Type?`}
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
              value={editTitle}
              label="Title"
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            />
          </div>
        }
        fn={handleEdit}
      />
    </div>
  );
}

export default SessionTypesDataGrid;
