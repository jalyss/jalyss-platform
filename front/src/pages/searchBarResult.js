import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../store/article";
const SearchbarResult = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const aricleStore = useSelector((state) => state.article);
  console.log(aricleStore);
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);
  // const sessionsStore = useSelector((state) => state.auth);
  // const spaceStore = useSelector((state) => state.auth);
  // const blogStore=useSelector((state) => state.auth);
  useEffect(() => {
    console.log("location", location);
  }, []);
  return <div className="search_bar">hello search bar</div>;
};
export default SearchbarResult;
