import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import { useDispatch } from 'react-redux';
import isEnglish from '../../../helpers/isEnglish';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { rows } from "../../../constants/blogData"
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

function BlogsList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch()
  const colorReference = '#48184c';
  const buttonStyle = {
    backgroundColor: colorReference,
    color: 'white',
    borderRadius: '5px',
  };
  console.log("ros",rows);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'blogTitle', headerName: 'Blog Title', width: 150, editable: true },
    { field: 'articleCategory', headerName: 'Category', width: 150, editable: true },
    { field: 'date', headerName: 'Date', width: 150, editable: true },
    { field: 'situation', headerName: 'Situation', width: 150, editable: true },
    // {

    //   field: 'ArticleCategory ',
    //   width: 150,
    //   valueGetter: (params) => (

    //     params.row.category?.nameAr

    //   ),
    // },
    
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
            label="Add"
            className="textPrimary"
            onClick={() => handleAddClick(id)}
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

  const isEng = isEnglish()
  const Navigate = useNavigate()
  // const rows = [
  //   { id: 1, Name: 'jalyss6', BlogTitle: 'My Blog Post 30', ArticleCategory: 'وعي', Date: '26-07-2023', Situation: 'Accept' },
  //   { id: 2, Name: 'jalyss3', BlogTitle: 'My Blog Post 28', ArticleCategory: 'ادارة الاعمال', Date: '26-07-2023', Situation: 'Refuse' },
  //   { id: 3, Name: 'jalyss9', BlogTitle: 'My Blog Post 16', ArticleCategory: 'تنمية بشرية', Date: '26-07-2023', Situation: 'Waiting' },

  // ];

  const handleDeleteClick = (id) => {

    dispatch(removeBlog(id)).then(res => {
      if (res.error) {
        showErrorToast(res.error.message)
      } else {
        showSuccessToast('Blog has been deleted')
      }
    })

  };
  const handleAddClick = (blogId) => {
   
    Navigate(`detail/${blogId}`)
  };
  return (
    <div>
    <div className='container'>
      <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List of people who create blogs</h2>
      <hr></hr>
     
    <DropdownButton style={buttonStyle} id="dropdownMenuButton" className='mb-3' title="Choose a situation ">
        <Dropdown.Item href="#">Accept</Dropdown.Item>
        <Dropdown.Item href="#">Refuse</Dropdown.Item>
        <Dropdown.Item href="#">Waiting</Dropdown.Item>
      </DropdownButton>
     
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
  )
}

export default BlogsList