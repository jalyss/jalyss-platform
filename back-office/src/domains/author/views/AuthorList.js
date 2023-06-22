import { Box } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'
import { Button } from 'react-bootstrap'
import { IoIosPersonAdd } from 'react-icons/io'
import { rows } from '../../../constants/authorData'
import { useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlineEye } from 'react-icons/ai'
import isEnglish from '../../../helpers/isEnglish'
import { useNavigate } from 'react-router-dom'
import { showErrorToast, showSuccessToast } from '../../../utils/toast'

function AuthorList() {
    const [show, setShow] = useState(false);
    const [elementId, setElementId] = useState(null);
    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'nameAr', headerName: 'Name AR', width: 150, editable: false },
      { field: 'nameEn', headerName: 'Name EN', width: 150, editable: false },
      { field: 'biographyAr', headerName: 'Biography AR', width: 150, editable: false },
      { field: 'biographyEn', headerName: 'Biography EN', width: 150, editable: false },
      
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
    const handleAddClick = (authorId) => {
      Navigate(`detail/${authorId}`)
    };
    const handleEditClick = (id) => {
      Navigate(`edit/${id}`)
    };
    
    return (


        <div>
            <div className='container'>
                <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List Author</h2>
                <hr></hr>
                <Button type='button' href='author/create' variant="outlined" endIcon={<IoIosPersonAdd />} >
                    <span className='btn btn-sm '>
                        Add Author
                    </span>
                </Button>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialStats={{
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


    )
}

export default AuthorList
