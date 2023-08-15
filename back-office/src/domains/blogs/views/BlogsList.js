import { GridActionsCellItem } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import isEnglish from "../../../helpers/isEnglish";
import { fetchBlogs, removeBlog } from "../../../store/blogs";
import Modal from "../../../components/Commun/Modal";
import AutoCompleteFilter from "../../../components/Commun/AutoCompleteFilter";

function BlogsList() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs.items);
  const count = useSelector((state) => state.blogs.blogs.count);
  const isEng = isEnglish();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);
  const [params, setParams] = useState({skip:0,take:10});
 
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [selectedSituation, setSelectedSituation] = useState([]);
  const [rows, setRows] = useState([]);

  const colorReference = "#48184c";
  const situations = [
    { value: "confirmed", label: "confirmed" },
    { value: "refused", label: "refused" },
    { value: "pending", label: "pending" },
  ];
  const buttonStyle = {
    backgroundColor: colorReference,
    color: 'white',
    borderRadius: '5px',
  };
  const columns = [
    {
      field: "title",
      headerName: "Blog Title",
      width: 150,
      editable: false,
    },
    {
      field: "authorName",
      headerName: "Author Name",
      width: 150,
      editable: false,
      valueGetter: (params) => `${params.row.author.fullNameEn}`,
    },
    { field: "createdAt", headerName: "Date", width: 150, editable: false },
    {
      field: "blogCategory",
      headerName: "Category",
      width: 150,
      editable: false,
      valueGetter: (params) => `${params.row.category.nameEn}`,
    },
    {
      field: "confirm",
      headerName: "Situation",
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

  useEffect(() => {
    dispatch(fetchBlogs({ ...params,confirm:selectedSituation }));
  }, [dispatch, params,selectedSituation]);
  useEffect(() => {
    // let auxRows;
    // if (selectedSituation.length)
    //   auxRows = blogs.filter((item) =>
    //     selectedSituation.includes(item.confirm)
    //   );
    // else auxRows = blogs;
    setRows(blogs);
  }, [ blogs]);

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };
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
    navigate(`detail/${blogId}`);
  };
  console.log(blogs,params.skip,params.take);

  return (
    <div>
      <div className="container">
        <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List of people who create blogs</h2>
        <hr></hr>

        <AutoCompleteFilter
        value={selectedSituation}
          data={situations}
          valueOptionName="value"
          labelOptionName="label"
          label="Filter by situation"
          onChange={(e) => setSelectedSituation(e)}
          multiple
        />

        <AutoCompleteFilter
          data={situations}
          valueOptionName="value"
          labelOptionName="label"
          label="Filter by situation"
          onChange={(selectedValue) => setSelectedSituation(selectedValue?.value)}
        />

        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: params.take,
                },
              },
            }}
            onPaginationModelChange={(e) => {
             setParams({...params,take:+e.pageSize*(+e.page+1)})
            }}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
            rowCount={count}
          />
        </Box>
        <Modal
          bodOfDelete={"are you sure you want to delete this blog?"}
          basicModal={basicModal}
          toggleShow={toggleShow}
          ofDelete={true}
          confirm={() => {
            handleDeleteBlog();
          }}
        />
      </div>
    </div>
  );
}

export default BlogsList;
