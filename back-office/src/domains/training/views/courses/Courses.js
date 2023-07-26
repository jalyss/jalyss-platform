import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletcours, fetchcours } from "../../../../store/courses";
import { fetchsessions,} from "../../../../store/sessions";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Box } from "@mui/material";
import CreateButton from "../../../../components/Commun/buttons/CreateButton";
import Modal from "../../../../components/Commun/Modal";

const Courses = () => {
  const coursStore = useSelector((state) => state.courses.courses.items);
  const sessionStore = useSelector((state) => state.sessions);
  const { sessions } = sessionStore;
  const [rows, setRows] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [idOfDelete, setIdOfDelete] = useState("");
  const [contentOfDelete, setContentOfDelete] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const take = sessions?.count||10;
  const skip = 0;
  useEffect(() => {
    dispatch(fetchsessions({ take, skip }));
    dispatch(fetchcours());
  }, [dispatch,take]);

  console.log("sss", sessions);
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
          createdAt: e.createdAt.slice(0, 10),
        };
      });
      setRows(aux);
    }
  }, [coursStore]);

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
      <CreateButton title={"add new Lecture"} mt={20} mb={20} />
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
    </div>
  );
};

export default Courses;
