import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCountrie, fetchCountries } from "../../../store/Country";

import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Commun/buttons/AddButton";
import Modal from "../../../components/Commun/Modal";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";
function CountryList() {
  const [basicModal, setBasicModal] = useState(false);
  const countrieStore = useSelector((state) => state.country);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedcountrieId, setSelectedcountrieId] = useState("");
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const handleDeletecountrieClick = () => {
    dispatch(removeCountrie(selectedcountrieId)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("countrie has been deleted");
        toggleShow();
      }
    });
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  console.log(countrieStore, "countrieStore");

  useEffect(() => {
    if (countrieStore?.countries?.items) {
      let aux = countrieStore?.countries?.items.map((e) => {
        return {
          id: e.id,
          nameAr: e.nameAr,
          nameEn: e.nameEn,
         
        };
      });
      setRows(aux);
    }
  }, [countrieStore.countries.items]);

  const columns = [
    {
      field: "nameAr",
      headerName: "nameAr",
      width: 155,
      editable: false,
    },

    { field: "nameEn", headerName: "nameEn", width: 155, editable: false },

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
            onClick={() => navigate(`profilcountrie/${id}`)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShow();
              setSelectedcountrieId(id);
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
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>Countrie List</h2>
          <hr />
          <AddButton
            title={"Add Countrie"}
            mb={20}
            onClick={() => navigate("addCountrie")}
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
            bodOfDelete="Are you sure you want to delete this Countrie?"
            basicModal={basicModal}
            ofDelete={true}
            toggleShow={toggleShow}
            confirm={() => handleDeletecountrieClick()}
          />
        </div>
      </div>
    </div>
  );
}

export default CountryList;
