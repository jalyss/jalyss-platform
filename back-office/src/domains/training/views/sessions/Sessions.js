import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { deletsessions, fetchsessions } from "../../../../store/sessions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";

import CreateButton from "../../../../components/Commun/buttons/CreateButton";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import Modal from "../../../../components/Commun/Modal"
function Sessions() {
  const sessionStore = useSelector(
    (state) => state.sessions?.sessions?.items || []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [skip, setSkip] = useState(0);
  const [rows, setRows] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [idOfDelete,setIdOfDelete]=useState("")
const toggleShow=()=>{
  setBasicModal(!basicModal)
}

  const take = 10;

  useEffect(() => {
    dispatch(fetchsessions({ take, skip }));
  }, [take, skip]);
  console.log(sessionStore, "rfr");

  useEffect(() => {
    if (sessionStore.items?.length) {
      let aux = sessionStore.items.map((e) => {
        return {
          ...e,
          avatar: e?.cover?.path,
          startDate: e.startDate.slice(0, 10),
          endDate: e?.endDate.slice(0, 10),
          category: e.category.nameEn,
        };
      });
      console.log(aux);
      setRows(aux);
    }
  }, [sessionStore.items]);

  const handleDeletesessionsClick = (id) => {
    dispatch(deletsessions({ id, take, skip })).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Session has been deleted");
      }
    });
  };

  if (sessionStore.length === 0) {
    return <div>Loading...</div>;
  }
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "avatar",
      headerName: "Cover",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row?.cover?.path}
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 230,
      editable: true,
    },
    {
      field: "startDate",
      headerName: "StartDate ",

      width: 120,
      sortable: true,
    },

    {
      field: "endDate",
      headerName: "EndDate",
      width: 120,
      editable: true,
      sortable: false,
    },
    {
      field: "category",
      headerName: "Category ",

      width: 180,
      sortable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiFillEdit />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={() => navigate(`${id}`)}
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            // should open popup to ask are u sure delete this user (yes/no)
            color="inherit"
            // onClick={() => handleDeletesessionsClick(id)}
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
      <div>
        <CreateButton
          title={"add new session"}
          onClick={() => navigate("newsession")}
          mt={20}
          mb={20}
        />
      </div>
      <div className="position-relative">
        Session List
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
      <Modal  basicModal={basicModal} setBasicModal={setBasicModal} toggleShow={toggleShow} ofDelete={true} bodOfDelete={
        <div className="d-flex justify-content-center align-items-center">
        are you sure to delete this session
        </div>
      }
      confirm={() => {handleDeletesessionsClick(idOfDelete)
      setBasicModal(false)}}/>
    </div>
  );
}

export default Sessions;
