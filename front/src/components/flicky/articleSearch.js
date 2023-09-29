import Flickity from "react-flickity-component";
import css from "../../style/carousel.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import OneArticle from "./oneArticle";

const SearchArticle = ({ articles }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const flickityOptions = {
    cellalign: "left",
    pageDots: false,
    groupCells: true,
    selectedAttraction: 0.01,
    friction: 0.1,
  };

  return (
    <div>
      {articles.length ? (
        <div className="row">
          <h1 className="secondLine">Articles results</h1>
          <Flickity
            className={"article"}
            elementType={"div"}
            options={flickityOptions}
            disableImagesLoaded={false}
          >
            {articles.map((art) => (
              <OneArticle key={art.id} article={art} />
            ))}
          </Flickity>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default SearchArticle;
