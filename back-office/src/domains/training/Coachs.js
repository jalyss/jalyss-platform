import React from 'react';
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
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';


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
  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate(`/coches`)
  };

  return (
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
    <div className='crdcoches' style={{maxWidth:1005,}}>
    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            src='https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt='...'
            position='top'
          />
          <Button size="small" onClick={() => handleEditClick()}>see More</Button>
          <MDBCardBody>
            <MDBCardTitle>Name</MDBCardTitle>
            <MDBCardText>
             Email:
            </MDBCardText>
            <MDBCardText>
             Cours:
            </MDBCardText >
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            src='https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt='...'
            position='top'
          />
            <Button size="small">see More</Button>
          <MDBCardBody>
            <MDBCardTitle>Name</MDBCardTitle>
            <MDBCardText>
             Email:
            </MDBCardText>
            <MDBCardText>
             Cours:
            </MDBCardText >
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            src='https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt='...'
            position='top'
          />
           <Button size="small">see More</Button>
          <MDBCardBody>
            <MDBCardTitle>Name</MDBCardTitle>
            <MDBCardText>
             Email:
            </MDBCardText>
            <MDBCardText>
             Cours:
            </MDBCardText >
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            src='https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt='...'
            position='top'
          />
          <Button size="small">see More</Button>
          <MDBCardBody>
            <MDBCardTitle>Name</MDBCardTitle>
            <MDBCardText>
             Email:
            </MDBCardText>
            <MDBCardText>
             Cours:
            </MDBCardText >
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    </div>
    </div>
  );
}
export default Coachs;