import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createClient, fetchClients } from "../../../store/client";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { Box, Button, Container, FormControlLabel, Checkbox,TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
function AddClient() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullNameEn, setFullNameEn] = useState("");
  const [fullNameAr, setFullNameAr] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [isCoach, setIsCoach] = useState(false);
  const [accountBalance, setAccountBalance] = useState("");

  const [avatar, setAvatar] = useState(null);

  const clientStore = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullNameEn || !fullNameAr || !email || !address || !tel || !accountBalance) {
      console.log("Please fill in all required fields");
      return;
    }

    var body = {
      fullNameEn,
      fullNameAr,
      email,
      address,
      tel,
      accountBalance,
      isCoach,
    };

    const submitCreate = async () => {
      let aux = { ...body, accountBalance: Number(body.accountBalance) };
      try {
        await dispatch(createClient(aux));
        showSuccessToast("Client created successfully");
        navigate(-1);
      } catch (error) {
        console.log(error);
        showErrorToast(error.message);
      }
    };

    if (avatar !== null) {
      try {
        const formData = new FormData();
        formData.append("file", avatar);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        body.avatarId = response.data.id;
      } catch (error) {
        console.error("Error uploading avatar image:", error);
      }
    }

    submitCreate();
  };
  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Create client
        </Typography>

        <Box mt={3}>
          <TextField
            label="fullNameEn"
            variant="outlined"
            fullWidth
            value={fullNameEn}
            onChange={(e) => setFullNameEn(e.target.value)}
            required
            margin="normal"
          />
        </Box>
        <Box mt={3}>
          <TextField
            label="fullNameAr"
            variant="outlined"
            fullWidth
            value={fullNameAr}
            onChange={(e) => setFullNameAr(e.target.value)}
            required
            margin="normal"
          />
        </Box>

        <Box mt={3}>
          <TextField
            label="Account"
            variant="outlined"
            fullWidth
            type="number"
            value={accountBalance.toString()}
            onChange={(e) => setAccountBalance(e.target.value)}
            required
            margin="normal"
          />
        </Box>

        <Box mt={3}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
        </Box>

        <Box mt={3}>
          <TextField
            label="Telephone Number"
            variant="outlined"
            fullWidth
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            required
            margin="normal"
          />
        </Box>

        <Box mt={3}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            margin="normal"
          />
        </Box>
        <Box mt={3}>
        <StyledFormControlLabel
        control={
          <Checkbox
            checked={isCoach}
            onChange={(e) => setIsCoach(e.target.checked)}
            name="isCoach"
            color="primary"
          />
        }
        label="Is Coach"
      />
        <Box my={2}>
          <input
            type="file"
            accept="image/*"
            id="avatar-file"
            style={{ display: "none" }}
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <label htmlFor="avatar-file">
            <Button variant="outlined" component="span">
              Add avatar
            </Button>
          </label>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
      </Box>
    </Container>
  );
}

export default AddClient;
