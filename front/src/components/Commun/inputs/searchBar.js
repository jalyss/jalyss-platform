import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const SearchBar = () => {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState("");
  const [updated, setUpdated] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    console.log(event.target.value);
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // 👇 Get input value
      setUpdated(message);
      console.log("message", updated);
      navigate("/search", { state: { message } });
    }
  };
  return (
    <div className="d-flex align-items-center ">
      <form className="form-inline mt-3 mb-3">
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="form-control form-control-sm ml-4 w-125"
          type="text"
          placeholder={t("navbar.searchInput")}
          aria-label="Search"
          style={{ width: 300 }}
        />
      </form>
    </div>
  );
};
export default SearchBar;
