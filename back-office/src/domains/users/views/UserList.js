import React, { useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers } from '../../../store/user';
import { useDispatch, useSelector } from 'react-redux'
import isEnglish from '../../../helpers/isEnglish';
import { Link } from 'react-router-dom';

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
    field: 'phone',
    headerName: 'Phone ',
    type: 'number',
    width: 100,
    sortable: false,

  },
  {
    field: 'createdAt',
    headerName: 'Created At ',
    width: 150,

  },
  {
    field: 'balance',
    headerName: 'Balance ',
    width: 100,

  },
  {
    field: 'category',
    headerName: 'Category ',
    width: 100,
    sortable: false,

  },
  {
    field: 'educationlevel',
    headerName: 'Education Level ',
    width: 100,
    sortable: false,

  },
  {
    field: 'functionalArea',
    headerName: 'Functional Area ',
    width: 100,
    sortable: false,

  },
  {
    field: 'job',
    headerName: 'Job ',
    width: 100,
    sortable: false,

  },
  {
    field: 'country',
    headerName: 'Country ',
    width: 100,
    editable: true,
    sortable: false,

  },
  {
    field: 'city',
    headerName: 'City',
    width: 100,
    editable: true,
    sortable: false,

  },
];





function UserList() {
  const userStore = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [rows, setRows] = useState([])
  const isEng = isEnglish()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  useEffect(() => {
    if (userStore.users.items.length) {
      let aux = userStore.users.items.map(e => {
        return { ...e, fullName: isEng ? e.fullNameEn : e.fullNameAr, phone: e.tel, createdAt: e.createdAt.slice(0, 18) }
      }
      )

      console.log(aux);
      setRows(aux)
    }

  }, [userStore.users.items])


  return (
    <div>UserList
      <Link to='create'>Create User</Link>
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

  )
}

export default UserList