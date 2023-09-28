import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEducationLevel } from "../../../store/educationLevel";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function AddLevel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(true); // Show the dialog by default

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameAr || !nameEn) {
      console.log("Please fill in all required fields");
      return;
    }

    var body = {
      nameAr,
      nameEn,
    };

    const submitCreate = async () => {
      let aux = { ...body };
      try {
        await dispatch(createEducationLevel(aux));
        showSuccessToast("Education Level created successfully");
        setDialogOpen(false); // Close the dialog
        navigate(-1);
      } catch (error) {
        console.log(error);
        showErrorToast(error.message);
      }
    };
    submitCreate();
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={() => navigate(-1)}>
        <DialogTitle>Create education level</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="nameEn"
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
                  label="nameAr"
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

export default AddLevel;
