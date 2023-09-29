import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobTitles, removeJobTitle } from "../../../store/jobTitle";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Commun/buttons/AddButton";
import Modal from "../../../components/Commun/Modal";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";
function JobTitleList() {
  const [basicModal, setBasicModal] = useState(false);
  const jobTitleStore = useSelector((state) => state.jobTitle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedjobTitleId, setSelectedjobTitleId] = useState("");
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const handleDeletejobTitleClick = () => {
    dispatch(removeJobTitle(selectedjobTitleId)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("jobTitle has been deleted");
        toggleShow();
      }
    });
  };

  useEffect(() => {
    dispatch(fetchJobTitles());
  }, [dispatch]);
  console.log(jobTitleStore, "jobTitleStore");

  useEffect(() => {
    if (jobTitleStore?.jobTitles?.items) {
      let aux = jobTitleStore?.jobTitles?.items.map((e) => {
        return {
          id: e.id,
          nameAr: e.nameAr,
          nameEn: e.nameEn,
          createdAt: e.createdAt,
        };
      });
      setRows(aux);
    }
  }, [jobTitleStore.jobTitles.items]);
 
  const columns = [
    {
      field: "nameAr",
      headerName: "nameAr",
      width: 155,
      editable: false,
    },

    { field: "nameEn", headerName: "nameEn", width: 155, editable: false },
    {
      field: "createdAt",
      headerName: "createdAt",
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
            onClick={() => navigate(`profiljobTitle/${id}`)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShow();
              setSelectedjobTitleId(id);
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
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>
             Job List
          </h2>
          <hr />
          <AddButton
            title={"Add Job"}
            mb={20}
            onClick={() => navigate("addJob")}
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
            bodOfDelete="Are you sure you want to delete this Job?"
            basicModal={basicModal}
            ofDelete={true}
            toggleShow={toggleShow}
            confirm={() => handleDeletejobTitleClick()}
          />
        </div>
      </div>
    </div>
  );
}

export default JobTitleList;
