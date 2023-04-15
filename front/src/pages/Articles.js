import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import { fetchArticlesByBranch } from '../store/article'
import { fetchArticleTypes } from '../store/articleType'
import { fetchCategories } from '../store/category'
import { fetchPublishingHouses } from '../store/publishingHouse'
import { fetchAuthors } from '../store/author'
import { identifier } from '../constants/identifier/identifier'
import Accordion from '../components/Accordion'
import '../assets/styles/filters.css'
import useMeta from '../hooks/useMeta'
import DocumentMeta from 'react-document-meta'
import { BsFilterSquare } from 'react-icons/bs'
import 'rc-tooltip/assets/bootstrap.css'


function Articles() {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const meta = useMeta(t('articles.pageName'), t('articles.pageDescription'))

  const { categoryId } = useParams()
  const articleStore = useSelector((state) => state.article)
  const categoryStore = useSelector((state) => state.category)
  const publishingHouseStore = useSelector((state) => state.publishingHouse)
  const authorStore = useSelector((state) => state.author)
  const articleTypeStore = useSelector((state) => state.articleType)

  const [price, setPrice] = useState([1, 1000])
  const [filters, setFilters] = useState({
    categories: [],
    publishingHouses: [],
    articleTypes: [],
    authors: [],
    lte: null,
    gte: null,
    skip: 0,
  })
  console.log(publishingHouseStore)

  const lg = i18n.languages[0] === 'en'
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(fetchArticlesByBranch({ ...filters, identifier }))
  }, [dispatch, filters])

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchPublishingHouses())
    dispatch(fetchArticleTypes())
    dispatch(fetchAuthors())
  }, [dispatch])

  useEffect(() => {
    if (categoryId) {
      setFilters((Filters) => ({ ...Filters, categories: [categoryId] }))
    }
  }, [categoryId])

  const Filters = () => {
    return (
      <div className="filters ">
        <Fragment>
          <div className="accordion">
            <Slider
              range
              marks={{
                1: `TND 1`,
                1000: `TND 1000`,
              }}
              min={0}
              max={1000}
              defaultValue={[1, 1000]}
              tipFormatter={(value) => `TND${value}`}
              value={price}
              onChange={(price) => {
                setPrice(price)
                setFilters((Filters) => ({
                  ...Filters,
                  gte: price[0],
                  lte: price[1],
                }))
              }}
            />
          </div>
        </Fragment>
        <Accordion
          title={t('filter.category')}
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
                    checked={filters.categories.includes(element.id)}
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
          title={t('filter.articleType')}
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
                          articleTypes: [...Filter.articleTypes, element.id],
                        }))
                        : setFilters((Filter) => ({
                          ...Filter,
                          articleTypes: Filter.articleTypes.filter(
                            (elem, j) => elem !== element.id
                          ),
                        }))
                    }}
                    checked={filters.articleTypes.includes(element.id)}
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
          title={t('filter.publishingHouse')}
          content={
            <>
              {publishingHouseStore.publishingHouses.items.map((element, i) => (
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
                          publishingHouses: Filter.publishingHouses.filter(
                            (elem, j) => elem !== element.id
                          ),
                        }))
                    }}
                    checked={filters.publishingHouses.includes(element.id)}
                  />
                  <label className="form-check-label">{element.name}</label>
                </div>
              ))}
            </>
          }
        />

        <Accordion
          title={t('filter.author')}
          content={
            <>
              {authorStore.authors.items.map((element, i) => (
                <div className={`d-flex align-items-center`} key={i}>
                  <input
                    className="form-check-input m-2"
                    type="checkbox"
                    onChange={(e) => {
                      e.target.checked === true
                        ? setFilters((Filter) => ({
                          ...Filter,
                          authors: [...Filter.authors, element.id],
                        }))
                        : setFilters((Filter) => ({
                          ...Filter,
                          authors: Filter.authors.filter(
                            (elem, j) => elem !== element.id
                          ),
                        }))
                    }}
                    checked={filters.authors.includes(element.id)}
                  />
                  <label className="form-check-label">
                    {element.nameEn}({element.nameAr})
                  </label>
                </div>
              ))}
            </>
          }
        />
      </div>
    )
  }

  return (
    <DocumentMeta {...meta} className="container-fluid">
      <div>
        <p>{t('title')}</p>
        <div className="filters-button">
          <BsFilterSquare onClick={() => setShowFilters(true)} />
        </div>
      </div>

      <Offcanvas
        show={showFilters}
        placement="end"
        onHide={() => setShowFilters(false)}
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <Filters /> 
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-flex p-2 ">
        <div className="responsive-filters">
          <Filters /> 
        </div>
        <div className="d-flex flex-wrap px-3 ">
          {articleStore.articles.items.map((element, index) => {
            return <ArticleCard key={index} article={element} />
          })}
        </div>
      </div>
      <div>
        <button
          onClick={() =>
            setFilters((Filters) => ({ ...Filters, skip: filters.skip + 5 }))
          }
        >
          Next
        </button>
      </div>
    </DocumentMeta>
  )
}

export default Articles


