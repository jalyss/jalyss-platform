import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { filteredSearch } from "./../../../store/searchInput";
import { useDispatch } from "react-redux";
import img from "../../../assets/images/search.png";
import css from "../../../assets/styles/search-bar-nav.css";
const SearchBar = () => {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState("");
  // const [updated, setUpdated] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    // console.log(event.target.value);
    setMessage(event.target.value);
  };
  const dispatch = useDispatch();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(filteredSearch(message));
      navigate("/search", { state: { message } });
    }
  };

  return (
    <div className="d-flex align-items-center ">
      <form className="position-relative m-0">
        <img className="search_bar_icon" src={img} alt="search_img" />
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="navbar_search_bar form-control form-control-sm ml-4 w-125"
          type="text"
          placeholder={t("navbar.searchInput")}
          aria-label="Search"
        />
      </form>
    </div>
  );
};
export default SearchBar;
