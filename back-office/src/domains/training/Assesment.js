import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { blue } from '@mui/material/colors';
import Checkpoint from './Checkpoint';
import { useNavigate } from 'react-router-dom';



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

 const Assesment = () => {
  const navigate = useNavigate()

  const handlechekClick = () => {
    navigate(`/check`)
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  //event for button drop down 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
 
<div>
   
        <div className='button category'>
        <Button  sx={{width:15}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      Courses  
      </Button >
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}> Category1</MenuItem>
        <MenuItem onClick={handleClose}> Category2</MenuItem>
        <MenuItem onClick={handleClose}> Category3</MenuItem>
      </Menu> 
      {/* <div  className='button add'>
        <Button sx={{marginTop:'-70px',marginLeft:'900px'}}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          
        >
        add new course
        </Button> </div> */}
        <div className='btton' style={{marginLeft:800,marginTop:-30}}>
           <Stack direction="row" spacing={2} >
  
      <Button variant="contained"  sx={{width:120}} >
      confirm
      </Button>
      <Button variant="outlined" color="error"  sx={{width:120}}  >
      rejected
      </Button>
    </Stack></div>
   
    </div>
    <div>
    <Card sx={{ minWidth: 200,maxWidth:250,marginTop:10,height:150,boxShadow:'5px 10px #888888'}}>
      <CardContent>
        
        <Typography  sx={{ fontSize:  20 }}  variant="h2" component="div">
         titel of book    
        </Typography>
        <Typography  sx={{ fontSize:  10 }}  variant="h1" component="div">
         description : A book is a medium for recording information in the form of writing or images, typically composed of many pages (made of papyrus, parchment, vellum, or paper) bound together and protected by a cover.   
        </Typography>
      
       
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handlechekClick()}>see More</Button>
      </CardActions>
    </Card>
  
    </div>
    </div>
  )
}

export default Assesment ;