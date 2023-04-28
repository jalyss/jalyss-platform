import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import isEnglish from '../../../helpers/isEnglish';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { IoIosPersonAdd } from "react-icons/io";
import { fetchEmployees, removeEmployee } from '../../../store/employee';


function EmployeeList() {
  const columns = [
    {
      field: 'id', headerName: 'ID', width: 90
    },
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
      width: 110,
      editable: true,
      sortable: false,
    },
    {
      field: 'tel',
      headerName: 'Phone ',
      type: 'number',
      width: 100,
      sortable: false,

    },
    {
      field: 'branch',
      headerName: 'Branch ',
      width: 100,

    },

    {
      field: 'role',
      headerName: 'Role',
      width: 100,
      editable: true,
      sortable: false,

    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
            icon={<AiFillEdit />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"

          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"

            onClick={() => { handleDeleteClick(id) }}
            // should open popup to ask are u sure delete this user (yes/no)
            color="inherit"
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
        return { ...e, fullName: isEng ? e.fullNameEn : e.fullNameAr, phone: e.tel }
      })
      console.log(aux);
      setRows(aux)
    }
  }, [employeeStore.employees.items])

  const handleDeleteClick = (id) => {
    
    dispatch(removeEmployee(id));

  };

  const handleEditClick = (id) => {
    console.log(id);
    navigate(`edit/${id}`)
  };
  return (
    <div>
      <div>
        <Button type='button' href='employee/create' variant="outlined" endIcon={<IoIosPersonAdd />} >
          <span className='btn btn-sm '>
            Add Employee
          </span>
        </Button>
      </div>
      <div className='position-relative'>Employee List


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