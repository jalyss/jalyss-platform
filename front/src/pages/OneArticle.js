import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
        <p>
          {article?.article?.name}
        </p>
      </div>
      <div>
        <div >
          <img alt='' src={article?.article?.cover} />
        </div>
      </div>
    </div>
  )
}

export default OneArticle