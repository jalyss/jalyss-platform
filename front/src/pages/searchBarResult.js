import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SearchBlogs from "../components/flicky/searchBlogs";
import SearchArticle from "../components/flicky/articleSearch";
import Sessions from "../components/flicky/sessionsCard";
// import { useEffect, useState } from "react";
const SearchbarResult = () => {
  // const location = useLocation();
  const items = useSelector((state) => state.searchInput);
  // const [updated, setUpdated] = useState(true);
  console.log(items.blogs);
  // useEffect(() => {
  //   setUpdated(!updated);
  // }, [location.state.message]);

  return (
    <div className="container-fluid">
      <h6 className="firstLine">Your searach results</h6>
      <SearchBlogs blogs={items.blogs} />
      <SearchArticle articles={items.articles} />
      <Sessions sessions={items.sessions} />
      {/* <Flicky />
      <Flicky /> */}
    </div>
  );
};
export default SearchbarResult;
