import { useSelector } from "react-redux";

import SearchBlogs from "../components/flicky/searchBlogs";
import SearchArticle from "../components/flicky/articleSearch";
import Sessions from "../components/flicky/sessionsCard";
import css from "../assets/styles/loading.css";

const SearchbarResult = () => {
  const items = useSelector((state) => state.searchInput);
  // const [updated, setUpdated] = useState(true);
  console.log(items.blogs);
  // useEffect(() => {
  //   setUpdated(!updated);
  // }, [location.state.message]);

  return (
    <div className="search_container container-fluid">
      {!items.loading ? (
        <div>
          <h6 className="firstLine">Your searach results</h6>{" "}
          <SearchBlogs blogs={items.blogs} />
          <SearchArticle articles={items.articles} />
          <Sessions sessions={items.sessions} />
        </div>
      ) : (
        <div id="loading-wrapper">
          <div id="loading-text">LOADING</div>
          <div id="loading-content"></div>
        </div>
      )}
    </div>
  );
};
export default SearchbarResult;
