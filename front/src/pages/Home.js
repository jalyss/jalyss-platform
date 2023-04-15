import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import CarouselImages from '../components/Carousel'
import HorizontalMenu from '../components/DragContainter'
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit'

function Home() {
  const { t, i18n } = useTranslation()

  const publishingHouseStore = [
    {
      id: 'b93dead1-696a-4b55-b1fa-8540b54679f7',
      name: 'جرير',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
      createdAt: '2023-03-25T13:56:36.512Z',
      updatedAt: '2023-03-25T13:56:36.512Z',
    },
    {
      id: '4720c492-1974-4404-937b-cc70dc9b55f5',
      name: 'جبل عمان',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
      createdAt: '2023-03-25T13:56:36.516Z',
      updatedAt: '2023-03-25T13:56:36.516Z',
    },
    {
      id: '5e09d2d1-937a-4d21-b2da-db0f304dbfdd',
      name: 'ملهمون',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
      createdAt: '2023-03-25T13:56:36.518Z',
      updatedAt: '2023-03-25T13:56:36.518Z',
    },
    {
      id: '12f15b94-8599-4673-abd2-8bc02f9c8067',
      name: 'جرير',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
      createdAt: '2023-04-06T14:26:44.431Z',
      updatedAt: '2023-04-06T14:26:44.431Z',
    },
    {
      id: 'cc6db93b-43a2-491a-9dc4-78594819aff6',
      name: 'جبل عمان',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
      createdAt: '2023-04-06T14:26:44.440Z',
      updatedAt: '2023-04-06T14:26:44.440Z',
    },
    {
      id: '12f15b94-8599-4673-abd2-8bc02f9c8067',
      name: 'جرير',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
      createdAt: '2023-04-06T14:26:44.431Z',
      updatedAt: '2023-04-06T14:26:44.431Z',
    },
    {
      id: 'cc6db93b-43a2-491a-9dc4-78594819aff6',
      name: 'جبل عمان',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
      createdAt: '2023-04-06T14:26:44.440Z',
      updatedAt: '2023-04-06T14:26:44.440Z',
    },
    {
      id: '2aa245aa-7dc7-4c1c-8e28-813b458e3610',
      name: 'ملهمون',
      address: 'Saudi arabic',
      logo: 'https://cata-joodek.s3.us-east-2.amazonaws.com/static/67531867/store--%2856%29.png',
      createdAt: '2023-04-06T14:26:44.444Z',
      updatedAt: '2023-04-06T14:26:44.444Z',
    },
  ]
  return (
    <>
      <CarouselImages
        images={[
          'https://jalyss.com/modules/cz_imageslider/views/img/8bfc9742770a973a3b69ba57f8092478b23fad17_25555-03.jpg',
          'https://jalyss.com/modules/cz_imageslider/views/img/4ac709113ead13b8f3c71c0e4bed81f0a435d809_25555-01.jpg',
        ]}
      />

      <HorizontalMenu items={publishingHouseStore} />
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
