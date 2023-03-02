import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchArticles } from "../store/article";
import { fetchArticleTypes } from "../store/articleType";
import { fetchCategories } from "../store/category";
import { fetchPublishingHouses } from "../store/publishingHouse";

function Articles() {
  const dispatch = useDispatch();
  const articleStore = useSelector((state) => state.article);
  const categoryStore = useSelector((state) => state.cartegory);
  const publishingHouseStore = useSelector((state) => state.publishingHouse);
  const typeStore = useSelector((state) => state.articleType);

  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchCategories());
    dispatch(fetchPublishingHouses());
    dispatch(fetchArticleTypes());
  }, []);
  return (
    <div>
      <div>
        <p>{t("articles.title")}</p>
      </div>
      <div className="d-flex ">
        <div style={{ width: 300 }}>{t("articles.filter")}</div>
        <div>
          {articles.map((element, index) => {
            return (
              <div key={index}>
                <img alt="" src={element?.article?.cover} />
                <div>
                  <Link to={`/one-article/${element.id}`}>
                    {t("articles.viewMore")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Articles;
