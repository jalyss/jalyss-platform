import { useLocation } from "react-router-dom";
import { useEffect } from "react";
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
  return <div className="search_bar">hello search bar</div>;
};
export default SearchbarResult;
