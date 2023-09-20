import { MdOutlineAddShoppingCart } from 'react-icons/md'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '../components/Commun/Rating'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Grid} from '@mui/material'; 
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { createArticleByBranchRating, fetchArticleByBranch, fetchArticleByBranchRating } from '../store/article'
import '../assets/styles/book.css'
import useMeta from '../hooks/useMeta'
import DocumentMeta from 'react-document-meta'

import { useCart } from 'react-use-cart';
import axios from 'axios';
import { showErrorToast ,showSuccessToast} from '../utils/toast';

function OneArticle() {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch()
  const articleStore = useSelector((state) => state.article)
  const { article } = articleStore
  const { t } = useTranslation()
  const { articleId } = useParams()
  const { articleByBranchId } = useParams()
  const [meta, setMeta] = useState({ title: '', description: '' })
  const { addItem } = useCart();

  useEffect(() => {
    dispatch(fetchArticleByBranch(articleId))
    .then(res=>{if(!res.error){
    console.log(useMeta(res.data?.title, res.data?.shortDescription));
    console.log(res.payload.article.title)
    setMeta(useMeta(res.payload.article.title, article?.shortDescription));
        }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  console.log(article)
  useEffect(() => {
    if (article)
      setMeta(useMeta(article.article.title, article.article?.shortDescription))
  }, [article])

  const handleRatingChange = async (rate) => {
    dispatch(createArticleByBranchRating({ rate, articleByBranchId: articleId, commit: '' }))
        .then((res) => {
          if (!res.error) {
            showSuccessToast("Rating has been saved");
          } else {
            showErrorToast("alredy saved");
          }
        })
  };


  return (
    <DocumentMeta {...meta} className="container-fluid justify-content-center" >
      <Grid>
       <Grid container justifyContent="center">
           <Grid >

             <img
               src={article?.article?.cover?.path}
               alt={article?.article?.title}
              style={{
              color:'trasparent',
              baackgroundcolor:'trasparent',
              marginTop:50,
              marginRight:50,
             
               }}
              />
       </Grid>
        <Grid  justifyContent="center">          
    <div className="book-content-info ">
              <h1 className="book-title">{article?.article?.title}</h1>
              <TableContainer className="mx-auto mt-3" style={{ width: '400px', marginBottom: '50px' }} component={Paper}>
              <Table aria-label="simple table">    
             <TableRow>
              <TableCell>
               <Rating
              rating={article?.rating}
              onChangeRate={handleRatingChange}
              edit={true}
            />
            </TableCell>
            </TableRow>
 
        <TableBody>
          <TableRow>
            <TableCell className="fw-bold" align="left">{t('OneArticle.publishingHouse')}</TableCell>
            <TableCell align="right">{article?.article?.publishingHouse.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="fw-bold" align="left">{t('OneArticle.category')}</TableCell>
            <TableCell align="right">{article?.article?.category.nameAr}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="fw-bold" align="left">{t('OneArticle.weight')}</TableCell>
            <TableCell align="right">{article?.article?.weight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="fw-bold" align="left">{t('OneArticle.nPages')}</TableCell>
            <TableCell align="right">{article?.article?.pageNumber}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="book-add-to-cart grid gap-0 row-gap-3">
              <input
                min="1"
                max="100"
                defaultValue="1"
                type="number"
                className="book-add-to-cart-input"
              />

              <button className="book-add-to-cart-btn d-flex align-items-center"
              style={{
                marginLeft:'100px'
              }}
                onClick={() => addItem(article)}
              >
                <MdOutlineAddShoppingCart size="30px" color="p" />
                <p className="m-0">{t('OneArticle.addCart')}</p>
              </button>
            </div>
            <p className="book-description">{article?.article?.longDescription}</p>
                    </TableContainer>
                     </div>
       
     </Grid>
      </Grid>    
     </Grid>
    </DocumentMeta>
  )
}

export default OneArticle
