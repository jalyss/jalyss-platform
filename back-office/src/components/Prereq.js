import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Box } from "@mui/material";
import Modal from "../components/Commun/Modal";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import StyledInput from "./Commun/inputs/StyledInput";
import {
  deletePrerequire,
  editPrerequire,
  fetchPrerequires,
} from "../store/gain";

function Prereq() {
  const dispatch = useDispatch();
  const prereqStore = useSelector((state) => state.gain);
  const { prerequires } = prereqStore;
  const [rows, setRows] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [idOfDelete, setIdOfDelete] = useState("");
  const [content, setContent] = useState({});
  const [editRowId, setEditRowId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [contentOfDelete, setContentOfDelete] = useState("");

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });

  useEffect(() => {
    dispatch(fetchPrerequires());
  }, [dispatch]);

  useEffect(() => {
    if (editModal && editRowId) {
      const row = rows.find((row) => row.id === editRowId);
      if (row) {
        setContent({contentEn:row.contentEn,contentAr:row.contentAr});
      }
    }
  }, [editModal, editRowId, rows]);
console.log("cont",content);
  useEffect(() => {
    if (prerequires?.items?.length) {
      let aux = prerequires?.items.map((e) => {
        return {
          ...e,
          content: e.contentEn,
          createdAt: e.createdAt.slice(0, 10),
        };
      });
      setRows(aux);
    }
  }, [prerequires.items]);

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const toggleShow2 = () => {
    setEditModal(!editModal);
  };

  useEffect(() => {
    if (basicModal && idOfDelete) {
      const prereqToDelete = prerequires.items.find(
        (prereq) => prereq.id === idOfDelete
      );
      if (prereqToDelete) {
        setContentOfDelete(prereqToDelete.contentEn);
      }
    }
  }, [basicModal, idOfDelete, prerequires.items]);

  const handleDeletePrerequireClick = (id) => {
    dispatch(deletePrerequire(id))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Prerequire has been deleted");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });
  };

  const handleEdit = () => {
   
    dispatch(
      editPrerequire({
        id: editRowId,
        contentEn:content.contentEn,
        contentAr:content.contentAr,
      })
    )
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Prerequire has been updated");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });

    setEditRowId("");
    setContent("");
    toggleShow2();
  };

const handleChange=(e)=>{
  const {name,value}=e.target
  setContent((content)=>({...content , [name]:value}))
}
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
        <div className="mb-3">Prerequire's List</div>
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
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={rows.length}
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
            {` Prerequire?`}
          </div>
        }
        confirm={() => {
          handleDeletePrerequireClick(idOfDelete);
          setBasicModal(false);
        }}
      />

      <Modal
        basicModal={editModal}
        setBasicModal={setEditModal}
        toggleShow={toggleShow2}
        normal={true}
        title="Edit Prerequire"
        body={
          <div
            className="d-flex flex-column gap-3 justify-content-center align-items-center "
            style={{ marginRight: "50px" }}
          >
            <StyledInput
              value={content?.contentEn}
              label="ContentEn"
              name="contentEn"
              onChange={handleChange}
            />
              <StyledInput
              value={content?.contentAr}
              label="ContentAr"
              name="contentAr"
              onChange={handleChange}

            />
          </div>
        }
        fn={handleEdit}
      />
    </div>
  );
}

export default Prereq;
