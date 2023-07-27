import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateNeswcours,
  deletcours,
  editcours,
  fetchcours,
} from "../../../../store/courses";

import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Box } from "@mui/material";
import CreateButton from "../../../../components/Commun/buttons/CreateButton";
import Modal from "../../../../components/Commun/Modal";
import StyledInput from "../../../../components/Commun/inputs/StyledInput";
import { Form } from "react-bootstrap";

const Courses = () => {
  const coursStore = useSelector((state) => state.courses.courses.items);
  const [rows, setRows] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [idOfDelete, setIdOfDelete] = useState("");
  const [contentOfDelete, setContentOfDelete] = useState("");
  const [addcours,setAddcours] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [editRowId, setEditRowId] = useState("");
  const [editedTitle, setEditedTitle] = useState(false);
  const [editedContent, setEditedContent] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchcours());
  }, [dispatch]);

  useEffect(() => {
    if (basicModal && idOfDelete) {
      const courseToDelete = coursStore.find(
        (course) => course.id === idOfDelete
      );
      if (courseToDelete) {
        setContentOfDelete(courseToDelete.title);
      }
    }
  }, [basicModal, idOfDelete, coursStore]);

  useEffect(() => {
    if (coursStore.length) {
      let aux = coursStore.map((e) => {
        return {
          ...e,
          title: e.title,
          content: e.content,
          createdAt: e.createdAt.slice(0, 10),
        };
      });
      setRows(aux);
    }
  }, [coursStore]);

  useEffect(() => {
  
    if (editModal && editRowId) {
      const row = rows.find((row) => row.id === editRowId);
      if (row) {
        setEditedTitle(row.title);
        setEditedContent(row.content);

      }
    }
  }, [editModal, editRowId, rows]);
  const handleAddcoursChange = (e) => {
    const { name, value } = e.target;
    console.log(addcours);

    setAddcours((addcours) => ({
      ...addcours,
      [name]: value,
    }));
  };
  const Addcours = async (event) => {
    event.preventDefault();

    dispatch(CreateNeswcours(addcours)).then((res) => {
      if (!res.error) {
        showSuccessToast("cours.created");
        setAddcours({});
        toggleShowOfCreate();
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };

  const handleDeletecoursClick = (id) => {
    dispatch(deletcours(id)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("COURS has been deleted");
      }
    });
  };
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };
  const toggleShowOfCreate = () => {
    setCreateModal(!createModal);
  };
  const handleEdit = () => {
   let body={
    title:editedTitle,
    content:editedContent
   }
    dispatch(editcours({ id: editRowId, body}))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Lecture has been Updated");
          setEditedContent("")
          setEditedTitle("")
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });

    setEditRowId("");
 
    setEditModal(!editModal)
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 230,
      editable: false,
    },
    {
      field: "content",
      headerName: "Content",
      width: 230,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 230,
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
              setEditRowId(id);
              setEditModal(true)
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
    <div className="mx-5">
      <CreateButton
        title={"add new Lecture"}
        mt={20}
        mb={20}
        onClick={toggleShowOfCreate}
      />
      <div className="mb-3">Lectures's List</div>
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
            {`course ?`}
          </div>
        }
        confirm={() => {
          handleDeletecoursClick(idOfDelete);
          setBasicModal(false);
        }}
      />
      <Modal
        toggleShow={toggleShowOfCreate}
        basicModal={createModal}
        setBasicModal={setCreateModal}
        normal={true}
        title="Add new lecture"
        body={
          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <StyledInput
              value={addcours.title || ""}
              onChange={handleAddcoursChange}
              label="Title"
              name="title"
            />

            <StyledInput
              value={addcours.content || ""}
              onChange={handleAddcoursChange}
              label="Content"
              name="content"
            />
          </div>
        }
        fn={Addcours}
      />
        <Modal
        basicModal={editModal}
        setBasicModal={setEditModal}
        toggleShow={()=>{setEditModal(!editModal)}}
        normal={true}
        title="Edit Lecture"
        body={
          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <StyledInput
              value={editedTitle}
              onChange={(e)=>{setEditedTitle(e.target.value)}}
              label="Title"
             
            />

            <StyledInput
                value={editedContent}
              onChange={(e)=>{setEditedContent(e.target.value)}}
              label="Content"
             
            />
          </div>
        }
        fn={handleEdit}
      />
    </div>
  );
};

export default Courses;
