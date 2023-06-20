import Slider from 'rc-slider'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
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
import Accordion from '../components/Commun/Accordion'
import '../assets/styles/filters.css'
import useMeta from '../hooks/useMeta'
import DocumentMeta from 'react-document-meta'
import { BsFilterSquare } from 'react-icons/bs'
import 'rc-tooltip/assets/bootstrap.css'
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import 'rc-slider/assets/index.css'
import { groupBy, isEmpty, map } from 'lodash'
import HorizontalMenu from '../components/Commun/DragContainter'

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
          <Accordion
            title={t('filter.price')}
            content={
              <div className="px-3 pt-3">
                <Slider
                  range
                  draggableTrack
                  min={0}
                  max={1000}
                  defaultValue={[1, 1000]}
                  tipFormatter={(value) => `TND${value}`}
                  allowCross={false}
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
                <div className="d-flex justify-content-between mt-1">
                  <p>{price[1]}</p>
                  <p>{price[0]}</p>
                </div>
              </div>
            }
          />
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

  const groupedArticles = useMemo(
    () =>
      groupBy(articleStore.articles.items, (item) => item.article.categoryId),
    [articleStore.articles.items]
  )

  console.log(filters.categories)
  console.log(groupedArticles)
  console.log(articleStore.articles.items)

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
        <div className="px-3">
          {!isEmpty(filters.categories) ? (
            map(groupedArticles, (element) => (
              <>
                <p>{element[0].article.category[lg ? 'nameEn' : 'nameAr']}</p>

                <HorizontalMenu>
                  {element.map((el) => (
                    <div
                      key={el.id}
                      className="horizontal-item horizontal-item-article"
                    >
                      <ArticleCard article={el} />
                    </div>
                  ))}
                </HorizontalMenu>
              </>
            ))
          ) : (
            <div className="d-flex flex-wrap px-3 ">
              {articleStore.articles.items.map((element, index) => (
                <ArticleCard key={index} article={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mb-3 ">
        <button
          className="bg-yellow px-4 py-2  border-0  mx-2 "
          onClick={() =>
            filters.skip > 0 &&
            setFilters((Filters) => ({ ...Filters, skip: filters.skip - 5 }))
          }
        >
          {lg ? <RiArrowLeftSLine /> : <RiArrowRightSLine />} {t('prev')}
        </button>
        <button
          className=" bg-yellow px-4 py-2 border-0 mx-2"
          onClick={() =>
            setFilters((Filters) => ({ ...Filters, skip: filters.skip + 5 }))
          }
        >
          {t('next')} {lg ? <RiArrowRightSLine /> : <RiArrowLeftSLine />}
        </button>
      </div>
    </DocumentMeta>
  )
}

export default Articles
