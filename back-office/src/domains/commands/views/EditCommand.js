import { Box, Checkbox, FormControlLabel, InputLabel,Container, MenuItem, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {fetchCommand} from '../../../store/command'

function EditCommand() {
  const command = useSelector((state) => state.command.command);
  const { commandId } = useParams()
  const dispatch = useDispatch();
  const [com, setCom] = useState({})

  useEffect(() => {
    dispatch(fetchCommand(commandId));
    console.log(command,'i');
  }, [commandId,dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth((com) => ({ ...com, [name]: value }));
  };


  return (
    <div>
 
 <Container maxWidth="md">
      <Box component="form" mt={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Command
        </Typography>
        <Box mt={3} >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="Comanddirect" control={<Checkbox />} label=" Comand direct" />
          </RadioGroup>

        </Box>
        <div className='row'>
          <Box mt={2} className="col-6">
            <TextField
              label="Name"
              variant="outlined"
              value={command?.clientName}
              fullWidth
              required
              margin="normal"
            />
          </Box>
          <Box mt={2} className="col-6">
            <TextField
              label="Tel"
              variant="outlined"
              type="number"
              value={command?.clientTel}
              fullWidth
              required
              margin="normal"
            />
          </Box>
        </div>
        <Box mt={3} >
          <TextField
            label="Adress"
            variant="outlined"
            value={command?.clientAddress
            }
            fullWidth
            required
            margin="normal"
          />
        </Box>
        <Box mt={3}>
          <TextField
            label="Email"
            variant="outlined"
            value={command?.clientEmail}
            fullWidth
            required
            margin="normal"
          />
        </Box>

        <div className='row'>
          <Box mt={3} className="col-4" >
            <InputLabel id="demo-simple-select-label">Branch</InputLabel>
            <Select sx={{
    width: 150,
    color: 'success.main',
  }}
              label="Branch"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={command?.branchId}
            >
              <MenuItem value={10}>TUN</MenuItem>
              <MenuItem value={20}>MAROC</MenuItem>
              <MenuItem value={30}>FRANCE</MenuItem>
            </Select>
          </Box>
          <Box mt={3} className="col-4">
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select sx={{
    width: 150,
    color: 'success.main',
  }}
              label="Branch"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={command?.country.nameEn}

            >
              <MenuItem value={10}> Tunisia</MenuItem>
              <MenuItem value={20}> Marroc</MenuItem>
            </Select>
          </Box>
          <Box mt={3} className="col-4">
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select sx={{
    width: 150,
    color: 'success.main',
  }}
              label="Branch"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={command?.city.nameEn}
            >
              <MenuItem value={10}> Tunis</MenuItem>
              <MenuItem value={20}> Sfax</MenuItem>
            </Select>
          </Box>
        </div>
        <Box mt={3} mb={3} >
          <TextField
            label="Article"
            variant="outlined"
            fullWidth
            required
            margin="normal"
          />
        </Box>
        <div className='row'>

        <Box mt={3} className="col-7  ">
          <TextField
            label="Montant"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={command?.montant}
          />
        </Box>
        <Box  className="col-4">
          <InputLabel id="demo-simple-select-label">Payment : </InputLabel>
          <Select  sx={{
    width: 150,
    color: 'success.main',
  }}
            label="Branch"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={command?.payment}
          >
            <MenuItem value={10}> Check</MenuItem>
            <MenuItem value={20}> Cash</MenuItem>
          </Select>
        </Box>
        </div>

        <div className="w-100 d-flex justify-content-center">
            <button
              type="submit"
              onClick={() =>  navigate(`edit`)}
              className="confirm-button mt-5   mb-3"
            >
              <span className="label-btn"> Edit Commande </span>
            </button>
          </div>
      </Box>
    </Container>

         

    </div>
  )
}

export default EditCommand