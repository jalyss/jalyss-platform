import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import isEnglish from '../../../helpers/isEnglish';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { rows } from "../../../constants/blogData"
import {fetchBlogs} from '../../../store/blogs'
import Modal from "../../../components/Commun/Modal"
import DropDown from '../../../components/Commun/DropDown';


function BlogsList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);
  const [skip, setSkip] = useState(0);
  const take = 50;
  const trend= 0;
  const [basicModal,setBasicModal]=useState(false)


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch()
  const colorReference = '#48184c';

  const blogs = useSelector((state) => state.blogs.blogs.items);
console.log(blogs,'omar')
//   const blogss = blogs?.map((elem) => ({
//     id: elem.id,
//     content: elem.content,
//   }));
const rows =blogs?.map((elem) => ({

  id: elem.id, name: elem.author.fullNameEn
  , blogTitle: elem.title, articleCategory: elem.category.nameEn , date: elem.createdAt ,content:elem.content, situation: elem.confirm ,

}))

  useEffect(()=>{
    dispatch(fetchBlogs({take,skip}))
  },[dispatch,skip])


  const buttonStyle = {
    backgroundColor: colorReference,
    color: 'white',
    borderRadius: '5px',
  };
  const toggleShow=()=>{
    setBasicModal(!basicModal)
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    { field: 'blogTitle', headerName: 'Blog Title', width: 150, editable: false },
    { field: 'articleCategory', headerName: 'Category', width: 150, editable: false },
    { field: 'date', headerName: 'Date', width: 150, editable: false },
    { field: 'situation', headerName: 'Situation', width: 150, editable: false },
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
            color="success" />,

          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"

            onClick={toggleShow}
            // should open popup to ask are u sure delete this user (yes/no)
            color="error"/>,

        ];
      },
    },
  ];

  const isEng = isEnglish()
  const Navigate = useNavigate()
  // const handleDeleteClick = (id) => {

  };
  
  // };
  const handleAddClick = (blogId) => {
    Navigate(`detail/${blogId}`)
  };

  return (
    <div>
    <div className='container'>
      <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List of people who create blogs</h2>
      <hr></hr>
     <DropDown content1={'Accept'} content2={'Refuse'} content3={'Waiting'}/>
    {/* <DropdownButton style={buttonStyle} id="dropdownMenuButton" className='mb-3' title="Choose a situation ">
        <Dropdown.Item href="#">Accept</Dropdown.Item>
        <Dropdown.Item href="#">Refuse</Dropdown.Item>
        <Dropdown.Item href="#">Waiting</Dropdown.Item>
      </DropdownButton> */}
     
      <Box sx={{ height: 400, width: '100%' }}>
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
          pageSizeOptions={[10]}

          disableRowSelectionOnClick
        />
      </Box>
      <Modal  bodOfDelete={"are"} basicModal={basicModal} toggleShow={toggleShow} ofDelete={true} />
    </div>
    </div>
  )


export default BlogsList