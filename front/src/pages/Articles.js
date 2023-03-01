import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function Articles() {
  const { t, i18n } = useTranslation()
  const [articles, setArticles] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/articles/TUN').then(res => {
      setArticles(res.data)
    })
  }, [])
  return (
    <div>
      <div>
        <p>
          {t('articles.title')}
        </p>
      </div>
      <div className='d-flex '>
        <div style={{width:300}}>{t('articles.filter')}</div>
        <div>
          {articles.map((element, index) => {
            return (
              <div key={index}>
                <img alt='' src={element?.article?.cover} />
                <div>
                  <Link to={`/one-article/${element.id}`}>{t('articles.viewMore')}</Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Articles