import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import isEnglish from "../../../helpers/isEnglish";

import { useNavigate } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";
import {
  fetchClients,
  removeClients,
  getOneClient,
} from "../../../store/client";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import imgAvatar from "../../../assets/images/avatar.jpg";
import activeIcon from "../../../assets/images/active.png";
import blockIcon from "../../../assets/images/active.png";
import EditClient from "./editClient";
import lookIcon from "../../../assets/images/look-icon.png";
import addClient from "../../../assets/images/client.png";
import Icon from "../../../components/icons/icon";
import editIcon from "../../../assets/images/edit.png";

import AddButton from "../../../components/buttons/AddButton";
import css from "../../../assets/styles/client-table.css";
import Addclient from "./Addclient";
function ClientList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEng = isEnglish();

  const clients = useSelector((state) => state.getAllClient.items);

  useEffect(() => {
    dispatch(fetchClients());
  }, []);
  const onClickIconLook = (id, data) => {};

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.avatar?.path ? params.row.avatar?.path : imgAvatar}
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      ),
    },

    {
      field: "fullName",
      headerName: "Full name",
      width: 150,
      editable: true,
      valueGetter: (params) =>
        params.row.fullNameEn ? params.row.fullNameEn : params.row.fullNameAr,
    },
    {
      field: "email",
      headerName: "Email ",
      width: 150,
      sortable: false,
      description: "This column has a value getter and is not sortable.",
    },

    {
      field: "address",
      headerName: "Address",
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "tel",
      headerName: "Phone ",
      type: "number",
      width: 150,
      headerAlign: "left",
      align: "left",
      sortable: false,
    },
    // {
    //   headerName: "Branch ",
    //   width: 150,
    //   valueGetter: (params) => params.row.branch?.name?params.row.branch?.name:"No record",
    // },

    // {
    //   field: "role",
    //   valueGetter: (params) => params.row.role?.nameAr?params.row.role?.nameAr?.name:"No record",
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 225,
      cellClassName: "actions-icons",
      getActions: (row) => {
        return [
          <GridActionsCellItem
            disableFocusRipple={false}
            icon={<Icon img={activeIcon} />}
            label="Block"
            onClick={() => {
              //   handleDeleteClick(id);
            }}
            size="small"
            edge="start"
          />,
          <GridActionsCellItem
            // disableFocusRipple={false}
            icon={
              <Icon img={editIcon} key={row.id} modalId={"#editClientModal"} />
            }
            label="Edit"
            size="small"
            edge="start"
            onClick={() => {
              dispatch(getOneClient(row.row));
            }}
          />,
          <GridActionsCellItem
            disableFocusRipple={false}
            icon={<Icon img={lookIcon} />}
            label="Look"
            size="small"
            edge="start"
            onClick={() => {
              navigate(`profileclient/${row.id}`);
              dispatch(getOneClient(row.row));
            }}
          />,
        ];
      },
    },
  ];
  // const [currentClient, setCurrentClient] = useState({});
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const handleEditClick = (row) => {
  //   setIsEditModalOpen(true);
  //   setCurrentClient(row);
  // };

  //   const handleEditClick = (id) => {
  //     console.log("iii", id);
  //     navigate(`edit/${id}`);
  //   };
  return (
    <div className="wrapper_client">
      <div class="vertical-line"></div>
      <div className="table_container">
        <div className="table_nav">
          <ul className="sub_nav_ul">
            <li className="sub_nav">
              <a href="#" className="sub_nav_element">
                Dashboard
              </a>
            </li>
            <li className="sub_nav next_nav">
              <a href="#" className="sub_nav_element">
                client
              </a>
            </li>
            <li className="sub_nav next_nav">
              <a href="#" className="sub_nav_element">
                Profile
              </a>
            </li>
          </ul>
          <div className="btn_container">
            <div
              className="add_client_btn"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              {" "}
              <div>
                <img
                  className="add_client_btn_icon"
                  style={{ color: "red", width: "25%", height: "25%" }}
                  src={addClient}
                />
              </div>
            </div>
          </div>

          <div className="table_wrapper">
            <h2
              style={{
                margin: 0,
                backgroundColor: "rgb(77, 24, 71)",
                textAlign: "center",
                padding: 10,
                color: "white",
              }}
            >
              Clients List
            </h2>
            <Box>
              <DataGrid
                rows={clients}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </Box>
          </div>
        </div>

        {/* <EditClient client={currentClient} isEditModalOpen={isEditModalOpen} /> */}

        <Addclient />
      </div>
      <EditClient />
    </div>
  );
}

export default ClientList;
