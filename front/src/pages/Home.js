import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import CarouselImages from '../components/Carousel'
import HorizontalMenu from '../components/DragContainter'
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit'
import { fetchPublishingHouses } from '../store/publishingHouse'
import { fetchArticlesByBranch } from '../store/article'
import {identifier} from '../constants/identifier/identifier'

function Home() {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const publishingHouseStore = useSelector(state=>state.publishingHouse)
  const articleStore = useSelector(state=>state.article)

   useEffect(()=>{
    dispatch(fetchArticlesByBranch({identifier,bestSaller:true}))
    dispatch(fetchPublishingHouses())
   },[dispatch])
  console.log(publishingHouseStore.publishingHouses.items)
  console.log(articleStore.articles.items)
  return (
    <>
      <CarouselImages
        images={[
          'https://jalyss.com/modules/cz_imageslider/views/img/8bfc9742770a973a3b69ba57f8092478b23fad17_25555-03.jpg',
          'https://jalyss.com/modules/cz_imageslider/views/img/4ac709113ead13b8f3c71c0e4bed81f0a435d809_25555-01.jpg',
        ]}
      />

      <HorizontalMenu items={publishingHouseStore.publishingHouses.items} />
      <HorizontalMenu items={articleStore.articles.items} />


      <MDBContainer>
        <MDBRow className="text-center mb-5">
          <MDBCol>
            <img
              src="https://jalyss.com/img/cms/4.png"
              width={300}
              height="auto"
              alt=""
            />
            <p className="text-color-grey">مجموعتنا بالفايسبوك</p>
          </MDBCol>
          <MDBCol>
            <img
              src="https://jalyss.com/img/cms/3.png"
              width={300}
              height="auto"
              alt=""
            />
            <p className="text-color-grey">صفحتنا على LINKEDIN</p>
          </MDBCol>
          <MDBCol>
            <img
              src="https://jalyss.com/img/cms/2.png"
              width={300}
              height="auto"
              alt=""
            />
            <p className="text-color-grey">صفحتنا على الفايسبوك</p>
          </MDBCol>
          <MDBCol>
            <img
              src="https://jalyss.com/img/cms/1.png"
              width={300}
              height="auto"
              alt=""
            />
            <p className="text-color-grey">صفحتنا بالإنستاغرام</p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default Home
