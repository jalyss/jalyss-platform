import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import isEnglish from '../../../helpers/isEnglish';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { IoIosPersonAdd } from "react-icons/io";
import { fetchArticles } from '../../../store/article';




function ArticleList() {

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 90
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 130,
            editable: true,
        },
        {
            field: 'code',
            headerName: 'Code ',
            
            width: 100,
            sortable: true,
        },

        {
            field: 'category',
            headerName: 'Category',
            width: 110,
            editable: true,
            sortable: false,
        },
        {
            field: 'publishingHouse',
            headerName: 'Publishing House ',

            width: 120,
            sortable: false,

        },
        {
            field: 'price',
            headerName: 'Price ',
            width: 100,

        },

        {
            field: 'stock',
            headerName: 'Stock',
            width: 100,
            editable: true,
            sortable: false,

        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
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
                        icon={<AiFillDelete />}
                        label="Delete"

                        onClick={() => { handleDeleteClick(id) }}
                        // should open popup to ask are u sure delete this user (yes/no)
                        color="inherit"
                    />,

                ];
            },
        },
    ];

    const articleStore = useSelector((state) => state.article)
    const dispatch = useDispatch()
    const isEng = isEnglish()
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    useEffect(() => {
        dispatch(fetchArticles())
    }, [])
    useEffect(() => {
        if (articleStore.articles.items.length) {
            let aux = articleStore.articles.items.map(e => {
                return {
                    ...e,
                    category: e?.category?.nameAr,
                    publishingHouse: e?.publishingHouse?.name,
                    price: e?.ArticlesByBranch?.price,
                    stock: e?.ArticlesByBranch?.stock,
                }
            })
            console.log(aux);
            setRows(aux)
        }
    }, [articleStore.articles.items])
    console.log(articleStore.articles.items);
    const handleDeleteClick = (id) => {

        // dispatch(removeEmployee(id));

    };

    const handleEditClick = (id) => {
        console.log(id);
        navigate(`edit/${id}`)
    };


    return (
        <div>
            
            <div>
                <Button type='button' href='articles/create' variant="outlined" endIcon={<IoIosPersonAdd />} >
                    <span className='btn btn-sm '>
                        Add Article
                    </span>
                </Button>
            </div>
            <div className='position-relative'>Articles List
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

export default ArticleList