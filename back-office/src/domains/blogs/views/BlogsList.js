import { GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import isEnglish from '../../../helpers/isEnglish';
import { fetchBlogs,removeBlog } from '../../../store/blogs';
import Modal from '../../../components/Commun/Modal';
import AutoCompleteFilter from '../../../components/Commun/AutoCompleteFilter';

function BlogsList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);
  const [skip, setSkip] = useState(0);
  const take = 50;
  const trend = 0;
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [selectedSituation, setSelectedSituation] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const colorReference = '#48184c';
  const situations = [
    { value: 'confirmed', label: 'confirmed' },
    { value: 'refused', label: 'refused' },
    { value: 'pending', label: 'pending' },
  ];

  const blogs = useSelector((state) => state.blogs.blogs.items);

  function getDataByConfirmStatus(dataArray, confirmStatus) {
   return confirmStatus?
     dataArray.filter((item) => item.confirm === confirmStatus)
    :blogs
  }
  console.log(selectedSituation,'frf')
  const confirmedPosts = getDataByConfirmStatus(blogs, selectedSituation); 
    const rows = confirmedPosts
    ?.map((elem) => ({
      id: elem.id,
      name: elem.author.fullNameEn,
      blogTitle: elem.title,
      articleCategory: elem.category.nameEn,
      date: elem.createdAt,
      content: elem.content,
      situation: elem.confirm,
      reason: elem.reason,
    }))
    .filter((elem) => {
      if (!selectedSituation) {
        // If no situation is selected, show all data
        return true;
      } else {
        // Filter the data based on the selected situation
        console.log(selectedSituation,"tiihaya");
        return elem.situation.toLowerCase() === selectedSituation.toLowerCase();
      }
    });

  useEffect(() => {
    dispatch(fetchBlogs({ take, skip }));
  }, [dispatch, skip]);

  const buttonStyle = {
    backgroundColor: colorReference,
    color: 'white',
    borderRadius: '5px',
  };
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    {
      field: 'blogTitle',
      headerName: 'Blog Title',
      width: 150,
      editable: false,
    },
    {
      field: 'articleCategory',
      headerName: 'Category',
      width: 150,
      editable: false,
    },
    { field: 'date', headerName: 'Date', width: 150, editable: false },
    {
      field: 'situation',
      headerName: 'Situation',
      width: 150,
      editable: false,
    },
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
            onClick={toggleShow}
            color="error"
          />,
        ];
      },
    },
  ];

  const isEng = isEnglish();
  const Navigate = useNavigate();
  const handleDeleteBlog = (id) => {
    dispatch(removeBlog(id)).then((res) => {
      if (!res.error) {
        setBasicModalDelete(!basicModalDelete);
        showSuccessToast("WorkSpace has been deleted");
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const handleAddClick = (blogId) => {
    Navigate(`detail/${blogId}`);
  };

  return (
    <div>
      <div className="container">
        <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List of people who create blogs</h2>
        <hr></hr>

        <AutoCompleteFilter
          data={situations}
          valueOptionName="value"
          labelOptionName="label"
          label="Filter by situation"
          onChange={(e) => setSelectedSituation(e[0])}
        />

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
        <Modal bodOfDelete={'are you sure you want to delete this blog?'} basicModal={basicModal} toggleShow={toggleShow} ofDelete={true} confirm={()=>{handleDeleteBlog()}}/>
      </div>
    </div>
  );
}

export default BlogsList;