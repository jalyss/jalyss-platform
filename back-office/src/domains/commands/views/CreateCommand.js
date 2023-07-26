import { Box, Checkbox, Container, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import {createCommand} from "../../../store/command"
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";

function CreateCommand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [clientName,setclientName]=useState()
  const [clientAddress,setclientAddress]=useState()
  const [clientTel,setclientTel]=useState()
  const [clientEmail,setclientEmail]=useState()
  const [delivered,setdelivered]=useState(false)
  const [paid,setpaid]=useState(false)
  const [hasDelivery,sethasDelivery]=useState(false)
  const [countryId,setcountryId]=useState()
  const [cityId,setcityId]=useState()

  const handleSubmit = () => {
 const aux ={
  "clientName": clientName,
  "clientAddress": clientAddress,
  "clientTel": clientTel,
  "clientEmail": clientEmail,
  "delivered": delivered,
  "paid": paid,
  "hasDelivery": hasDelivery,
  "countryId": countryId,
  "cityId": cityId,
}
    
    dispatch(createCommand(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast("command created successfully");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  return (

    <Container maxWidth="md">
      <Box  mt={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Command
        </Typography>
        <Box mt={3} >
       

        </Box>
        <div className='row'>
          <Box mt={2} className="col-6">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              onChange={(e)=>{setclientName(e.target.value)}}
            />
          </Box>
          <Box mt={2} className="col-6">
            <TextField
              label="Tel"
              variant="outlined"
              type="number"
              fullWidth
              required
              margin="normal"
            onChange={(e)=>{setclientTel(e.target.value)}}

            />
          </Box>
        </div>
        <Box mt={3} >
          <TextField
            label="Adress"
            variant="outlined"
            onChange={(e)=>{setclientAddress(e.target.value)}}
            fullWidth
            required
            margin="normal"
          />
        </Box>
        <Box mt={3}>
          <TextField
            label="Email"
            onChange={(e)=>{setclientEmail(e.target.value)}}

            variant="outlined"
            fullWidth
            required
            margin="normal"
          />
        </Box>

        <div className='row'>
          <Box mt={3} className="col-4" >
            <InputLabel id="demo-simple-select-label">Branch</InputLabel>
            <Select
              label="Branch"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              <MenuItem value={10}>TUN</MenuItem>
              <MenuItem value={20}>MAROC</MenuItem>
              <MenuItem value={30}>FRANCE</MenuItem>
            </Select>
          </Box>
          <Box mt={3} className="col-4">
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              label="Branch"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              placeholder='country'
              onChange={(e)=>{setcountryId(e.target.value)}}

            >
              <MenuItem value="5114eaa7-4d1a-4bef-a03d-2025bd6ea405"> Tunisia</MenuItem>
              <MenuItem value="20b82e14-aa6e-4d60-bb31-7a50c83d54d6"> Marroc</MenuItem>
            </Select>
          </Box>
          <Box mt={3} className="col-4">
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              label="Branch"
              placeholder='city'

              labelId="demo-simple-select-label"
              id="demo-simple-select"

            >
              <MenuItem value="c8b885bf-2d79-41ad-b581-0c7889a67cce"> Tunis</MenuItem>
              <MenuItem value="2c2f2e10-d8cb-42da-8b9a-76f4f89c816f"> Sfax</MenuItem>
            </Select>
          </Box>
        </div>
        <Box mt={3} mb={3} >
          <TextField
            label="Command line"
            variant="outlined"
            fullWidth
            required
            margin="normal"
          />
        </Box>
        <div className='row'>

          <Box mt={3} className="col-7  ">
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
          </Box>
          <Box className="col-4">
            <InputLabel id="demo-simple-select-label">Quantity : </InputLabel>
            <input type='number' placeholder='Quantity' />
          </Box>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onClick={handleSubmit}
          >
            <span className="label-btn"> Add Command </span>
          </button>
        </div>
      </Box>
    </Container>
  )
}

export default CreateCommand
