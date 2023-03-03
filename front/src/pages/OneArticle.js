import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { identifier } from '../constants/identifier/identifier'
import { fetchArticleByBranch } from '../store/article'


function OneArticle() {
  const dispatch=useDispatch()
  const articleStore=useSelector(state=>state.article)
  const {article}=articleStore
  const {i18n}=useTranslation()
  const { articleId } = useParams()

  useEffect(() => {
   dispatch(fetchArticleByBranch(articleId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div >
      <div>
        <div className="fw-bold">
          <h2 className='text-center ' >
            {article?.article?.name}
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="row">


          <div className="col-md-4 ">
            <img src={article?.article?.cover} alt="Thumbnail Image" className="img-thumbnail" />
          </div>
          <div className='col-md-6'>
            <h4 className='text-uppercase text-black-50'>
              {article?.article.category.nameEn}
            </h4>
            <h1>

            </h1>
          </div>
        </div>

      </div>


    </div>
  )
}

export default OneArticle