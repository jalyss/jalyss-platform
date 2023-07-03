import { Box } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React from 'react';
import { useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineEye } from 'react-icons/ai';
import isEnglish from '../../../helpers/isEnglish';
import { useNavigate } from 'react-router-dom';
import AddButton from '../../../components/Commun/buttons/AddButton';
import Modal from "../../../components/Commun/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAuthors, removAuthor } from '../../../store/author';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
function AuthorList() {
  
    const [show, setShow] = useState(false);
    const [authorId, setAuthorId] = useState(null);
    const [basicModal,setBasicModal]=useState(false)
    const authorStore = useSelector((state) => state.author)
    const dispatch = useDispatch()
    const isEng = isEnglish()
    const navigate = useNavigate()
    const [rows, setRows] = useState([])

    // const handleAddClick = (authorId) => {
    //   navigate(`detail/${authorId}`)
    // };

    useEffect(() => {
      dispatch(fetchAuthors())
  },[] );

  const toggleShow=()=>{
    setBasicModal(!basicModal)
  }

    const handleEditClick = (id) => {
      navigate(`edit/${id}`)
    };

    // const toggleShow=()=>{
    //   setBasicModal(!basicModal)

    // }
    
    const handleDeleteauthorClick = (id) => {
      dispatch(removAuthor(id)).then(res => {
        if (res.error) {
          showErrorToast(res.error.message)
        } else {
          showSuccessToast('Author has been deleted')
        }
      })
    };
    
    
 


   
  useEffect(() => {
    if (authorStore?.authors.items) {
        let aux = authorStore.authors.items.map(e => {
            return {
                ...e,
                
            }
        })
        console.log(aux);
        setRows(aux)
    }
}, [authorStore.authors.items])

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
              onClick={() => navigate(`detail/${id}`)}
              color="success" />,
  
            <GridActionsCellItem
              icon={<AiFillDelete />}
              label="Delete"
              onClick={toggleShow}

              // onClick={() => {handleDeleteauthorClick(id)}}
              // should open popup to ask are u sure delete this user (yes/no)
              color="error" />,
  
          ];
        },
      },
    ];
    
   
    // const handleDeleteClick = (id) => {
      
    // };

   
  // console.log(authorStore.authors.items,'test');


    return (


        <div>
            <div className='container'>
                <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List Author</h2>
                <hr></hr>
                
                <AddButton title={"Add author"} mb={20} onClick={()=>{navigate("create")}}/>
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
              
                { <Modal  bodOfDelete={"are"} basicModal={basicModal}  ofDelete={true} onClick={() => {handleDeleteauthorClick(id)}}/> }
            </div>
        </div>


    )
}

export default AuthorList
