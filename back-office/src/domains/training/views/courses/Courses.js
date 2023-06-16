import React ,{  useEffect}from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { fetchcours } from '../../../../store/courses';

 const Courses = () => {
  const coursStore= useSelector((state)=>state.courses.courses.items)
const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  //event for button drop down 

  useEffect(()=>{
    dispatch(fetchcours()) 
    }, [])


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
         <div className='cart'  style={{ marginLeft:30, marginTop:'100px',boxShadow:20 ,display: 'grid', gridTemplateColumns: 'repeat(3 ,1fr)',gap:'20px'}}>
        {coursStore.map((el,i)=>(
        <Card style={{width:300}}>
        <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
         <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        
        titel : {el.title}
         
        </Typography>
        <Typography variant="body2" color="text.secondary">
       category :{el.category.nameAr}
        </Typography>
       
       </CardContent>
       <CardActions>
      
        <Button size="small" onClick={() => handle()}>see More</Button>
       </CardActions>
       </Card>))}
      
       </div>
       </div> 
  )
}
export default Courses;