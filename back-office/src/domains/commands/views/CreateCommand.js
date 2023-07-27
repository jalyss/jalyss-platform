import { Box, Checkbox, Container, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import {createCommand} from "../../../store/command"
import {findArticleTitleAndId} from "../../../store/article"
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import Selecto from "react-select";

function CreateCommand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState([]);
  const [clientName,setclientName]=useState()
  const [clientAddress,setclientAddress]=useState()
  const [clientTel,setclientTel]=useState()
  const [clientEmail,setclientEmail]=useState()
  const [delivered,setdelivered]=useState(false)
  const [paid,setpaid]=useState(false)
  const [hasDelivery,sethasDelivery]=useState(false)
  const [countryId,setcountryId]=useState()
  const [cityId,setcityId]=useState()
  const [branshId,setBranshId]=useState()
  const [Id,setId]=useState()

  const articleTitleAndId = useSelector((state) => state.article.article)
  console.log(value,'ar')

  useEffect(() => {
    dispatch(findArticleTitleAndId())

  }, [])
   useEffect(() => {
      if (articleTitleAndId) {
       setValue(
        articleTitleAndId.map((participant) => ({
           value: participant.id,
           label: participant.title,
         }))
       );
     }
   }, []);

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
  "branshId": branshId,
  "commandLine": [
    {
       "articleByBranchId": "286e0af6-031f-41cb-a67c-0ab5e6c5730c",
        "quantity": 20
      }
      ]
    
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
              onChange={(e)=>{setBranshId(e.target.value)}}
            >
              <MenuItem value="46e79004-7549-476b-b556-29db7318a28d">TUN</MenuItem>
              <MenuItem value="5cc8abaa-72e8-4227-b65f-32cc92774284">MAROC</MenuItem>
              <MenuItem value="21ecb3d9-56d8-4142-9431-79166d3d86a1">FRANCE</MenuItem>
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
              <MenuItem value="6966a5ed-21e2-4290-82b8-961ed6c8521b"> Tunisia</MenuItem>
              <MenuItem value="3569b721-83ca-43a4-b73d-34960a2483ed"> Marroc</MenuItem>
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
              <MenuItem value="fe3dfdca-7618-4a80-9172-45d161d7ded9"> Tunis</MenuItem>
              <MenuItem value="a8ac7684-6868-48d6-a043-4811aaa8bdfe"> Sfax</MenuItem>
            </Select>
          </Box>
        </div>
        <Box mt={3} mb={3} >
        <Selecto
                onChange={(e) => {
                  console.log(e);
                }}
                placeholder="Search by users"
                options={value}
                isMulti
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
