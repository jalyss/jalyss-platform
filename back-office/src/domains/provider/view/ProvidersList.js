import { Box } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { rows } from '../../../constants/providerData'
import { AiFillDelete, AiFillEdit, AiOutlineEye } from 'react-icons/ai';
import isEnglish from '../../../helpers/isEnglish';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import { IoIosPersonAdd } from 'react-icons/io';
import { Button } from 'react-bootstrap';

function ProvidersList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'logo', headerName: 'Logo', width: 150, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    { field: 'address', headerName: 'Address', width: 150, editable: false },
    { field: 'tel', headerName: 'Tel', width: 150, editable: false },
    { field: 'accountBalance', headerName: 'Account', width: 150, editable: false },
    { field: 'email', headerName: 'Email', width: 150, editable: false },
    { field: 'article', headerName: 'Article', width: 150, editable: false },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
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
            icon={<AiOutlineEye />}
            label="Add"
            className="textPrimary"
            onClick={() => handleAddClick(id)}
            color="success" />,

          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"

            onClick={() => { handleDeleteClick(id) }}
            // should open popup to ask are u sure delete this user (yes/no)
            color="error" />,

        ];
      },
    },
  ]
  const isEng = isEnglish()
  const Navigate = useNavigate()
  const handleDeleteClick = (id) => {
  };
  const handleAddClick = (providerId) => {
    Navigate(`detail/${providerId}`)
  };
  const handleEditClick = (id) => {
    Navigate(`edit/${id}`)
  };
  return (
    <div>
      <div>
        <div className='container'>
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List providers</h2>
          <hr></hr>
          <Button type='button' href='provider/create' variant="outlined" endIcon={<IoIosPersonAdd />} >
            <span className='btn btn-sm '>
              Add Provider
            </span>
          </Button>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}

              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </div>
    </div>
  )
}

export default ProvidersList
