import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { editProvider, fetchProvider } from "../../../store/provider";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

function EditProvider() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { providerId } = useParams();
  const providerStore = useSelector((state) => state.provider.provider);

  const [name, setName] = useState(providerStore?.name);
  const [accountBalance, setAccountBalance] = useState(
    providerStore?.accountBalance
  );
  const [email, setEmail] = useState(providerStore?.email);
  const [tel, setTel] = useState(providerStore?.tel);
  const [address, setAddress] = useState(providerStore?.address);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    dispatch(fetchProvider(providerId));
  }, [dispatch, providerId]);

  useEffect(() => {
    if (providerStore && providerStore.provider) {
      const { name, accountBalance, email, tel, address } =
        providerStore.provider;

      setName(name);
      setAccountBalance(accountBalance.toString());
      setEmail(email);
      setTel(tel);
      setAddress(address);
    }
  }, [providerStore]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name,
      accountBalance: Number(accountBalance),
      email,
      tel,
      address,
    };

    try {
      if (logo) {
        const formData = new FormData();
        formData.append("file", logo);

        const response = await axios.post(
          `${process.env.SERVER_UPLOAD_CONFIG}/upload`,
          formData
        );

        body.logoId = response.data.id;
      }

      const editedProvider = { ...body, providerId };
      dispatch(editProvider(editedProvider));
      showSuccessToast("Provider edited successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error editing provider:", error);
      showErrorToast(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <Typography variant="h6" align="center" gutterBottom>
          Edit Provider
        </Typography>
        <TextField
          label="Name"
      
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Account Balance"
        
          variant="outlined"
          fullWidth
          type="number"
          value={accountBalance}
          onChange={(e) => setAccountBalance(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Telephone Number"
          variant="outlined"
          fullWidth
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
        />
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
              Upload Logo
            </Button>
          </label>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            Update Provider
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditProvider;
