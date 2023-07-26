import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import isEnglish from '../../../helpers/isEnglish';
import { useNavigate } from 'react-router-dom';
import { GiConfirmed ,GiCancel} from 'react-icons/gi';
import { AiFillEdit, AiOutlineEye } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';
import { GrAdd } from 'react-icons/gr';
import { TbTruckDelivery } from 'react-icons/tb';

import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import Modal from 'react-bootstrap/Modal';
import { fetchCommands } from '../../../store/command';

function CommandList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const columns = [
    
    // {
    //   field: '',
    //   headerName: 'TOTAL',
    //   width: 100,
    //   sortable: true,

    // },
    {
      field: 'clientName',
      headerName: 'NAME CLIENT',
      width: 150,
      editable: true,

    },
    {
      field: 'clientTel',
      headerName: 'PHONE CLIENT ',
      width: 150,
      sortable: false,

    },
    {
      field: 'paid',
      type: 'actions',
      headerName: 'PAYMENT STATUS',
      width: 110,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        return [
          row.paid ? (
            <GridActionsCellItem
              icon={<GiConfirmed size={20} color='#3cb371' />}
              label="confirmPaid"
              className="textPrimary"
              onClick={() => handleEditClick(id)}
              color="inherit"
            />
          ) : (
            <GridActionsCellItem
              icon={<FcCancel size={15} />}
              label="confirmPaid"
              className="textPrimary"
              onClick={() => handleEditClick(id)}
              color="inherit"
            />
          ),
        ];
      },
    },
    
  
    {
      field: 'hasDelivery',
      headerName: 'HAS DELIVERY',
      width: 130,
      sortable: true,
      renderCell: ({ value }) => (value ? 'Yes' : 'No'), // Render 'Yes' or 'No' instead of boolean

    },
 
    {
      field: 'confirm',
      type: 'actions',
      headerName: 'CONFIRM',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        return [
          row.confirm ? (
            <GridActionsCellItem
              icon={<GiConfirmed size={20} color='#3cb371' />}
              label="confirm"
              className="textPrimary"
              onClick={() => handleEditClick(id)}
              color="inherit"
            />
          ) : (
            <GridActionsCellItem
              icon={<FcCancel size={15} />}
              label="confirm"
              className="textPrimary"
              onClick={() => handleEditClick(id)}
              color="inherit"
            />
          ),
        ];
      },
    },

    {
      field: 'delivered',
      type: 'actions',
      headerName: 'DELIVERY STATUS',
      width: 130,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          // <GridActionsCellItem
          //   icon={<GiCancel color='red' size={15} />}

          //   label="confirm"
          //   className="textPrimary"
          //   onClick={() => handleEditClick(id)}
          //   color="inherit"
          // />,
          <GridActionsCellItem
            icon={<TbTruckDelivery size={20} />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,


        ];

      },
    },
    {
      field: 'createdAt',
      headerName: 'DATE',
      width: 100,
      sortable: true,


    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'ACTIONS',
      width: 90,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
            icon={<AiOutlineEye color='#8b008b' size={15} />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<AiFillEdit size={15} />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleClick(id)}
            color="inherit"
          />,


        ];

      },
    },
  ];

  const commandStore = useSelector((state) => state.command)
  console.log(commandStore,"lol")
  const dispatch = useDispatch()
  const isEng = isEnglish()
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  useEffect(() => {
    dispatch(fetchCommands())

  }, [])
  useEffect(() => {
    if (commandStore.commands.items.length) {
      let aux = commandStore.commands.items.map(e => {

        return {
          ...e, createdAt: e.createdAt.slice(0, 10),

        }

      })
      console.log(aux);
      setRows(aux)
    }
  }, [commandStore.commands.items])



  const handleEditClick = (id) => {
    console.log(id);
    navigate(`detail/${id}`)

  };
  const handleClick = (id) => {
    console.log(id);
    navigate(`edit/${id}`)

  };
  return (


    <div>


      <div>
        <Button type='button' onClick={() => navigate(`create`)} variant="outlined" endIcon={<GrAdd />} >
          <span className='btn btn-sm '>
            Add Order
          </span>
        </Button>
      </div>
      <div className='position-relative'>Orders List
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
export default CommandList