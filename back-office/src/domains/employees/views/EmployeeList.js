import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import isEnglish from '../../../helpers/isEnglish';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { IoIosPersonAdd } from "react-icons/io";
import { fetchEmployees, removeEmployee } from '../../../store/employee';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import Modal from 'react-bootstrap/Modal';
import { fetchBranche, fetchBranches } from '../../../store/branche';
import { fetchRole, fetchRoles } from '../../../store/role';


function EmployeeList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId]=useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.avatar?.path}
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
      ),
    },
    // {
    //   field: 'id', headerName: 'ID', width: 150
    // },
    {
      field: 'fullName',
      headerName: 'Full name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email ',
      width: 150,
      sortable: false,
      description: 'This column has a value getter and is not sortable.',

    },

    {
      field: 'address',
      headerName: 'Address',
      width: 150,
      editable: false,
      sortable: false,
      // filterable:false,
    },
    {
      field: 'tel',
      headerName: 'Phone ',
      type: 'number',
      width: 150,
      headerAlign:'left',
      align:'left',
      sortable: false,

    },
    {
      
   
      headerName: 'Branch ',
      width: 150,
      valueGetter: (params) => (
       
        params.row.branch?.name
        
      ),
    },


    {
      
      field: 'role',
     
      valueGetter: (params) => (
       
        params.row.role?.nameAr
        
      ),
      

    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
            icon={<AiOutlineEye />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="success"
            

          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"

            onClick={() => { handleDeleteClick(id) }}
            // should open popup to ask are u sure delete this user (yes/no)
            color="error"
          />,

        ];
      },
    },
  ];

  const employeeStore = useSelector((state) => state.employee)
  const dispatch = useDispatch()
  const isEng = isEnglish()
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  useEffect(() => {
    dispatch(fetchEmployees())
   
  }, [])
  
  useEffect(() => {
    if (employeeStore.employees.items.length) {
      let aux = employeeStore.employees.items.map(e => {
        return { ...e, fullName: isEng ? e.fullNameEn : e.fullNameAr,
           phone: e.tel,
            Branch: e?.branch?.name,
             Role: e?.role?.nameAr,
              avatarurl: e.avatarurl }
      })
      console.log(aux);
      setRows(aux)
    }
  }, [employeeStore.employees.items])

  const handleDeleteClick = (id) => {

    dispatch(removeEmployee(id)).then(res => {
      if (res.error) {
        showErrorToast(res.error.message)
      } else {
        showSuccessToast('Employee has been deleted')
      }
    })

  };
  
  const handleEditClick = (id) => {
    console.log('iii',id);
    navigate(`edit/${id}`)
  };
  return (
    <div style={{margin:20}}>
      <div className='d-flex justify-content-end' 
    //   style={{marginLeft:1400,
    // marginTop: 15,borderRadius:10}}
    >
        <Button type='button' href='employee/create' variant="outlined" endIcon={<IoIosPersonAdd />} style={{color:"blue"}}>
          <span className='btn btn-sm '>
            Add Employee
          </span>
        </Button>
      </div>
      <div>
        <h2 style={{paddingLeft:10,paddingTop:10}}>Employee List</h2>
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                  
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>

      </div>
    </div>
  )
}

export default EmployeeList