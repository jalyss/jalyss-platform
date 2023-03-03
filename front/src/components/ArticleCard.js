import Rating from '../components/Rating'
import { FiEye } from 'react-icons/fi'
import { BsBag } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function ArticleCard({ article, onViewClick, onBasketClick }) {
  const navigate=useNavigate()
  return (
    <div className="article-card p-2">
      <img src={article.article.cover} className="w-100 object-fit-contain " alt="" />
      <div className="d-flex justify-content-between align-items-center">
        <Rating rate={article?.rate} disabled />
        <div className="d-flex ">
          <div
            className="bg-yellow p-1 rounded article-card-icon pointer m-1"
            onClick={()=>navigate('/one-article/'+article.id)}
          >
            <FiEye size={20} />
          </div>
          <div className="bg-yellow p-1 rounded pointer m-1" onClick={()=>console.log(article)}>
            <BsBag size={20} />
          </div>
        </div>
      </div>
      <h5>{article.article.title}</h5>
      <p>{article.price} </p>
      <p>{article.stock} </p>
    </div>
  )
}

export default ArticleCard
