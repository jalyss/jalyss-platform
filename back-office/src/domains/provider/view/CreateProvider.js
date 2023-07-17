import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProvider, fetchProviders } from "../../../store/provider";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

function CreateProvider() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [logo, setLogo] = useState(null);

  const providerStore = useSelector((state) => state.provider);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !accountBalance || !email || !tel || !address) {
      console.log("Please fill in all required fields");
      return;
    }

    var body = {
      name,
      accountBalance,
      email,
      tel,
      address,
    };

    const submitCreate = async () => {
      let aux = { ...body, accountBalance: Number(body.accountBalance) };
      try {
        await dispatch(createProvider(aux));
        showSuccessToast("Provider created successfully");
        navigate(-1);
      } catch (error) {
        console.log(error);
        showErrorToast(error.message);
      }
    };

    if (logo !== null) {
      try {
        const formData = new FormData();
        formData.append("file", logo);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        body.logoId = response.data.id;
      } catch (error) {
        console.error("Error uploading logo image:", error);
      }
    }

    submitCreate();
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Provider
        </Typography>

        <Box mt={3}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <Box my={2}>
          <input
            type="file"
            accept="image/*"
            id="logo-file"
            style={{ display: "none" }}
            onChange={(e) => setLogo(e.target.files[0])}
          />
          <label htmlFor="logo-file">
            <Button variant="outlined" component="span">
              Add Logo
            </Button>
          </label>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateProvider;
