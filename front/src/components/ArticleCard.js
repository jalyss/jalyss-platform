import Rating from '../components/Rating'
import { FiEye } from 'react-icons/fi'
import { BsBag } from 'react-icons/bs'

function ArticleCard({ article, onViewClick, onBasketClick }) {
  return (
    <div className="article-card p-2">
      <img src={article.image} className="w-100 object-fit-contain " alt="" />
      <div className="d-flex justify-content-between align-items-center">
        <Rating rate={article.rate} disabled />
        <div className="d-flex">
          <div
            className="bg-yellow p-1 rounded article-card-icon"
            onClick={onViewClick}
          >
            <FiEye size={20} />
          </div>
          <div className="bg-yellow p-1 rounded " onClick={onBasketClick}>
            <BsBag size={20} />
          </div>
        </div>
      </div>
      <h5>{article.title}</h5>
      <p>{article.price} </p>
    </div>
  )
}

export default ArticleCard
