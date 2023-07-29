import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviders, removeProvider } from "../../../store/provider";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AiFillDelete, AiFillEdit, AiOutlineEye } from "react-icons/ai";
import isEnglish from "../../../helpers/isEnglish";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import AddButton from "../../../components/Commun/buttons/AddButton";
import Modal from "../../../components/Commun/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
function ProvidersList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);
  const [basicModal, setBasicModal] = useState(false);
  const providerStore = useSelector((state) => state.provider);
  const dispatch = useDispatch();
  const isEng = isEnglish();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState("");

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  

  const handleDeleteProviderClick = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    showSuccessToast("Provider has been deleted");
    toggleShow();
  };

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  useEffect(() => {
    if (providerStore?.providers.items) {
      let aux = providerStore.providers.items.map((e) => {
        return {
          id: e.id,
          logo: e.logo?.path,
          name: e.name,
          address: e.address,
          tel: e.tel,
          accountBalance: e.accountBalance,
          email: e.email,
        };
      });
      setRows(aux);
    }
  }, [providerStore.providers.items]);
  const [open, setOpen] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);

  const handleClick = (logo) => {
    setSelectedLogo(logo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      field: "logo",
      headerName: "Logo",
      width: 120,
      editable: false,
      renderCell: (params) => (
        <>
          <img
            src={params.value}
            alt="Logo"
            style={{
              width: "60%",
              borderRadius: "40px",
              height: "110%",
              cursor: "pointer",
            }}
            onClick={() => handleClick(params.value)}
          />
          <Dialog open={open} onClose={handleClose} style={{ borderRadius: "50px" }}>
            <DialogContent>
              <img
                src={selectedLogo}
                alt="Logo"
                style={{ width: "100%", borderRadius: "40px" }}
              />
            </DialogContent>
          </Dialog>
        </>
      ),
    },
    { field: "name", headerName: "Name", width: 155, editable: false },
    { field: "address", headerName: "Address", width: 155, editable: false },
    { field: "tel", headerName: "Tel", width: 155, editable: false },
    {
      field: "accountBalance",
      headerName: "Account",
      width: 155,
      editable: false,
    },
    { field: "email", headerName: "Email", width: 155, editable: false },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 155,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiFillEdit />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`editArticle/${id}`)}
            color="inherit"
          />,
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
              setSelectedProviderId(id);
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
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List providers</h2>
          <hr />
          <AddButton
            title={"Add Provider"}
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
            bodOfDelete="Are you sure you want to delete this provider?"
            basicModal={basicModal}
            ofDelete={true}
            toggleShow={toggleShow}
            confirm={() => handleDeleteProviderClick(selectedProviderId)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProvidersList;
