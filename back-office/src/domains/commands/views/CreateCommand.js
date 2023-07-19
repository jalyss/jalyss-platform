import { Box, Checkbox, Container, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React from 'react'

function CreateCommand() {
  return (

    <Container maxWidth="md">
      <Box component="form" mt={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Command
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
            fullWidth
            required
            margin="normal"
          />
        </Box>
        <Box mt={3}>
          <TextField
            label="Email"
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

            >
              <MenuItem value={10}> Tunisia</MenuItem>
              <MenuItem value={20}> Marroc</MenuItem>
            </Select>
          </Box>
          <Box mt={3} className="col-4">
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              label="Branch"
              labelId="demo-simple-select-label"
              id="demo-simple-select"

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
          />
        </Box>
        <Box  className="col-4">
          <InputLabel id="demo-simple-select-label">Payment : </InputLabel>
          <Select
            label="Branch"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={10}> Check</MenuItem>
            <MenuItem value={20}> Cash</MenuItem>
          </Select>
        </Box>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
          >
            <span className="label-btn"> Add Command </span>
          </button>
        </div>
      </Box>
    </Container>
  )
}

export default CreateCommand
