import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEnglish from '../../../helpers/isEnglish';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { AiFillDelete, AiFillEdit, AiOutlineEye } from 'react-icons/ai';
import AddButton from '../../../components/Commun/buttons/AddButton';
import { Box } from '@mui/material';
import { fetchArticleTypes, removType } from '../../../store/articleType';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import { useEffect } from 'react';
import Modal from "../../../components/Commun/Modal";

function TypesList() {
   
    const [basicModal,setBasicModal]=useState(false)
    const articleTypeStore = useSelector((state) => state.articleType)
    const dispatch = useDispatch()
    const isEng = isEnglish()
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    const [selectedTypeId ,  setSelectedTypeId] = useState("")

    useEffect(() => {
      dispatch(fetchArticleTypes())
  },[] );

  const toggleShow=()=>{
    setBasicModal(!basicModal)

  }

  const handleDeletetypeClick = (id) => {
    dispatch(removType(id)).then(res => {
      if (res.error) {
        showErrorToast(res.error.message)
      } else {
        showSuccessToast('Type has been deleted')
        toggleShow()
      }
    })
  };


  useEffect(() => {
    if (articleTypeStore?.articleTypes.items) {
        let aux = articleTypeStore.articleTypes.items.map(e => {
            return {
                ...e,
                
            }
        })
        console.log(aux);
        setRows(aux)
    }
}, [articleTypeStore.articleTypes.items])


    const handleEditClick = (id) => {
        navigate(`edit/${id}`)
      };
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'nameAr', headerName: 'Name AR', width: 150, editable: false },
        { field: 'nameEn', headerName: 'Name EN', width: 150, editable: false },
        
        
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
                color="success" />,
    
              <GridActionsCellItem
                icon={<AiFillDelete />}
                label="Delete"
                onClick={() => { toggleShow()
                  setSelectedTypeId(id) } }
                color="error" />,
    
            ];
          },
        },
      ];



  return (
    <div>
      <div className='container'>
                <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List Types</h2>
                <hr></hr>
                
                <AddButton title={"Add Type"} mb={20} onClick={()=>{navigate("create")}}/>
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
              
                <Modal  basicModal={basicModal} toggleShow={toggleShow} ofDelete={true} confirm={() => handleDeletetypeClick(selectedTypeId)} /> 
            </div>
    </div>
  )
}

export default TypesList
