import React from 'react'
import ArticleCard from '../components/ArticleCard'

function Home() {
  return (
    <>
      <div>Home</div>
      <ArticleCard
        article={{
          title: 'فن اللامبالاة',
          price: '20,00',
          rate: '3',
          image:
            'https://jalyss.com/899-home_default/The-Subtle-Art-of-Not-Giving.jpg',
        }}
      />
    </>
  )
}

export default Home
