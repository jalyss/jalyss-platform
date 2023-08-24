import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Flicky from "../components/flicky/flicky";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../store/article";
import funcs from "../helpers/searchFunctions";

const SearchbarResult = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const aricleStore = useSelector((state) => state.article);
  console.log("check", aricleStore);
  const filterArticles = () => {
    let arr = aricleStore.articles.items.filter((article) => {
      return funcs.checkValueInObject(article, location.state.message);
    });
    console.log("qcxvbnhjkl", arr);
  };

  useEffect(() => {
    console.log("location", location.state);
    dispatch(fetchArticles());
    filterArticles();
  }, [location.state]);
  // const sessionsStore = useSelector((state) => state.auth);
  // const spaceStore = useSelector((state) => state.auth);
  // const blogStore=useSelector((state) => state.auth);
  useEffect(() => {
    console.log("location", location);
  }, []);
  return (
    <div className="container-fluid">
      <h6 className="firstLine">Your searach results</h6>
      <Flicky />
      <Flicky />
      <Flicky />
    </div>
  );
};
export default SearchbarResult;
