import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import isEnglish from '../../../helpers/isEnglish';
import { useNavigate } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';
import { AiOutlineEye } from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import { fetchNonDeliveredCommands } from '../../../store/command';

function CommandsNonDelivered() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90
    },
    {
      field: '',
      headerName: 'TOTAL',
      width: 100,
      sortable: true,
    },
    {
      field: 'clientName',
      headerName: 'NAME CLIENT',
      width: 150,
      editable: false,
    },
    {
      field: 'clientTel',
      headerName: 'PHONE CLIENT',
      width: 150,
      sortable: false,
    },
    {
      field: 'hasDelivery',
      headerName: 'HAS DELIVERY',
      width: 150,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: 'DATE',
      width: 100,
      sortable: true,
    },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      width: 90,
      renderCell: () => (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AiOutlineEye />}
          disabled
        >
          Edit
        </Button>
      ),
    },
  ];

  const commandStore = useSelector((state) => state.command);
  const dispatch = useDispatch();
  const isEng = isEnglish();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [CommandsNonDelivered, setCommandsNonDelivered] = useState([]);

  useEffect(() => {
    dispatch(fetchCommandsNonDelivered());
  }, []);

  useEffect(() => {
    if (commandStore.CommandsNonDelivered.length) {
      const aux = commandStore.CommandsNonDelivered.map((e) => {
        return {
          ...e,
          createdAt: e.createdAt.slice(0, 10),
        };
      });
      setRows(aux);
      setCommandsNonDelivered(aux);
    }
  }, [commandStore.CommandsNonDelivered]);

  const handleEditClick = (id) => {
    console.log(id);
    navigate(`edit/${id}`);
  };

  return (
    <div>
      <div>
        <Button
          type="button"
          href="command/create"
          variant="outlined"
          endIcon={<GrAdd />}
        >
          <span className="btn btn-sm">Add Order</span>
        </Button>
      </div>
      <div className="position-relative">
        Orders List
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}

export default CommandsNonDelivered;
