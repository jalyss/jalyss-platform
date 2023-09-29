import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCitie, fetchCities } from "../../../store/city"; 
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Commun/buttons/AddButton";
import Modal from "../../../components/Commun/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";

function CityList() {
  const [basicModal, setBasicModal] = useState(false);
  const cityStore = useSelector((state) => state.city);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const handleDeleteCityClick = () => {
    dispatch(removeCitie(selectedCityId)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("City has been deleted");
        toggleShow();
      }
    });
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    if (cityStore?.cities?.items) {
      let aux = cityStore?.cities?.items.map((e) => {
        return {
          id: e.id,
          nameAr: e.nameAr,
          nameEn: e.nameEn,
        };
      });
      setRows(aux);
    }
  }, [cityStore.cities.items]);

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
            onClick={() => navigate(`profileCity/${id}`)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShow();
              setSelectedCityId(id);
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
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>City List</h2>
          <hr />
          <AddButton
            title={"Add City"}
            mb={20}
            onClick={() => navigate("addCity")}
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
            bodOfDelete="Are you sure you want to delete this City?"
            basicModal={basicModal}
            ofDelete={true}
            toggleShow={toggleShow}
            confirm={() => handleDeleteCityClick()}
          />
        </div>
      </div>
    </div>
  );
}

export default CityList;
