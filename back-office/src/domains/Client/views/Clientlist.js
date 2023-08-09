import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, removeClient } from "../../../store/client";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AiFillDelete, AiFillEdit, AiOutlineEye } from "react-icons/ai";
import isEnglish from "../../../helpers/isEnglish";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Commun/buttons/AddButton";
import Modal from "../../../components/Commun/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";

function ClientsList() {
  const [show, setShow] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const clientStore = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const isEng = isEnglish();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedClientId, setSelectedclientId] = useState("");

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const handleDeleteClientClick = () => {
    dispatch(removeClient(selectedClientId)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("client has been deleted");
        toggleShow();
      }
    });
  };

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    if (clientStore?.clients.items) {
      let aux = clientStore.clients.items.map((e) => {
        return {
          id: e.id,
          fullNameEn: e.fullNameEn,
          fullNameAr: e.fullNameAr,
          email: e.email,
          address: e.address,
          tel: e.tel,
          accountBalance: e.accountBalance,
        };
      });
      setRows(aux);
    }
  }, [clientStore.clients.items]);

  const columns = [
    {
      field: "fullNameEn",
      headerName: "fullNameEn",
      width: 155,
      editable: false,
    },
    {
      field: "fullNameAr",
      headerName: "fullNameAr",
      width: 155,
      editable: false,
    },
    { field: "email", headerName: "Email", width: 155, editable: false },
    { field: "address", headerName: "Address", width: 155, editable: false },
    { field: "tel", headerName: "Tel", width: 155, editable: false },
    {
      field: "accountBalance",
      headerName: "Account",
      width: 155,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 155,
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
        <div className="container">
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List clients</h2>
          <hr />
          <AddButton
            title={"Add client"}
            mb={20}
            onClick={() => navigate("create")}
          />
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
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
          </Box>
          <Modal
            bodOfDelete="Are you sure you want to delete this client?"
            basicModal={basicModal}
            ofDelete={true}
            toggleShow={toggleShow}
            confirm={() => handleDeleteClientClick()}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientsList;
