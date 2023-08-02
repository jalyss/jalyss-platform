import Rating from '../components/Commun/Rating'
import { FiEye } from 'react-icons/fi'
import { BsBag } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart';
import { showErrorToast, showSuccessToast } from "../utils/toast";


function ArticleCard({ article }) {
  const { addItem } = useCart();
  const navigate = useNavigate()

  const handleButtonClick = () => {
    if (handleButtonClick.error) {
      showErrorToast("alredy saved");

    } else {
      addItem(article);
      showSuccessToast("Article has been saved");
    }
  };

  return (
    <div className="article-card position-relative mx-3 mb-2 ">
      <div className="position-relative">
        <div className="stock-label">
          <h6 className="m-0">{article.stock} </h6>
        </div>
        <img
          src={article.article.cover.path}
          className="w-100 object-fit-contain article-image "
          alt=""
        />
        <div className="rating">
          <Rating
            edit={false}
            rating={article?.rating}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <h6 className='m-0'>{article.article.title}</h6>
        <div className="d-flex ">
          <div
            className="bg-yellow p-1 rounded article-card-icon pointer m-1"
            onClick={() => navigate('/one-article/' + article.id)}
          >
            <FiEye size={20} />
          </div>
          <div className="bg-yellow p-1 rounded pointer m-1"
            onClick={handleButtonClick}>
            <BsBag size={20} />
          </div>
        </div>
      </div>
      <p>{article.price} </p>
    </div>
  )
}

export default ArticleCard
