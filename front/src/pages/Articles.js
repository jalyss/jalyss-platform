import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import { fetchArticles, fetchArticlesByBranch } from '../store/article'
import { fetchArticleTypes } from '../store/articleType'
import category, { fetchCategories } from '../store/category'
import { fetchPublishingHouses } from '../store/publishingHouse'
import { fetchAuthors } from '../store/author'
import { identifier } from '../constants/identifier/identifier'
import Accordion from '../components/Accordion'
import '../assets/styles/filters.css'

import useMeta from '../hooks/useMeta'
import DocumentMeta from "react-document-meta";

function Articles() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const meta = useMeta(t('articles.pageName'), t('articles.pageDescription'))

  const { categoryId } = useParams()
  const articleStore = useSelector((state) => state.article)
  const categoryStore = useSelector((state) => state.category)
  const publishingHouseStore = useSelector((state) => state.publishingHouse)
  const authorStore=useSelector((state)=> state.author)
  const articleTypeStore = useSelector((state) => state.articleType)
  const removeItemHandler=(item) =>{
    dispatch({type:'cart_remove_item', payload: item})
  }


  const lg = i18n.languages[0] === 'en'
  const [filters, setFilters] = useState({
    categories: [],
    publishingHouses: [],
    articleTypes: [],
    authors: [],
    min: null,
    max: null,
  })
  

  useEffect(() => {
    dispatch(fetchArticlesByBranch({ ...filters, identifier }))
  }, [dispatch, filters])

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchPublishingHouses())
    dispatch(fetchArticleTypes())
    dispatch(fetchAuthors())

    if (categoryId) {
      setFilters((Filters) => ({ ...Filters, categories: [categoryId] }))
    }
  }, [categoryId, dispatch])


  return (
    <DocumentMeta {...meta} className="container-fluid">
      <div>
        <p>{t('articles.title')}</p>
      </div>
      <div className="d-flex p-2 ">
        <div className='filters'>
          <Accordion
            title={t('articles.filter.category')}
            content={
              <>
                {categoryStore.categories.items.map((element, i) => (
                  <div className={`d-flex align-items-center`} key={i}>
                    <input
                      className="form-check-input m-2"
                      type="checkbox"
                      defaultChecked={categoryId === element.id}
                      onChange={(e) => {
                        e.target.checked === true
                          ? setFilters((Filter) => ({
                            ...Filter,
                            categories: [...Filter.categories, element.id],
                          }))
                          : setFilters((Filter) => ({
                            ...Filter,
                            categories: Filter.categories.filter(
                              (elem, j) => elem !== element.id
                            ),
                          }))
                      }}
                    />
                    <label className="form-check-label">
                      {lg ? element.nameEn : element.nameAr}
                    </label>
                  </div>
                ))}
              </>
            }
          />

          <Accordion
            title={t('articles.filter.articleType')}
            content={
              <>
                {articleTypeStore.articleTypes.items.map((element, i) => (
                  <div className={`d-flex align-items-center`} key={i}>
                    <input
                      className="form-check-input m-2"
                      type="checkbox"
                      onChange={(e) => {
                        e.target.checked === true
                          ? setFilters((Filter) => ({
                            ...Filter,
                            articleTypes: [
                              ...Filter.articleTypes,
                              element.id,
                            ],
                          }))
                          : setFilters((Filter) => ({
                            ...Filter,
                            articleTypes: Filter.articleTypes.filter(
                              (elem, j) => elem !== element.id
                            ),
                          }))
                      }}
                    />
                    <label className="form-check-label">
                      {lg ? element.nameEn : element.nameAr}
                    </label>
                  </div>
                ))}
              </>
            }
          />

          <Accordion
            title={t('articles.filter.publishingHouse')}
            content={
              <>
                {publishingHouseStore.publishingHouses.items.map(
                  (element, i) => (
                    <div className={`d-flex align-items-center`} key={i}>
                      <input
                        className="form-check-input m-2"
                        type="checkbox"
                        onChange={(e) => {
                          e.target.checked === true
                            ? setFilters((Filter) => ({
                              ...Filter,
                              publishingHouses: [
                                ...Filter.publishingHouses,
                                element.id,
                              ],
                            }))
                            : setFilters((Filter) => ({
                              ...Filter,
                              publishingHouses:
                                Filter.publishingHouses.filter(
                                  (elem, j) => elem !== element.id
                                ),
                            }))
                        }}
                      />
                      <label className="form-check-label">{element.name}</label>
                    </div>
                  )
                )}
              </>
            }
          />

          <Accordion
            title='Authors'
            content={
              <>
                {authorStore.authors.items.map(
                  (element, i) => (
                    <div className={`d-flex align-items-center`} key={i}>
                      <input
                        className="form-check-input m-2"
                        type="checkbox"
                        onChange={(e) => {
                          e.target.checked === true
                            ? setFilters((Filter) => ({
                              ...Filter,
                              authors: [
                                ...Filter.authors,
                                element.id,
                              ],
                            }))
                            : setFilters((Filter) => ({
                              ...Filter,
                              authors:
                                Filter.authors.filter(
                                  (elem, j) => elem !== element.id
                                ),
                            }))
                        }}
                      />
                      <label className="form-check-label">{element.nameEn}:{element.nameAr}</label>
                    </div>
                  )
                )}
              </>
            }
          />
        </div>

        <div className="d-flex flex-wrap px-3 ">
          {articleStore.articles.items.map((element, index) => {
            return <ArticleCard key={index} article={element}  />
          })}
        </div>
      </div>
      <div>
        <button
          onClick={() => setFilters((Filters) => ({ ...Filters, skip: 10 }))}
        >
          next
        </button>
      </div>

    </DocumentMeta>

  )
}

export default Articles
