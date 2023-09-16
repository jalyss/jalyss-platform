import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createJobTitle, fetchJobTitle } from "../../../store/jobTitle";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { Button, Grid, TextField, Typography } from "@mui/material";

function AddJob() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");

  useEffect(() => {
    dispatch(fetchJobTitle());
  }, [dispatch]);

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
        await dispatch(createJobTitle(aux));
        showSuccessToast("Job  created successfully");
        navigate(-1);
      } catch (error) {
        console.log(error);
        showErrorToast(error.message);
      }
    };
    submitCreate();
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap">
          <div className=" m-3">
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Create new job
              </Typography>
            </Grid>

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

              <div className="w-100 d-flex justify-content-center">
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </div>
            </Grid>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddJob;
