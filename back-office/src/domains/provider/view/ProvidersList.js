import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProviders, removeProvider } from '../../../store/provider';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import { AiFillDelete, AiFillEdit, AiOutlineEye } from 'react-icons/ai';
import isEnglish from '../../../helpers/isEnglish';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AddButton from '../../../components/Commun/buttons/AddButton';
import Modal from '../../../components/Commun/Modal';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box } from '@mui/material';

function ProvidersList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);
  const [basicModal, setBasicModal] = useState(false);
  const providerStore = useSelector((state) => state.provider);
  const dispatch = useDispatch();
  const isEng = isEnglish();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState('');

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const handleEditClick = (id) => {
    navigate(`edit/${id}`);
  };

  const handleDeleteProviderClick = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    showSuccessToast('Provider has been deleted');
    toggleShow();
  };

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  useEffect(() => {
    if (providerStore?.providers.items) {
      let aux = providerStore.providers.items.map((e) => {
        return {
          id: e.id,
          logo: e.logo,
          name: e.name,
          address: e.address,
          tel: e.tel,
          accountBalance: e.accountBalance,
          email: e.email,
        };
      });
      setRows(aux);
    }
  }, [providerStore.providers.items]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'logo', headerName: 'Logo', width: 150, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    { field: 'address', headerName: 'Address', width: 150, editable: false },
    { field: 'tel', headerName: 'Tel', width: 150, editable: false },
    { field: 'accountBalance', headerName: 'Account', width: 150, editable: false },
    { field: 'email', headerName: 'Email', width: 150, editable: false },
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
            onClick={() => navigate(`detail/${id}`)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShow();
              setSelectedProviderId(id);
            }}
            color="error"
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <div>
        <div className="container">
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List providers</h2>
          <hr />
          <AddButton title={'Add Provider'} mb={20} onClick={() => navigate('create')} />
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
          <Modal
            bodOfDelete={'are'}
            basicModal={basicModal}
            ofDelete={true}
            toggleShow={toggleShow}
            confirm={() => handleDeleteProviderClick(selectedProviderId)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProvidersList;
