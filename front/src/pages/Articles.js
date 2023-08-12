// import Slider from '@mui/material/Slider';

import Slider from 'rc-slider'
import React, { Fragment, useEffect, useMemo, useState,useRef} from 'react'
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
  const containerRef =useRef(null)
  const { categoryId } = useParams()
  const articleStore = useSelector((state) => state.article)
  const categoryStore = useSelector((state) => state.category)
  const publishingHouseStore = useSelector((state) => state.publishingHouse)
  const authorStore = useSelector((state) => state.author)
  const articleTypeStore = useSelector((state) => state.articleType)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [price, setPrice] = useState([1, 1000])
  const [filters, setFilters] = useState({
    categories: [],
    publishingHouses: [],
    articleTypes: [],
    authors: [],
    lte:null,
    gte: null,
    skip: 0,
  })

  console.log(publishingHouseStore.publishingHouses.items,"publishingHouse")

  const lg = i18n.languages[0] === 'en'
  const [showFilters, setShowFilters] = useState(false)


  console.log('lenaa',filters)
  console.log('lenaa ',price)

 

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
      setFilters((Filters) => ({...Filters, categories: [categoryId]}))
    }
  }, [categoryId])

  const onMouseMoveHandler = (event) => {
    if (containerRef.current){
      const rect = containerRef.current.getBoundingClientRect()
      console.log("Element's bounding rect:", rect);  
  }
}
console.log(containerRef, 'yalaa')
  const Filters = () => {
   
    return (
      <div className="filters" >
        <Fragment >
          <Accordion  
            title={t('filter.Price')}
            content={
              <div className="px-3 pt-3"  ref={containerRef} onMouseMove={onMouseMoveHandler} >
                <Slider 
                  range
                  draggableTrack={false}
                  min={1}
                  max={1000}
                  defaultValue={[1000,1]} 
                  tipFormatter={(value) =>`TND${value}`}
                  allowCross={false}
                  value={price}
                  onChange={(price)=> {
                    setPrice(price)
                    setFilters((Filters) => ({
                     ...Filters,
                      gte: price[0],
                      lte: price[1],
                    }))
                  }}
                />
                 {/* <Slider
                 range
                 draggableTrack={false}
                 max={1000}
                 defaultValue={1000} 
                 tipFormatter={(value) =>`TND${value}`}
                 allowCross={false}
                 value={price}
                 onChange={(price)=> {
                   setPrice(price)
                   setFilters((Filters) => ({
                    ...Filters,
                    gte: price[0],
                    lte: price[1],
                   }))
                 }}                        
      /> */}
                <div className="d-flex justify-content-between mt-1">
                  <p>{price[0]}</p>
                  <p>{price[1]}</p>
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
                        ? setFilters((Filter) =>({
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

  console.log(filters.categories,"ctaegories")
  console.log(groupedArticles,"grpdArticles")
  console.log(articleStore.articles.items,"article store")

  return (
    <DocumentMeta {...meta} className="container-fluid">
      <div>
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
                 <p style={{fontSize: '20px',
  color: '#333',
  padding: '5px 10px',
  backgroundColor:'#f0f0f0',
  borderRadius: '5px'
  }}>{element[0].article.category[lg ? 'nameEn' : 'nameAr']}</p>

   <div className='d-flex flex-wrap px-4 '>
  {element.map((el, index) => (
    <div
      style={{maxWidth:'100%'}}
      key={el.id}
    >
        <ArticleCard article={el}/>
        
    </div>
  ))}
</div>

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
            setFilters((Filters) => ({ ...Filters, skip: filters.skip - 5}))
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






