import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid';
import { fetchUsers, removeUser } from '../../../store/user';
import { useDispatch, useSelector } from 'react-redux'
import isEnglish from '../../../helpers/isEnglish';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { IoIosPersonAdd } from "react-icons/io";
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import Modal from 'react-bootstrap/Modal';



function UserList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      width: 100,
      sortable: false,

    },
    {
      field: 'createdAt',
      headerName: 'Created At ',
      width: 100,

    },
    {
      field: 'balance',
      headerName: 'Balance ',
      width: 100,

    },

    {
      field: 'city',
      headerName: 'City',
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
            icon={<AiOutlineEye />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"

          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"

            onClick={() => { setElementId(id), handleShow() }}
            // should open popup to ask are u sure delete this user (yes/no)
            color="inherit"
          />,

        ];
      },
    },
  ];


  const userStore = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const isEng = isEnglish()
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  useEffect(() => {
    if (userStore.users.items.length) {
      let aux = userStore.users.items.map(e => {
        return {
          ...e,
          fullName: isEng ? e.fullNameEn : e.fullNameAr,
          phone: e.tel,
          createdAt: e.createdAt.slice(0, 10)
        }
      }
      )
      console.log(aux);
      setRows(aux)
    }

  }, [userStore.users.items])


  const handleDeleteClick = (id) => {

    dispatch(removeUser(id)).then(res => {
      if (res.error) {
        showErrorToast(res.error.message)
      } else {
        showSuccessToast('User has been deleted')
      }
    })

  };

  const handleEditClick = (id) => {
    console.log(id);
    navigate(`edit/${id}`)
  };

  return (
    <div>
      <>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => { handleDeleteClick(elementId), handleClose() }}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div className='top-0 start-0'>
        <Button type='button' href='user/create' variant="outlined" endIcon={<IoIosPersonAdd />} >
          <span className='btn btn-sm '>
            Add user
          </span>
        </Button>
      </div>
      <div className='position-relative'>User List


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
export default UserList