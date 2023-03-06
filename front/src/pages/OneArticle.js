import axios from "axios";
import { MdOutlineAddShoppingCart } from "react-icons/md";

import Rating from "../components/Rating";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { identifier } from "../constants/identifier/identifier";
import { fetchArticleByBranch } from "../store/article";
import "../assets/styles/book.css";
import useMeta from "../hooks/useMeta";
import DocumentMeta from "react-document-meta";

function OneArticle() {
  const dispatch = useDispatch();
  const articleStore = useSelector((state) => state.article);
  const { article } = articleStore;
  const { t, i18n } = useTranslation();
  const { articleId } = useParams();
  const [meta, setMeta] = useState({ title: "", description: "" });
  useEffect(() => {
    dispatch(fetchArticleByBranch(articleId))
    // .then(res=>{if(!res.error){
      
    //   console.log(useMeta(res.data?.title, res.data?.shortDescription));
    //  console.log(res.payload.article.title)
    //   setMeta(useMeta(res.payload.article.title, article?.shortDescription));
    // }})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('meta',meta);
  useEffect(()=>{
    if(article)
    setMeta(useMeta(article.article.title, article.article?.shortDescription));
  },[article])
 

  return (
    <DocumentMeta {...meta} className="container-fluid">
      <div className="book">
        <div className="book-content">
          <img
            src={article?.article?.cover?.path}
            alt={article?.article?.title}
            className="book-content-img"
          />

          <div className="book-content-info">
            <h1 className="book-title">{article?.article?.title}</h1>
          </div>
          <Rating rate={3} disabled />
          <div className="book-add-to-cart">
            <input
              min="1"
              max="100"
              type="number"
              className="book-add-to-cart-input"
            />

            <button className="book-add-to-cart-btn">
              <MdOutlineAddShoppingCart size="30px" color="p" />
              {t("OneArticle.addCart")}
            </button>
          </div>
        </div>
        <p className="book-description">{article?.article?.longDescription}</p>
      </div>
    </DocumentMeta>
  );
}

export default OneArticle;
