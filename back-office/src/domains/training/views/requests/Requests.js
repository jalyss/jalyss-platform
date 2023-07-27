import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  deletsessionsReq,
  fetchsessionsRequest,
} from "../../../../store/sessions";
import { Box } from "@mui/material";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import CloseButton from "../../../../components/Commun/buttons/CloseButton";
import Modall from "../../../../components/Commun/Modal";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "85%", // You can adjust the height as needed
  bgcolor: "background.paper",
  boxShadow: 24,
};

const iframeStyle = {
  width: "100%",
  height: "100%",
  border: "none",
};
function Requests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestStore = useSelector((state) => state.sessions);
  const { sessionRequest } = requestStore;
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [basicModal, setBasicModal] = useState(false);
  const [idOfDelete, setIdOfDelete] = useState("");
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    handleOpen();
  };

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };
  console.log(sessionRequest, "req");
  useEffect(() => {
    dispatch(fetchsessionsRequest());
  }, []);

  useEffect(() => {
    if (sessionRequest.length > 0) {
      const updatedRows = sessionRequest.map((item) => {
        return {
          id: item.id,
          user: item.user.avatar?.path,
          createdAt: item.createdAt.slice(0, 10),
          resume: item.resume?.path,
          fullName: item.user.fullNameEn,
          city: item.user.client.address ,
          phone: item.user.client.tel,
          email: item.user.email,
          status: item.status,
          // field: item.RequestCategories
          //   ? item.RequestCategories.map((el) => el.props.children)
          //   : null,
        };
      });
      setRows(updatedRows);
    }
  }, [sessionRequest]);
  useEffect(() => {
    if (basicModal && idOfDelete) {
      const row = rows.find((row) => row.id === idOfDelete);
      if (row) {
        setUserName(row.fullName);
        console.log("row", row);
      }
    }
  }, [basicModal, idOfDelete, rows]);

  const handleDeleteReq = (id) => {
    dispatch(deletsessionsReq(id))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Request has been deleted");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });
  };
  const columns = [
    {
      field: "user",
      headerName: "User",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.user}
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          alt="User Avatar"
        />
      ),
    },
    {
      field: "fullName",
      headerName: "Full name",
      width: 100,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
      sortable: false,
      renderCell: (params) => (
        <a
          href={`mailto:${params.value}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdEmail style={{ marginRight: "5px" }} />
          {params.value}
        </a>
      ),
    },
    {
      field: "phone",
      headerName: "Phone ",
      width: 100,
      sortable: false,
    },
    {
      field: "city",
      headerName: "City",
      width: 70,
      editable: true,
      sortable: false,
    },

    // {
    //   field: "field",
    //   headerName: "Field",
    //   width: 150,
    //   editable: true,
    //   sortable: false,
    // },
    {
      field: "resume",
      headerName: "Resume",
      width: 150,
      renderCell: (params) => (
        <a onClick={() => handleRowClick(params)}>View Resume</a>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const status = params.value;
        let statusStyle = {};
        
        if (status === "confirmed") {
          statusStyle = { color: "green", backgroundColor: "lightgreen" , borderRadius: "4px",  padding: "4px 8px",
          padding: "4px 8px"};
        } else if (status === "refused") {
          statusStyle = { color: "red", backgroundColor: "salmon", borderRadius: "4px" ,  padding: "4px 8px",
          padding: "4px 8px"};
        } else if (status === "pending") {
          statusStyle = { color: "orange", backgroundColor: "lightyellow", borderRadius: "4px", padding: "4px 8px" };
        }
        
        return (
          <div style={statusStyle}>
            {status}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 100,
      sortable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiFillEdit style={{ color: "blue" }} />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={() => navigate(`/training/requests/${id}`)}
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
  useEffect(() => {
    console.log("selectedRow:", selectedRow);
  }, [selectedRow]);
  // console.log("Rows:", rows);
  // console.log("Columns:", columns);

  return (
    <div className="position-relative mx-4">
      <div className="my-3">Request's List</div>
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

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {selectedRow && selectedRow.resume && (
            <embed
              src={selectedRow.resume}
              title="Resume"
              style={iframeStyle}
            ></embed>
          )}
          <div className="d-flex justify-content-end align-items-center">
            <CloseButton onClick={handleClose} />
          </div>
        </Box>
      </Modal>
      <Modall
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        toggleShow={toggleShow}
        ofDelete={true}
        bodOfDelete={
          <div className="d-flex justify-content-center align-items-center">
            {`Are you sure you want to delete `}
            <span style={{ color: "red" ,margin:"10px"}}>{userName}</span>
            {` Request?`}
          </div>
        }
        confirm={() => {
          handleDeleteReq(idOfDelete);
          setBasicModal(false);
        }}
      />
    </div>
  );
}

export default Requests;
