// import Slider from '@mui/material/Slider';

import Slider from "rc-slider";
import React, { Fragment, useEffect, useMemo, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { fetchArticlesByBranch } from "../store/article";
import { fetchArticleTypes } from "../store/articleType";
import { fetchCategories } from "../store/category";
import { fetchPublishingHouses } from "../store/publishingHouse";
import { fetchAuthors } from "../store/author";
import { identifier } from "../constants/identifier/identifier";
import Accordion from "../components/Commun/Accordion";
import "../assets/styles/filters.css";
import useMeta from "../hooks/useMeta";
import DocumentMeta from "react-document-meta";
import { BsFilterSquare } from "react-icons/bs";
import "rc-tooltip/assets/bootstrap.css";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import "rc-slider/assets/index.css";
import { groupBy, isEmpty, map } from "lodash";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
import { Apps, AppsRounded } from "@mui/icons-material";
import ArticleCardHorizontal from "../components/ArticleCardHorizontal";

function Articles() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const meta = useMeta(t("articles.pageName"), t("articles.pageDescription"));
  const lg = i18n.languages[0] === "en";
  const containerRef = useRef(null);
  const { categoryId } = useParams();
  const articleStore = useSelector((state) => state.article);
  const categoryStore = useSelector((state) => state.category);
  const publishingHouseStore = useSelector((state) => state.publishingHouse);
  const authorStore = useSelector((state) => state.author);
  const articleTypeStore = useSelector((state) => state.articleType);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(8);
  const [price, setPrice] = useState([1, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [showContentList, setShowContentList] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    publishingHouses: [],
    articleTypes: [],
    authors: [],
    lte: null,
    gte: null,
    skip: 0,
    take: 12,
  });

  useEffect(() => {
    dispatch(fetchArticlesByBranch({ ...filters, identifier }));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPublishingHouses());
    dispatch(fetchArticleTypes());
    dispatch(fetchAuthors());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      setFilters((Filters) => ({ ...Filters, categories: [categoryId] }));
    } else setFilters((Filters) => ({ ...Filters, categories: [] }));
  }, [categoryId]);

  const onMouseMoveHandler = (event) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      console.log("Element's bounding rect:", rect);
    }
  };

  const handleFormatClick = (show) => {
    setShowContentList(show);
  };

  const Filters = () => {
    return (
      <div className="filters">
        {!categoryId && (
          <Accordion
            title={t("filter.category")}
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
                            }));
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
        )}

        <Accordion
          title={t("filter.articleType")}
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
                          }));
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
          title={t("filter.publishingHouse")}
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
                          }));
                    }}
                    checked={filters.publishingHouses.includes(element.id)}
                  />
                  <label className="form-check-label">{element.name}</label>
                </div>
              ))}
            </>
          }
        />

        {/* <Accordion
          title={t("filter.author")}
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
                          }));
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
        /> */}
      </div>
    );
  };

  return (
    <DocumentMeta {...meta} className="container-fluid">
      <div>
        <div className="filters-button">
          <button className="Bfilter" onClick={() => setShowFilters(true)}>
            Filter
          </button>
        </div>
      </div>

      <Offcanvas
        show={showFilters}
        placement="end"
        onHide={() => setShowFilters(false)}
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <Fragment>
            <Accordion
              title={t("filter.Price")}
              content={
                <div
                  className="px-3 pt-3"
                  ref={containerRef}
                  onMouseMove={onMouseMoveHandler}
                >
                  <Slider
                    range
                    draggableTrack={false}
                    min={1}
                    max={1000}
                    defaultValue={[1000, 1]}
                    tipFormatter={(value) => `TND${value}`}
                    allowCross={false}
                    value={price}
                    onChange={(price) => {
                      setPrice(price);
                      setFilters((Filters) => ({
                        ...Filters,
                        gte: price[0],
                        lte: price[1],
                      }));
                    }}
                  />

                  <div className="d-flex justify-content-between mt-1">
                    <p>{price[0]}</p>
                    <p>{price[1]}</p>
                  </div>
                </div>
              }
            />
          </Fragment>
          <Filters />
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-flex p-2 ">
        <div className="responsive-filters">
          <Fragment>
            <Accordion
              title={t("filter.Price")}
              content={
                <div
                  className="px-3 pt-3"
                  ref={containerRef}
                  onMouseMove={onMouseMoveHandler}
                >
                  <Slider
                    range
                    draggableTrack={false}
                    min={1}
                    max={1000}
                    defaultValue={[1000, 1]}
                    tipFormatter={(value) => `TND${value}`}
                    allowCross={false}
                    value={price}
                    onChange={(price) => {
                      setPrice(price);
                      setFilters((Filters) => ({
                        ...Filters,
                        gte: price[0],
                        lte: price[1],
                      }));
                    }}
                  />
                  <div className="d-flex justify-content-between mt-1">
                    <p>{price[0]}</p>
                    <p>{price[1]}</p>
                  </div>
                </div>
              }
            />
          </Fragment>
          <Filters />
        </div>

        <div className="w-100">
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "start",
              marginLeft: "10px",
            }}
          >
            <FormatListBulleted
              className="articleicons"
              onClick={() => handleFormatClick(true)}
            />
            <Apps
              className="articleicons"
              onClick={() => handleFormatClick(false)}
              style={{ marginLeft: "10px" }}
            />
          </div>
          {!showContentList ? (
             <div className="d-flex flex-wrap px-3 ">
              {articleStore.articles.items.map((element) => (
               
                  <ArticleCard article={element} />
               
              ))}
            </div>
          ) : (
            <div className="d-flex flex-column  mb-3 px-3 ">
              {articleStore.articles.items.map((element) => (
                <ArticleCardHorizontal article={element} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="d-flex justify-content-center mb-3 "
        style={{ marginLeft: "200px" }}
      >
        <button
          style={{
            color: "white",
            borderRadius: "5px",
            backgroundColor: "rgba(70, 4, 74, 0.781)",
          }}
          className="bg-yellow px-4 py-2  border-0  mx-2 "
          onClick={() => setFilters({ ...filters, skip: filters.skip - 12 })}
          disabled={filters.skip === 0}
        >
          {lg ? <RiArrowLeftSLine /> : <RiArrowRightSLine />} {t("back")}
        </button>
        <button
          style={{
            color: "white",
            borderRadius: "5px",
            backgroundColor: "rgba(70, 4, 74, 0.781)",
          }}
          className="bg-yellow px-4 py-2 border-0 mx-2"
          onClick={() => setFilters({ ...filters, skip: filters.skip + 12 })}
          disabled={
            currentPage * pageSize >= articleStore.articles.items.length
          }
        >
          {t("next")} {lg ? <RiArrowRightSLine /> : <RiArrowLeftSLine />}
        </button>
      </div>
    </DocumentMeta>
  );
}

export default Articles;
