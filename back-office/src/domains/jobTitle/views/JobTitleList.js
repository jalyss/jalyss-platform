import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobTitles,
  removeJobTitle,
  editJobTitle,
  fetchJobTitle,
} from "../../../store/jobTitle";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../components/Commun/buttons/AddButton";
import Modal from "../../../components/Commun/Modal";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

function JobTitleList() {
  const [basicModal, setBasicModal] = useState(false);
  const jobTitleStore = useSelector((state) => state.jobTitle);
  const [currentJob, setCurrentJob] = useState(null);
const current = jobTitleStore.jobTitles.items
  useEffect(() => {
    setCurrentJob(null);
  }, [jobTitleStore.id]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedjobTitleId, setSelectedjobTitleId] = useState("");
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };
console.log(jobTitleStore,"choooooooooof")
  const handleDeletejobTitleClick = () => {
    dispatch(removeJobTitle(selectedjobTitleId)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Job title has been deleted");
      }
    });
  };

  const handleEditJobTitle = () => {
    if (currentJob) {
      dispatch(editJobTitle(currentJob))
        .then(() => {
          showSuccessToast("Job title updated successfully");
          dispatch(fetchJobTitles());
          handleJobDetailsClose();
        })
        .catch((error) => {
          showErrorToast(error.message);
        });
    }
  };

  useEffect(() => {
    dispatch(fetchJobTitles());
    dispatch(fetchJobTitle(selectedjobTitleId))
  }, [dispatch,selectedjobTitleId]);

  useEffect(() => {
    if (
      jobTitleStore?.jobTitles?.items &&
      Array.isArray(jobTitleStore.jobTitles.items)
    ) {
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

  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleViewJobDetails = (job) => {
    setSelectedJob(job);
    setCurrentJob({ ...job });
    setJobDetailsOpen(true);
  };

  const handleJobDetailsClose = () => {
    setJobDetailsOpen(false);
  };

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
      getActions: ({ id, nameAr, nameEn }) => {
        return [
          <GridActionsCellItem
            icon={<AiOutlineEye />}
            label="View"
            className="textPrimary"
            onClick={() =>
             { setSelectedjobTitleId(id)
              handleViewJobDetails({  id, nameAr, nameEn })}
            }
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
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>Job List</h2>
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
          <Dialog open={jobDetailsOpen} onClose={handleJobDetailsClose}>
            <DialogTitle>Job Details</DialogTitle>
            <DialogContent>
              {selectedJob && (
                <div>
                  <TextField
                    label="Name (Arabic)"
                    variant="outlined"
                    fullWidth
                  

                    value={jobTitleStore?.jobTitles.items.nameAr}
                    onChange={(e) =>
                      setCurrentJob({ ...currentJob, nameAr: e.target.value })
                    }
                    margin="normal"
                  />
                  <TextField
                    label="Name (English)"
                    variant="outlined"
                   
                    fullWidth
                    value={jobTitleStore?.jobTitles.items.nameEn}
                    onChange={(e) =>
                      setCurrentJob({ ...currentJob, nameEn: e.target.value })
                    }
                    margin="normal"
                  />
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleJobDetailsClose} color="primary">
                Close
              </Button>
              <Button onClick={handleEditJobTitle} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default JobTitleList;
