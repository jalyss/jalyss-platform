import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { dividerClasses } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

 const Courses = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  //event for button drop down 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handle = () => {
    navigate(`/Coursdetail`)
  };
  return (
    <div>
          <div className='button category'>
          <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      Category
      </Button>
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
      <div  className='button add'>
        <Button sx={{marginTop:'-70px',marginLeft:'900px'}}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          
        >
        add new course
        </Button>
        </div>

          </div>
         <div className='cart'>
    
        <Card sx={{ maxWidth: 250 ,marginTop:'100px',boxShadow:20 }}>
        <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://images.pexels.com/photos/4443160/pexels-photo-4443160.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
         <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Titel 
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Description
        </Typography>
       
       </CardContent>
       <CardActions>
      
        <Button size="small" onClick={() => handle()}>see More</Button>
       </CardActions>
       </Card>
       <Card sx={{ maxWidth: 250 ,marginTop:'-280px',marginLeft:'300px',boxShadow:20}}>
        <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://images.pexels.com/photos/4218864/pexels-photo-4218864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
         <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Titel 
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Description
        </Typography>
       </CardContent>
       <CardActions>
      
        <Button size="small" onClick={() => handle()}>see More</Button>
       </CardActions>
       </Card>
       </div>
       </div> 
  )
}
export default Courses;