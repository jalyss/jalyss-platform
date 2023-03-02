import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Articles from './Articles'

function OneArticle() {
  const { articleId } = useParams()
  const [article, setArticle] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/articles/one/${articleId}`).then(res =>
      setArticle(res.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div >
      <div>
        <div class="fw-bold">
          <h2 className='text-center ' >
            {article?.article?.name}
          </h2>
        </div>
      </div>
      <div class="container">
        <div class="row">


          <div className="col-md-4 ">
            <img src={article?.article?.cover} alt="Thumbnail Image" class="img-thumbnail" />
          </div>
          <div className='col-md-6'>
            <h4 className='text-uppercase text-black-50'>
              {Articles.categoryId}
            </h4>
            <h1>

            </h1>
          </div>
        </div>

      </div>


    </div>
  )
}

export default OneArticle