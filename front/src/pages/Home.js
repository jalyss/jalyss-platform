import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CarouselImages from '../components/Commun/Carousel';
import HorizontalMenu from '../components/Commun/DragContainter';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { fetchPublishingHouses } from '../store/publishingHouse';
import { fetchArticlesByBranch } from '../store/article';
import { identifier } from '../constants/identifier/identifier';
import ArticleCard from '../components/ArticleCard';
import TrainingHeading from '../components/Commun/TrainingHeading';
import '../assets/styles/home.css';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function Home() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const publishingHouseStore = useSelector((state) => state.publishingHouse);
  const articleStore = useSelector((state) => state.article);

  console.log('publishingHouseStore', publishingHouseStore);
  useEffect(() => {
    dispatch(fetchArticlesByBranch({ identifier }));
    dispatch(fetchPublishingHouses());
  }, [dispatch]);

  return (
    <>
      <CarouselImages
        images={[
          'https://jalyss.com/modules/cz_imageslider/views/img/8bfc9742770a973a3b69ba57f8092478b23fad17_25555-03.jpg',
          'https://jalyss.com/modules/cz_imageslider/views/img/4ac709113ead13b8f3c71c0e4bed81f0a435d809_25555-01.jpg',
        ]}
      />

      <div className="responsive-container">
    
        <div className="image-container">
        {/* <img
              src="https://images.pexels.com/photos/7130475/pexels-photo-7130475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Image 1"
              className="image1"
            /> */}
           
         <img
            src="https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Image 2"
            className="image2"
          />
        </div>
        <div class="text-container">


    <div class="custom-text-container">
      <CardContent>
      
        <Typography gutterBottom variant="h2" component="div">
          ABOUT JALYSSCOM
        </Typography>
        <Typography variant="h6" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests.
          Add 1 cup of frozen peas along with the mussels, if you like.
          What is a paragraph? Paragraphs are the building blocks of papers.
          Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences,
          a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences
          are what constitutes a paragraph.
        </Typography>
      </CardContent></div>
     
    </div>
    </div>
 


    <div className='bestsellerss'>
        <h3>CHECK OUR PARTENER</h3>
        </div>
      <div className='Menuhorizontal' >
        {publishingHouseStore.publishingHouses.items.map(({ id, logo, name }) => (
        <div key={id}  className="horizontal-item horizontal-item-publishingHouse">
        <img key={id} draggable="false" src={logo?.path} alt={name} />
           </div>
           ))}
          
</div>

<div class='part-two'>
  <div class='card'>
    <h1 >HI!</h1>
    <h2 >WELLCOME-TO JALYSSCOM</h2>
    <p>
    Discover the latest updates and join our vibrant community by simply clicking on any social media icon on our website. Stay connected with us effortlessly!
    </p>
   
  </div>
  <div class='image-3'>
    <img
      src="https://images.pexels.com/photos/8618030/pexels-photo-8618030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Image 2"
      class="image3"
    />
  </div>
</div>

      {/* <TrainingHeading  title="Best Sellers" /> */}

      <div className='bestsellerss'>
        <h3>Best Sellers</h3>
        </div>
        <HorizontalMenu className="HorizontalMenu" >
         {articleStore.articles.items.map((element) => (
          <ArticleCard article={element}/>
  
          ))}
          </HorizontalMenu>
       

      
  

      {/* <MDBContainer>
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
      </MDBContainer> */}
    </>
  )
}

export default Home
