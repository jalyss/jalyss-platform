import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { IoIosPersonAdd } from "react-icons/io";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { fetchCoachs } from "../../../../store/coach";
import { editUser, editUserCoach, fetchUsers } from "../../../../store/user";

import Modal from "../../../../components/Commun/Modal";
import { editReq } from "../../../../store/sessions";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import CreateButton from "../../../../components/Commun/buttons/CreateButton";

function Coachs() {
  const coacheStore = useSelector((state) => state.user);
  const { users } = coacheStore;
  const [rows, setRows] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [idOfDelete, setIdOfDelete] = useState("");
  const [fullNameOfDelete, setFullNameOfDelete] = useState("");
  const [createModal, setCreateModal] = useState(false);
const [coachId,setCoachId]=useState(null)
  const toggleShowOfCreate = () => {
    setCreateModal(!createModal);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log("users", users);
  useEffect(() => {
    if (users?.items.length) {
      let aux = users?.items
        .filter((elem) => elem.isCoach === true)
        .map((e) => {
          return {
            ...e,
            fullName: e.fullNameEn,
            phone: e.client?.tel,
            city: e.client?.address,
            Avatar: e.avatar,
            createdAt: e.createdAt.slice(0, 10),
          };
        });

      console.log("users", aux);
      setRows(aux);
    }
  }, [users.items]);

  useEffect(() => {
    if (basicModal && idOfDelete) {
      const row = rows.find((row) => row.id === idOfDelete);
      if (row) {
        setFullNameOfDelete(row.fullName);
      }
    }
  }, [basicModal, idOfDelete, rows]);

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const refusefunc = () => {
    const args = { id: idOfDelete, isCoach: false };
    dispatch(editUser(args)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("User has been removed from coching in JalyssCom");
        toggleShow();
      }
    });
  };
  const handleSave = () => {
    const args = { id: coachId, isCoach: true };
    dispatch(editUserCoach(args)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("User has been added to JalyssCom coachs.");
        toggleShowOfCreate();
        setCoachId(null)
      }
    });
  };
  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.avatar?.path}
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      ),
    },

    {
      field: "fullName",
      headerName: "Full name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email ",
      width: 190,
      sortable: false,
      description: "This column has a value getter and is not sortable.",
    },

    {
      field: "phone",
      headerName: "Phone ",
      width: 150,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: "Created At ",
      width: 150,
    },

    {
      field: "city",
      headerName: "City",
      width: 100,
      editable: true,
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
            icon={<AiOutlineEye />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`${id}`)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShow();
              setIdOfDelete(id);
            }}
            color="error"
          />,
        ];
      },
    },
  ];

  return (
    <div className="m-4">
      <div className="d-flex">
        <CreateButton
          title={"add new coach"}
          mt={20}
          mb={20}
          onClick={toggleShowOfCreate}
        />
      </div>
      <div className="position-relative">
        <div className="mb-3">Coach's List</div>
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
            <span style={{ color: "red", margin: "10px" }}>
              {fullNameOfDelete}
            </span>
            {` From coaching ?`}
          </div>
        }
        confirm={refusefunc}
      />
      <Modal
        toggleShow={toggleShowOfCreate}
        basicModal={createModal}
        setBasicModal={setCreateModal}
        normal={true}
        title="Add new coach"
        body={
          <div
            className="d-flex justify-content-center align-items-center "
            
          >
            <select
              value={coachId}
              class="form-select "
              aria-label="Default select example"
              onChange={(e)=>{setCoachId(e.target.value)}}
              required
              style={{
                border: "1px solid #bfbab7",
                width: 290,
                height: 42,
              }}
            >
              <option value="" disabled selected>
                Choose your Coach
              </option>
              {users?.items.filter((elem) => elem.isCoach === false).map((coach, index) => (
                <option key={index} value={coach.id}>
                  {coach.fullNameEn}
                </option>
              ))}
            </select>
          </div>
        }
        fn={handleSave}
      />
    </div>
  );
}

export default Coachs;
