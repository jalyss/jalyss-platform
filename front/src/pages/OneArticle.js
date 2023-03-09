import axios from 'axios'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '../components/Rating'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { identifier } from '../constants/identifier/identifier'
import { fetchArticleByBranch } from '../store/article'
import '../assets/styles/book.css'
import useMeta from '../hooks/useMeta'
import DocumentMeta from 'react-document-meta'

import { useCart } from 'react-use-cart';

function OneArticle() {
  const dispatch = useDispatch()
  const articleStore = useSelector((state) => state.article)
  const { article } = articleStore
  const { t, i18n } = useTranslation()
  const { articleId } = useParams()
  const [meta, setMeta] = useState({ title: '', description: '' })
  const { addItem } = useCart();
  useEffect(() => {
    dispatch(fetchArticleByBranch(articleId))
    // .then(res=>{if(!res.error){

    //   console.log(useMeta(res.data?.title, res.data?.shortDescription));
    //  console.log(res.payload.article.title)
    //   setMeta(useMeta(res.payload.article.title, article?.shortDescription));
    // }})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log('meta', meta)

  console.log(article?.article)
  useEffect(() => {
    if (article)
      setMeta(useMeta(article.article.title, article.article?.shortDescription))
  }, [article])

  return (
    <DocumentMeta {...meta} className="container-fluid">
      <div className="book">
        <div className="book-content">
          <img
            src={article?.article?.cover?.path}
            alt={article?.article?.title}
            className="book-content-img"
          />
          <div className="w-100">
            <div className="book-content-info">
              <h1 className="book-title">{article?.article?.title}</h1>
            </div>
            <Rating rate={3} disabled />
            <p className="mt-2">{t('OneArticle.ref')}</p>
            <p className="mt-2">{t('OneArticle.info')}</p>
            <TableContainer sx={{ width: 400 }} component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">{t('OneArticle.publishingHouse')}</TableCell>
                    <TableCell align="right">{article?.article?.publishingHouse.name}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right" >{t('OneArticle.category')}</TableCell>
                    <TableCell align="right">{article?.article?.category.nameAr}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">{t('OneArticle.weight')}</TableCell>
                    <TableCell align="right">{article?.article?.weight}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">{t('OneArticle.nPages')}</TableCell>
                    <TableCell align="right">{article?.article?.pageNumber}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <div className="book-add-to-cart">
              <input
                min="1"
                max="100"
                defaultValue="1"
                type="number"
                className="book-add-to-cart-input"
              />

              <button className="book-add-to-cart-btn d-flex align-items-center"
              
              onClick={()=> addItem(article)}
              
              >
                
                <MdOutlineAddShoppingCart size="30px" color="p" />
                
                <p className="m-0">{t('OneArticle.addCart')}</p>

              </button>
            </div>
          </div>
        </div>
        <p className="book-description">{article?.article?.longDescription}</p>
      </div>
    </DocumentMeta>
  )
}

export default OneArticle
