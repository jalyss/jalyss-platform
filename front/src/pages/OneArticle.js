import axios from 'axios'
import Rating from '../components/Rating'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import { identifier } from '../constants/identifier/identifier'
import { fetchArticleByBranch } from '../store/article'
import "../book.css"

function OneArticle() {
  const dispatch = useDispatch()
  const articleStore = useSelector(state => state.article)
  const { article } = articleStore
  const { i18n } = useTranslation()
  const { articleId } = useParams()

  useEffect(() => {
    dispatch(fetchArticleByBranch(articleId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <div className='book' >
      <div className='book-content'>
        <img src={article?.article?.cover} alt={article?.article?.title} className='book-content-img'>

        </img>
        <div className='book-content-info'>
          <h1 className='book-title'>
            {article?.article?.title}
          </h1>
        </div>
        <Rating rate={article.article?.weight} disabled />
        <div className='book-add-to-cart'>
          <input min="1" max="100" type="number" className='book-add-to-cart-input'>

          </input>
          <button className='book-add-to-cart-btn'>
            <i className='bi bi-cart-plus'>
            </i>
            Add To Cart
          </button>
        </div>
      </div>
        <p className='book-description'>
          {article?.article?.longDescription}
        </p>


    </div>
  )
}

export default OneArticle