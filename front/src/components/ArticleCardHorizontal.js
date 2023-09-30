import React from "react";
import Rating from "../components/Commun/Rating";
import { FiEye } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import "../assets/styles/cardHorizontal.css";
import { showErrorToast, showSuccessToast } from "../utils/toast";

function ArticleCardHorizontal({ article }) {

    const { addItem } = useCart();
    const navigate = useNavigate();



    const handleButtonClick = () => {
        if (handleButtonClick.error) {
            showErrorToast("alredy saved");
        } else {
            addItem(article);
            showSuccessToast("Article has been saved");
        }
    };
    console.log(article.article, "ddd")
    return (
        <div>
            <div className="position-relative">
                <div class="container ">

                    <div className="article-card-h position-relative mx-3 mb-2 ">
                        <div class="row no-gutters">
                            <div class="col-sm-3">
                                <div className="stock-label-h">
                                    <h6 className="m-0">{article.stock} </h6>
                                </div>
                                <img
                                    src={article?.article?.cover.path}

                                    className="w-100 object-fit-contain article-image "
                                    alt=""
                                />
                                <Rating edit={false} rating={article?.rating} />
                            </div>
                            <div class="col-sm-9">
                                <div class="card-body-h">
                                    <h6 className="card-title">{article.article?.title}</h6>
                                    <p class="card-text">{article.article?.shortDescriptionEn}</p>
                                    <p className="prices">{article.price}TND</p>
                                    <div className="d-flex mb-2">
                                        <div
                                            style={{ backgroundColor: "white", color: "purple" }}
                                            className="bg-purple p-1 rounded article-card-icon pointer m-1"
                                            onClick={() => navigate("/one-article/" + article.id)}
                                        >
                                            <FiEye size={20} />
                                        </div>
                                        <div
                                            className="bg-yellow p-1 rounded pointer m-1"
                                            onClick={handleButtonClick}
                                        >
                                            <BsBag size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCardHorizontal
