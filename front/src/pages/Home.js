import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CarouselImages from "../components/Commun/Carousel";
import HorizontalMenu from "../components/Commun/DragContainter";
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { fetchPublishingHouses } from "../store/publishingHouse";
import { fetchArticlesByBranch } from "../store/article";
import { identifier } from "../constants/identifier/identifier";
import ArticleCard from "../components/ArticleCard";
import TrainingHeading from "../components/Commun/TrainingHeading";
import "../assets/styles/home.css";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Home() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const publishingHouseStore = useSelector((state) => state.publishingHouse);
  const articleStore = useSelector((state) => state.article);

  console.log("publishingHouseStore", publishingHouseStore);
  useEffect(() => {
    dispatch(fetchArticlesByBranch({ identifier }));
    dispatch(fetchPublishingHouses());
  }, [dispatch]);

  return (
    <>
      <CarouselImages
        images={[
          "https://jalyss.com/modules/cz_imageslider/views/img/8bfc9742770a973a3b69ba57f8092478b23fad17_25555-03.jpg",
          "https://jalyss.com/modules/cz_imageslider/views/img/4ac709113ead13b8f3c71c0e4bed81f0a435d809_25555-01.jpg",
        ]}
      />

      <div className="responsive-container">
        <div className="image-container">
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
                Welcome to jalyss.com your premier online destination for books
                and education. Delve into our handpicked collection that spans
                diverse genres, from captivating classics to cutting-edge
                educational resources. Whether you're a passionate reader or a
                dedicated learner , jalyss.com provides a gateway to endless
                knowledge and inspiration. Join us in exploring the captivating
                world of literature and education.
              </Typography>
            </CardContent>
          </div>
        </div>
      </div>

      <div className="bestsellerss">
        <h3>Best Sellers</h3>
      </div>
      <HorizontalMenu className="HorizontalMenu">
        {articleStore.articles.items.map((element) => (
          <ArticleCard article={element} />
        ))}
      </HorizontalMenu>
      <div className="bestsellerss mb-4">
        <h3>Check our partners</h3>
      </div>

      <HorizontalMenu className="HorizontalMenu">
        {publishingHouseStore.publishingHouses.items.map(
          ({ id, logo, name }) => (
            <div
              key={id}
              className="horizontal-item horizontal-item-publishingHouse rounded"
            >
              <img
                key={id}
                draggable="false"
                src={logo?.path}
                alt={name}
                style={{ borderRadius: 20 }}
              />
            </div>
          )
        )}
      </HorizontalMenu>
    </>
  );
}

export default Home;
