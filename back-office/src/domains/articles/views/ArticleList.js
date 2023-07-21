import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

import isEnglish from "../../../helpers/isEnglish";
import { useNavigate } from "react-router-dom";
import { AiFillEdit ,AiOutlineEye ,AiFillDelete } from "react-icons/ai";
import { IoIosPersonAdd } from "react-icons/io";
import Modal from "../../../components/Commun/Modal";

import { fetchArticles } from "../../../store/article";

function ArticleList() {
  const articleStore = useSelector((state) => state.article);
  const dispatch = useDispatch();
  const isEng = isEnglish();
  const [basicModal, setBasicModal] = useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const handleDeleteArticleClick = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    showSuccessToast("Article has been deleted");
    toggleShow();
  };

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);
  useEffect(() => {
    if (articleStore?.articles.items) {
      let aux = articleStore.articles.items.map((e) => {
        return {
          ...e,
          category: e?.category?.nameAr,
          publishingHouse: e?.publishingHouse?.name,
          price: e?.ArticlesByBranch?.price,
          stock: e?.ArticlesByBranch?.stock,
        };
      });
      console.log(aux);
      setRows(aux);
    }
  }, [articleStore.articles.items]);
  console.log(articleStore.articles.items);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "title",
      headerName: "Title",
      width: 130,
      editable: true,
    },
    {
      field: "code",
      headerName: "Code ",

      width: 100,
      sortable: true,
    },

    {
      field: "category",
      headerName: "Category",
      width: 110,
      editable: true,
      sortable: false,
    },
    {
      field: "publishingHouse",
      headerName: "Publishing House ",

      width: 120,
      sortable: false,
    },
    {
      field: "price",
      headerName: "Price ",
      width: 100,
    },

    {
      field: "stock",
      headerName: "Stock",
      width: 100,
      editable: true,
      sortable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiFillEdit />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`editArticle/${id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<AiOutlineEye />}
            label="Add"
            className="textPrimary"
            onClick={() => navigate(`detailArticle/${id}`)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShow();
              setSelectedArticleId(id);
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
        <Button
          type="button"
          onClick={() => navigate("create")}
          variant="outlined"
          endIcon={<IoIosPersonAdd />}
        >
          <span className="btn btn-sm ">Add Article</span>
        </Button>
      </div>
      <div className="position-relative">
        Articles List
        <Box sx={{ height: 600, width: "100%" }}>
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
        <Modal
            bodOfDelete="Are you sure you want to delete this article?"
            basicModal={basicModal}
            ofDelete={true}
            toggleShow={toggleShow}
            confirm={() => handleDeleteArticleClick(selectedArticleId)}
          />
      </div>
    </div>
  );
}

export default ArticleList;
