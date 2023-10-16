import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editJobTitle } from "../../../store/jobTitle"; 
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

function JobDetails({ jobId }) {
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(true);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const jobs = useSelector((state) => state.jobTitle);
  const job = jobs.find((job) => job.id === jobId);
  
  useEffect(() => {
    if (job) {
      setNameAr(job.nameAr);
      setNameEn(job.nameEn);
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameAr || !nameEn) {
      showErrorToast("Please fill in all required fields");
      return;
    }

    const updatedJobData = {
      id: jobId, 
      nameAr,
      nameEn,
    };

    try {
      await dispatch(editJobTitle(updatedJobData));
      showSuccessToast("Job updated successfully");

      setDialogOpen(false);
      navigate(-1);
    } catch (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={() => navigate(-1)}>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name (English)"
                  variant="outlined"
                  fullWidth
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name (Arabic)"
                  variant="outlined"
                  fullWidth
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button onClick={() => navigate(-1)} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default JobDetails;
