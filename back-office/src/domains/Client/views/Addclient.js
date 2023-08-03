import React from 'react'
import { Box, Button, Container, TextField, Typography } from "@mui/material";



const Addclient = () => {
  return (
    <Container maxWidth="md">
      <Box component="form"     mt={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Create client 
        </Typography>

        <Box mt={3}>
          <TextField
            label="fullNameEn"
            variant="outlined"
            fullWidth
            value={name}
            // onChange={(e) => setName(e.target.value)}
            required
            margin="normal"
          />
        </Box>


        <Box mt={3}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
        </Box>

        <Box mt={3}>
          <TextField
            label="Telephone Number"
            variant="outlined"
            fullWidth
            // value={tel}
            // onChange={(e) => setTel(e.target.value)}
            required
            margin="normal"
          />
        </Box>

        <Box mt={3}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            // value={address}
            // onChange={(e) => setAddress(e.target.value)}
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
            // onChange={(e) => setLogo(e.target.files[0])}
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
  )
}

export default Addclient;