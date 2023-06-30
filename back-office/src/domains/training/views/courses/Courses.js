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
import { deletcours, fetchcours } from '../../../../store/courses';
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";


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
 
  const handleDeletecoursClick=(id) => {
    dispatch(deletcours(id))
    .then(res => {
      if (res.error) {
        showErrorToast(res.error.message)
      } else {
        showSuccessToast('tarif has been deleted')
      }
    })
  };

  return (
    <div>
          <div className='button category'>
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
      
        <Button size="small" onClick={()=>{handleDeletecoursClick(el.id)} } >Delete</Button>
        <Button size="small" onClick={() =>navigate(`/training/courses/${el.id}`)}>Update</Button>
       </CardActions>
       </Card>))}   
      
       </div>
       </div> 
  )
}
export default Courses;