import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createJobTitle } from "../../../store/jobTitle";
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

function AddJob() {
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameAr || !nameEn) {
      showErrorToast("Please fill in all required fields");
      return;
    }

    const jobData = {
      nameAr,
      nameEn,
    };

    try {
      await dispatch(createJobTitle(jobData));
      showSuccessToast("Job created successfully");

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
        <DialogTitle>Create new job</DialogTitle>
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

export default AddJob;
