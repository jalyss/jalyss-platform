import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "react-use-cart";
import WhiteSelect from "../components/Commun/inputs/WhiteSelect";
import SearchBar from "../components/Commun/inputs/searchBar";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import { RxAvatar } from "react-icons/rx";
import { BiCartAdd, BiCartDownload } from "react-icons/bi";
import Cart from "../components/Cart";
import { fetchCategories } from "../store/category";

import { ChatCircleDots } from "phosphor-react";
import { IconButton } from "@mui/material";

import Container from "react-bootstrap/Container";
import isEnglish from "../helpers/isEnglish";

function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStore = useSelector((state) => state.auth);
  const { me } = authStore;
  const { isEmpty, totalItems, cartTotal } = useCart();
  const categoryStore = useSelector((state) => state.category);
  const [showArticleMenu, setShowArticleMenu] = useState(false);
  const isEng = isEnglish();
  const currentLanguage = useMemo(() => i18n?.languages[0], [i18n?.languages]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { emptyCart } = useCart();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onChangeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem("lg", event.target.value);
  };

  const onChangeDevise = (event) => {
    localStorage.setItem("devise", event.target.value);
  };

  const currentDevise = localStorage.getItem("devise");
  console.log(showArticleMenu);
  return (
    <>
      <Navbar expand="lg" className="bg-darkPurple p-0" variant="dark">
        <Container fluid className="p-0">
          <div className="w-100">
            <div className="w-100 d-flex align-items-center  justify-content-between p-3">
              <div
                className="hidden-padding"
                onClick={() => {
                  navigate("/");
                }}
              >
                <img
                  className="lg-hide "
                  height={50}
                  alt="Jalyss logo"
                  src="https://jalyss.com/img/prestashop-logo-1610973135.jpg"
                />
              </div>
              <div className="position-relative header-icon-responsive p-4">
                <button
                  variant="primary"
                  // onClick={handleShow}
                  className="cart_offcanvas"
                >
                  <BiCartDownload size="40px" color="white" />
                </button>

                <div className="position-absolute bottom-50 rounded-circle px-1 bg-yellow">
                  <p className="m-0">{totalItems}</p>
                </div>
              </div>
              <div className="hidden-padding">
                <Navbar.Toggle aria-controls="navbarScroll" />
              </div>
            </div>

            <Navbar.Collapse id="navbarScroll">
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-center p-4 pt-0  flex-wrap">
                  <img
                    className="md-hide"
                    height={70}
                    alt=""
                    src="https://jalyss.com/img/prestashop-logo-1610973135.jpg"
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                  {/* <div className="d-flex align-items-center ">
                    <form className="form-inline mt-3 mb-3" onSubmit={(e)=>e.preventDefault()}>
                  >
                    <img
                      className="md-hide"
                      height={70}
                      alt=""
                      src="https://jalyss.com/img/prestashop-logo-1610973135.jpg"
                    />
                  </a> */}
                  <SearchBar />
                  {/* <div className="d-flex align-items-center ">
                    <form className="form-inline mt-3 mb-3">
                      <input
                        className="form-control form-control-sm ml-4 w-125"
                        type="text"
                        placeholder={t("navbar.searchInput")}
                        aria-label="Search"
                        style={{ width: 300 }}
                      />
                    </form>
                  </div> */}
                  <div className=" d-flex align-items-center justify-content-between">
                    <div className=" d-flex align-items-center">
                      <label style={{ color: "white" }}>
                        {t("navbar.language")}
                      </label>
                      <WhiteSelect
                        height={30}
                        width={70}
                        value={currentLanguage}
                        onChange={onChangeLanguage}
                        data={[
                          { label: "AR", value: "ar" },
                          { label: "EN", value: "en" },
                        ]}
                      />
                    </div>

                    {authStore.me && (
                      <div>
                        <IconButton href="/chat-box">
                          <ChatCircleDots size={32} color="#ccaa00" />
                        </IconButton>
                      </div>
                    )}
                  </div>
                  <div className="flex-column d-flex">
                    
                    {me ? (
                      <Dropdown>
                        <Dropdown.Toggle
                          className="ellipsis-btn dropdownToggleBlogCard mb-3  "
                          style={{ all: "unset" }}
                        >
                          {me?.avatar ? (
                            <img
                              src={me.avatar.path}
                              alt="avatar"
                              style={{ objectFit: "cover" }}
                              className="rounded-circle sm avatar-img"
                            />
                          ) : (
                            <RxAvatar size={40} color="#fff" />
                          )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              navigate("/profile");
                            }}
                          >
                            {t("profile")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              localStorage.removeItem("token");
                              emptyCart();
                              window.location.pathname = "/login";
                            }}
                          >

                            LogOut
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <div className="d-flex gap-3">
                        <button
                          className="nav-link btn btn-link"
                          style={{ color: "white" }}
                          onClick={() => navigate("/login")}
                        >
                          {t("login")}
                        </button>
                        <button
                          className="nav-link btn btn-link"
                          style={{ color: "white" }}
                          onClick={() => navigate("/signup")}
                        >
                          {t("signup")}
                        </button>
                      </div>
                    )}
                    {me ? (
                      <span className="" style={{ color: "white" }}>
                        {isEng ? me.fullNameEn : me.fullNameAr}
                      </span>
                    ) : null}
                  </div>
                  <div className="d-flex align-items-center mx-3 flex-column">
                    <div className="position-relative md-hide">
                      <button
                        variant="primary"
                        // onClick={handleShow}
                        className="cart_offcanvas"
                      >
                        <BiCartDownload size="35px" color="white" />
                      </button>

                      <div className="position-absolute bottom-50 rounded-circle px-2 bg-yellow">
                        <p className="m-0" >{totalItems}</p>
                      </div>
                    </div>
                    <div className="text-white mx-2 md-hide">
                      <p className="m-0 text-right">{t("navbar.cart")}</p>
                      <p className="m-0 text-center">
                        {cartTotal} {t("navbar.tot")}{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex gap-2 fs-5 justify-content-around align-items-center bg-white flex-wrap"
                  style={{ height: 70 }}
                >
                  {/* <li className="nav-item active mx-2">
                    <button
                      className="nav-link btn btn-link"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      {t("navbar.home")}
                    </button>
                  </li> */}

                  
                  <li className="nav-item active mx-2">
                    <button
                      className="nav-link btn btn-link"
                      onClick={() => {
                        navigate("/training");
                      }}
                    >
                      {t("navbar.training")}
                    </button>
                  </li>
                  <li className="nav-item active mx-2">
                    <button
                      className="nav-link btn btn-link"
                      onClick={() => {
                        navigate("/blogs");
                      }}
                    >
                      {t("navbar.blogs")}
                    </button>
                  </li>
                  <li className="nav-item active mx-2">
                    <button
                      className="nav-link btn btn-link"
                      onClick={() => {
                        navigate("/spaceJalyss");
                      }}
                    >
                      {t("navbar.space")}
                    </button>
                  </li>
                  <li className="nav-item dropdown mx-2">
                    <button
                      className="nav-link btn btn-link"
                      onClick={() => {
                        navigate("/articles");
                      }}
                    >
                      {t("navbar.market")}
                    </button>
                    {/*<a
                      className="nav-link dropdown-toggle"
                      onClick={() => {
                        navigate("/articles");
                      }}
                      id="articles-dropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                    >
                      {t("navbar.articles")}
                    </a>
                     <ul
                      className="dropdown-menu"
                      aria-labelledby="articles-dropdown"
                    >
                      {categoryStore.categories.items.map((elem, i) => (
                        <li key={i}>
                          <a
                            onClick={() => {
                              navigate(`/articles/cat/${elem.id}`);
                            }}
                            className="dropdown-item"
                          >
                            {currentLanguage === "en"
                              ? elem.nameEn
                              : elem.nameAr}
                          </a>
                        </li>
                      ))}
                    </ul> */}
                  </li>
                </div>
              </div>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <BiCartAdd size="30px" color="purple" />
            {t("offCanvas.title")}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart handleClose={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Header;
