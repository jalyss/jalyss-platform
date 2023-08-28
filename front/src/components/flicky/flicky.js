import img from "../../img/course1.jpg";
import css from "../../style/carousel.css";
import Flickity from "react-flickity-component";
// import ArticleCard from "../ArticleCard";
// import SessionCard from "./cardSession";
const Flicky = (props) => {
  const flickityOptions = {
    cellalign: "left",
    pageDots: false,
    groupCells: true,
    selectedAttraction: 0.01,
    friction: 0.1,
    // autoPlay: 1500,
    // pauseAutoPlayOnHover: false,
  };
  return (
    <div className="row p-3">
      <h1 className="secondLine">Our sessions</h1>
      <Flickity
        className={"carousel"}
        elementType={"div"}
        options={flickityOptions}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
      >
        <img className="true" src={img} />
        <img className="true" src={img} />
        <img className="true" src={img} />
        <img className="true" src={img} />
        <img className="true" src={img} />
        <img className="true" src={img} />
        <img className="true" src={img} />
        <img className="true" src={img} />
      </Flickity>
    </div>
  );
};
export default Flicky;
