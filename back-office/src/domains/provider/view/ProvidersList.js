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
import AddButton from '../../../components/Commun/buttons/AddButton';
import Modal from "../../../components/Commun/Modal"

function ProvidersList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);
  const [basicModal,setBasicModal]=useState(false)

  const toggleShow=()=>{
    setBasicModal(!basicModal)
  }
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

            onClick={toggleShow}            // should open popup to ask are u sure delete this user (yes/no)
            color="error" />,

        ];
      },
    },
  ]
  const isEng = isEnglish()
  const navigate = useNavigate()
  // const handleDeleteClick = (id) => {
  // };
  const handleAddClick = (providerId) => {
    navigate(`detail/${providerId}`)
  };
  const handleEditClick = (id) => {
    navigate(`edit/${id}`)
  };
  return (
    <div>
      <div>
        <div className='container'>
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List providers</h2>
          <hr></hr>
          <AddButton title={"Add Provider"} mb={20} onClick={()=>{navigate("create")}}/>
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
          <Modal  bodOfDelete={"are"} basicModal={basicModal} toggleShow={toggleShow} ofDelete={true}/>

        </div>
      </div>
    </div>
  )
}

export default ProvidersList
