// import React, { useEffect, useState } from 'react'
// import { Box, Button, Typography, useTheme } from '@mui/material'
// import { DataGrid, GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid';
// import { fetchUsers, removeUser } from '../../../store/user';
// import { useDispatch, useSelector } from 'react-redux'
// import isEnglish from '../../../helpers/isEnglish';
// import { useNavigate } from 'react-router-dom';
// import { AiOutlineEye } from 'react-icons/ai';
// import { AiFillDelete } from 'react-icons/ai';
// import { IoIosPersonAdd } from "react-icons/io";
// import { showErrorToast, showSuccessToast } from '../../../utils/toast';
// import Modal from 'react-bootstrap/Modal';



// function UserList() {
//   const [show, setShow] = useState(false);
//   const [elementId, setElementId] = useState(null);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const columns = [
//     {
//       field: 'id', headerName: 'ID', width: 90
//     },
//     {
//       field: 'fullName',
//       headerName: 'Full name',
//       width: 150,
//       editable: true,
//     },
//     {
//       field: 'email',
//       headerName: 'Email ',
//       width: 150,
//       sortable: false,
//       description: 'This column has a value getter and is not sortable.',

//     },

//     {
//       field: 'address',
//       headerName: 'Address',
//       width: 110,
//       editable: true,
//       sortable: false,
//     },
//     {
//       field: 'phone',
//       headerName: 'Phone ',
//       width: 100,
//       sortable: false,

//     },
//     {
//       field: 'createdAt',
//       headerName: 'Created At ',
//       width: 100,

//     },
//     {
//       field: 'balance',
//       headerName: 'Balance ',
//       width: 100,

//     },

//     {
//       field: 'city',
//       headerName: 'City',
//       width: 100,
//       editable: true,
//       sortable: false,

//     },
//     {
//       field: 'actions',
//       type: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       cellClassName: 'actions',
// //haka get za3ma 
//       getActions: ({ id }) => {

//         return [
//           <GridActionsCellItem
//             icon={<AiOutlineEye />}
//             label="Edit"
//             className="textPrimary"
//             onClick={() => handleEditClick(id)}
//             color="inherit"

//           />,
//             <GridActionsCellItem
//             icon={<AiFillDelete />}
//             label="Delete"
//             onClick={() => { setElementId(id), handleShow() }}
//             // should open popup to ask are u sure delete this user (yes/no)
//             color="inherit"
//           />,

//         ];
//       },
//     },
//   ];

// // what we expect ??
//   const userStore = useSelector((state) => state.user)
//   const dispatch = useDispatch()
//   const isEng = isEnglish()
//   const navigate = useNavigate()
//   const [rows, setRows] = useState([])
//   useEffect(() => {
//     dispatch(fetchUsers())
//   }, [])
//   useEffect(() => {
//     if (userStore.users.items.length) {
//       let aux = userStore.users.items.map(e => {
//         return {
//           ...e,
//           fullName: isEng ? e.fullNameEn : e.fullNameAr,
//           phone: e.tel,
//           createdAt: e.createdAt.slice(0, 10)
//         }
//       }
//       )

//       console.log('users',aux);
//       setRows(aux)
//     }

//   }, [userStore.users.items])

// //msh back hethi waaw 
//   const handleDeleteClick = (id) => {

//     dispatch(removeUser(id)).then(res => {
//       if (res.error) {
//         showErrorToast(res.error.message)
//       } else {
//         showSuccessToast('User has been deleted')
//       }
//     })

//   };

// //hethi normalment navigation besh thezna  lel user ama chniya heya edit /path za3ma
//   const handleEditClick = (id) => {
//     console.log(id);
//     navigate(`edit/${id}`)
//   };

//   return (
//     <div>
//       <>
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Delete</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Are you sure!</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={() => { handleDeleteClick(elementId), handleClose() }}>
//               Confirm
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </>
//       <div className='top-0 start-0'>
//         <Button type='button' href='user/create' variant="outlined" endIcon={<IoIosPersonAdd />} >
//           <span className='btn btn-sm '>
//             Add user
//           </span>
//         </Button>
//       </div>
//       <div className='position-relative'>User List


//         <Box sx={{ height: 600, width: '100%' }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 10,
//                 },
//               },
//             }}
//             pageSizeOptions={[5]}
//             checkboxSelection
//             disableRowSelectionOnClick
//           />
//         </Box>

//       </div>
//     </div>
//   )
// }
// export default UserList


import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Button from '@mui/material/Button';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(128, 0, 128)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData( ID, Email, Adress, Phone ,Create  ,Balance ,City,Actions) {
  return { ID, Email, Adress, Phone ,Create,Balance ,City,Actions};
}

const rows = [

  createData(1,'Frozen yoghurt@gmail.com', 'benarous',55455789,"2023-05-03" , 24, 'tunis'),
  createData(2,'Frozen yoghurt@gmail.com', 'benarous',55455789,"2023-05-03" , 24, 'tunis'),
  createData(2,'Frozen yoghurt@gmail.com', 'benarous',55455789,"2023-05-03" , 24, 'tunis'),
  createData(2,'Frozen yoghurt@gmail.com', 'benarous',55455789,"2023-05-03" , 24, 'tunis'),
  createData(2,'Frozen yoghurt@gmail.com', 'benarous',55455789,"2023-05-03" , 24, 'tunis'),
  createData(2,'Frozen yoghurt@gmail.com', 'benarous',55455789,"2023-05-03" , 24, 'tunis'),
  createData(3,'Frozen yoghurt@gmail.com', 'benarous',55455789,"2023-05-03" , 24, 'tunis'),
  createData(4,'Frozen yoghurt@gmail.com', 'benarous',55455789,"2023-05-03" , 24, 'tunis'),
  createData(5,'Frozen yoghurt@gmail.com', 'benarous',55455789,"2023-05-03" , 24, 'tunis',),
];

export default function UserList() {








  return (
  
    <TableContainer component={Paper}>
   
      <Table sx={{ minWidth: 200 ,marginTop:0}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Adress</StyledTableCell>
            <StyledTableCell align="left">Phone</StyledTableCell>
            <StyledTableCell align="left">Create AT</StyledTableCell>
            <StyledTableCell align="left">Balance</StyledTableCell>
            <StyledTableCell align="left">City</StyledTableCell>
            <StyledTableCell align="left" >Actions </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (  
            <StyledTableRow key={row.name}><Stack direction="row" spacing={1}>
              <StyledTableCell component="th" scope="row">
              {row.ID}
           </StyledTableCell >
         
      <Avatar alt="Remy Sharp" sx={{borderColor:"rgb(128, 0, 128)" ,borderRadius:3}} src="/static/images/avatar/1.jpg" />        
        </Stack>
    
   
             
             <StyledTableCell align="right" >{row.Email}</StyledTableCell>
             <StyledTableCell align="right">{row.Adress}</StyledTableCell>
             <StyledTableCell align="right">{row.Phone}</StyledTableCell>
            <StyledTableCell align="right">{row.Create}</StyledTableCell>
             <StyledTableCell align="right">{row.Balance}</StyledTableCell>
             <StyledTableCell align="right">{row.City}</StyledTableCell>
             <StyledTableCell align="right">{row.Actions}</StyledTableCell>
             <IconButton aria-label="delete" size="small">
             <DeleteIcon fontSize="small" />
             </IconButton>
             <IconButton aria-label="fingerprint" color="secondary">
             <Fingerprint />
             </IconButton>
    
          
              </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}