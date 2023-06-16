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
import { fetchcoaches } from '../../../../store/coches';


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
  const coacheStore= useSelector((state)=>state.coches.coaches.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()

useEffect(()=>{
  dispatch(fetchcoaches())
 },[])


  
  const handleEditClick = () => {
    navigate(`/Coachs`)
  };
  // {console.log('lzem tji daata',coacheStore)}

 
  return (
    <div>
  <div className='serchbare'>
     <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
           </div>
    <div className='crdcoches' style={{marginLeft:'20px', marginTop:'100px',boxShadow:20 ,display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',gap:'20px'}}>
      {coacheStore.map((el,key)=>(
    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      <MDBCol style={{width:300}}>
        <MDBCard>
          <MDBCardImage
            src='https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt='...'
            position='top'
          />
          <Button size="small" onClick={() => handleEditClick()}>see More</Button>
          <MDBCardBody>
            <MDBCardTitle>Name:{el.user.fullNameEn}</MDBCardTitle>
            <MDBCardText>
           Email: {el.user.email}
            </MDBCardText>
            <MDBCardText>
           Tel: {el.user.tel}
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