import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { fetchArticles, fetchArticlesByBranch } from "../store/article";
import { fetchArticleTypes } from "../store/articleType";
import { fetchCategories } from "../store/category";
import { fetchPublishingHouses } from "../store/publishingHouse";
import { identifier } from "../constants/identifier/identifier";

function Articles() {
  const dispatch = useDispatch();
  const {categoryId}=useParams()
  const articleStore = useSelector((state) => state.article);
  const categoryStore = useSelector((state) => state.category);
  const publishingHouseStore = useSelector((state) => state.publishingHouse);
  const articleTypeStore = useSelector((state) => state.articleType);

  const { t, i18n } = useTranslation();
  const lg = i18n.languages[0] === 'en'
  const [filters, setFilters] = useState({
    categories: [],
    publishingHouses: [],
    articleTypes: [],
    min: null,
    max: null
  })
  console.log(filters);

  useEffect(() => {
    dispatch(fetchArticlesByBranch({...filters,identifier}));
  }, [filters])
  

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPublishingHouses());
    dispatch(fetchArticleTypes());
    if(categoryId){
      setFilters((Filters)=>({...Filters,categories:[categoryId]}))
    }
  }, []);
  return (
    <div>
      <div>
        <p>{t("articles.title")}</p>
      </div>
      <div className="d-flex ">
        <div style={{ width: 300 }}>
          <div>
            <h3>{t("articles.filter.name")}</h3>
          </div>
          <div>
            <h6>{t("articles.filter.category")}</h6>
            <div>
              {categoryStore.categories.items.map((element, i) => (
                <div className={`d-flex align-items-center`} key={i} >
                  <input type='checkbox'

                    onChange={(e) => {
                      e.target.checked === true ?
                        setFilters((Filter) => ({ ...Filter, categories: [...Filter.categories, element.id] })) :
                        setFilters((Filter) => ({ ...Filter, categories: Filter.categories.filter((elem, j) => elem !== element.id) }))
                    }
                    } />
                  <p style={{ margin: 5 }}>{lg ? element.nameEn : element.nameAr}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h6>{t("articles.filter.articleType")}</h6>
            <div>
              {articleTypeStore.articleTypes.items.map((element, i) => (
                <div className={`d-flex align-items-center`} key={i} >
                  <input type='checkbox'

                    onChange={(e) => {
                      e.target.checked === true ?
                        setFilters((Filter) => ({ ...Filter, articleTypes: [...Filter.articleTypes, element.id] })) :
                        setFilters((Filter) => ({ ...Filter, articleTypes: Filter.articleTypes.filter((elem, j) => elem !== element.id) }))
                    }
                    } />
                  <p style={{ margin: 5 }}>{lg ? element.nameEn : element.nameAr}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h6>{t("articles.filter.publishingHouse")}</h6>
            <div>
              {publishingHouseStore.publishingHouses.items.map((element, i) => (
                <div className={`d-flex align-items-center`} key={i}>
                  <input type='checkbox'

                    onChange={(e) => {
                      e.target.checked === true ?
                        setFilters((Filter) => ({ ...Filter, publishingHouses: [...Filter.publishingHouses, element.id] })) :
                        setFilters((Filter) => ({ ...Filter, publishingHouses: Filter.publishingHouses.filter((elem, j) => elem !== element.id) }))
                    }
                    } />
                  <p style={{ margin: 5 }}>{element.name}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className="d-flex flex-wrap">
          {articleStore.articles.items.map((element, index) => {
            return (
              <ArticleCard key={index}
                article={element}
              />
            );
          })}
        </div>
      </div>
      <div>
        <button onClick={()=>setFilters((Filters)=>({...Filters,skip:10}))}>next</button>
      </div>
    </div>
  );
}

export default Articles;
