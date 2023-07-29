import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTrainingBookingsBySession } from "../../../store/trainingBooking";
import { Box } from "@mui/material";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import paid from "../../../assets/images/paid.jpg";
import unpaid from "../../../assets/images/unpaid.png";


function Subscribers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionsId } = useParams();

  const subscribersStore = useSelector((state) => state.trainingBooking);
  const { trainingBookings } = subscribersStore;
  const [rows, setRows] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(()=>{
    dispatch(fetchTrainingBookingsBySession(sessionsId));
    setIsDataFetched(true); 
  },[sessionsId])

  useEffect(() => {
    if (isDataFetched && trainingBookings?.items.length > 0) {
      const aux = trainingBookings?.items.map((item) => {
        return {
          id: item.id,
          user: item.user.avatar?.path,
          createdAt: item.createdAt.slice(0, 10),
          fullName: item.user.fullNameEn,
          phone: item.user.client.tel,
          paid: item.paid,
          tarifTitle: item.sessiontarif.title,
          tarifPrice: item.sessiontarif.price,
        };
      });
      setRows(aux);
    }
  }, [ trainingBookings?.items]);

  console.log(trainingBookings);

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
      width: 140,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone ",
      width: 140,
      sortable: false,
    },
    {
      field: "tarifTitle",
      headerName: "Tarif Title",
      width: 140,
      sortable: false,
    },

    {
      field: "tarifPrice",
      headerName: "Tarif Price",
      width: 140,
      editable: true,
      sortable: false,
    },

    {
      field: "paid",
      headerName: "Paid",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return params.value === true ? (
          <div>
            <img src={paid} alt="paid" style={{ width: 44, height: 34 }} />
          </div>
        ) : (
          <div>
            <img
              src={unpaid}
              alt="unpaid"
              style={{ width: 44, height: 25, backgroundColor: "grey" }}
            />
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
            onClick={() => navigate(`/training/subscriber/${id}`)}
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            color="error"
            // onClick={() => {
            //   toggleShow();
            //   setIdOfDelete(id);
            // }}
          />,
        ];
      },
    },
  ];
  const paidCount = trainingBookings.items.filter(
    (elem) => elem.paid === true
  ).length;
  return (
    <div className="position-relative mx-4">
      <div className=" d-flex  justify-content-between align-items-center my-3" >
        
      <div>
        Subscriber's List
        </div>
        <div className="d-flex gap-3">
        <button type="button" class="btn btn-success" disabled>
          Paid {paidCount}
        </button>
    
        <button type="button" class="btn btn-danger">
          Unpaid {trainingBookings.items.length-paidCount}
        </button>
        </div>
      
       
      </div>
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
        />
      </Box>
    </div>
  );
}

export default Subscribers;
