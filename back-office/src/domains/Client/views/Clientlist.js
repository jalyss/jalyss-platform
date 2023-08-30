import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

import isEnglish from "../../../helpers/isEnglish";
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiOutlineEye, AiFillDelete } from "react-icons/ai";
import { IoIosPersonAdd } from "react-icons/io";
import Modal from "../../../components/Commun/Modal";

import { fetchClients, removeClient } from "../../store/Client";

function ClientList() {
  const clientStore = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const isEng = isEnglish();
  const [basicModal, setBasicModal] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const handleDeleteClientClick = () => {
    dispatch(removeClient(selectedClientId)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Client has been deleted");
        toggleShow();
      }
    });
  };
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);
  useEffect(() => {
    if (clientStore?.clients.items) {
      let aux = clientStore.Clients.items.map((e) => {
        return {
          ...e,
          category: e?.category?.nameEn,
          educationLevel: e?.educationLevel?.nameEn,
          jobTitle: e?.jobTitle?.nameEn,
        };
      });
      console.log(aux);
      setRows(aux);
    }
  }, [clientStore.clients.items]);
  console.log(clientStore.clients.items);

  const columns = [
    {
      field: "fullNameEn",
      headerName: "fullNameEn",
      width: 130,
      editable: true,
    },
    {
      field: "fullNameAr",
      headerName: "fullNameAr ",

      width: 100,
      sortable: true,
    },

    {
      field: "email",
      headerName: "email",
      width: 110,
      editable: true,
      sortable: false,
    },
    {
      field: "address",
      headerName: "address",
      width: 120,
      sortable: false,
    },
    {
      field: "tel",
      headerName: "tel ",
      width: 120,
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
            label="Add"
            className="textPrimary"
            onClick={() => navigate(`detail/${id}`)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShow();
              setSelectedClientId(id);
            }}
            color="error"
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <div>
        <Button
          type="button"
          onClick={() => navigate("create")}
          variant="outlined"
          endIcon={<IoIosPersonAdd />}
        >
          <span className="btn btn-sm ">Add Client</span>
        </Button>
      </div>
      <div className="position-relative">
        Clients List
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
          bodOfDelete="Are you sure you want to delete this Client?"
          basicModal={basicModal}
          ofDelete={true}
          toggleShow={toggleShow}
          confirm={() => handleDeleteClientClick()}
        />
      </div>
    </div>
  );
}

export default ClientList;
