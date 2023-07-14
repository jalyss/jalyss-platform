import React,{useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';  
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { fetchCoachs } from '../../../../store/coach';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));




 function Coachs() {

  const coacheStore= useSelector((state)=>state.coach.coachs)
  const dispatch = useDispatch()
  const navigate = useNavigate()

useEffect(()=>{
  dispatch(fetchCoachs())
 },[dispatch])


  

  console.log('lzem tji daata',coacheStore)
const coa =[]
coacheStore.items.forEach(element => {
  coa.push(element.id)
  coa.push(element.user)
});
 console.log("coa",coa);


  const uniqueUsers = [];
  const visitedUsers = new Set();

  for (const user of coa ) {
    const userKey = `${user.fullNameEn}`;

    if (!visitedUsers.has(userKey)) {
      uniqueUsers.push(user);
      visitedUsers.add(userKey);
    }
  }


 console.log(uniqueUsers)
 
  return (
    <div>
  <div className='serchbare' >
   
           </div>
    <div className='crdcoches' style={{marginLeft:'20px', marginTop:'100px',boxShadow:20 ,display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',gap:'20px',border:10}}>
      {uniqueUsers.map((el,key)=>(

    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      <MDBCol style={{width:300}}>
        <MDBCard>
         
        <img
  src={el?.user?.avatar?.path}
  alt="coach"
  style={{
    width: '100%',
    marginBottom: '10px',
    height: 'auto',
    maxWidth: '200px',
    maxHeight: '200px'
  }}
/>
        
          <Button size="small" onClick={() =>navigate(`${el.id}`)}>see More</Button>
          <MDBCardBody>
            <MDBCardTitle>Name:{el.fullNameEn}</MDBCardTitle>
            <MDBCardText>
           Email: {el.email}
            </MDBCardText>
            <MDBCardText>
           Tel: {el.tel}
            </MDBCardText >
            <MDBCardText>
           Address: {el.address}
            </MDBCardText >
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>))}
    </div>
    </div>
  );
}
export default Coachs;