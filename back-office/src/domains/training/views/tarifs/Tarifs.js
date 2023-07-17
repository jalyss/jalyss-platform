import  React,{useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux'
import { delettarif, fetchtarif } from '../../../../store/tarifss';
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { useNavigate, useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

 function Tarifs() {
  const tarifStore= useSelector((state)=>state.tarif.tarifs.items)
  const dispatch = useDispatch()
  const navigate=useNavigate()
const {tarifId}=useParams()


useEffect(()=>{
  dispatch(fetchtarif()) 
  
  }, [])
{console.log(tarifStore)}

const handleDeletetarifClick=(id) => {
  dispatch(delettarif(id))
  .then(res => {
    if (res.error) {
      showErrorToast(res.error.message)
    } else {
      showSuccessToast('tarif has been deleted')
    }
  })
};


const handeladd=()=>{
  navigate("addtarif")
}


  return ( <div>
    <div>
    <Button sx={{marginLeft:'900px',top:20 }}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handeladd}
          
        >
        add new tarif
        </Button>
    </div >
    <div  style={{gap:'40px',display: 'grid', gridTemplateColumns: 'repeat(2,1fr)'}}>
    {tarifStore.map((el,key)=>(
    <Box sx={{ marginTop:10,marginLeft:5,}}>
    <Card sx={{maxWidth:400,maxHeight:500}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" >
     
        Price :{el.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {el.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
      Duration: {el.durtion}


        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{handleDeletetarifClick(el.id)}}>DELETE</Button>
        <Button size="small" onClick={() => navigate(`${el.id}`)} >UPDATE</Button>
      </CardActions>
    </Card>
  </Box>))}
  </div>
  </div>
  )
}
export default  Tarifs;