import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/category";
import WhiteSelect from "../components/WhiteSelect";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BiCartAdd, BiCartDownload } from "react-icons/bi";
import Cart from "../components/Cart";
import { useCart } from "react-use-cart";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

import { ChatCircleDots } from "phosphor-react";
import { IconButton } from "@mui/material";
function NavBar() {
  const authStore = useSelector((state) => state.auth);
  const { me } = authStore;
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isEmpty, totalItems, cartTotal } = useCart();
  const categoryStore = useSelector((state) => state.category);
  const [showArticleMenu, setShowArticleMenu] = useState(false);
  const currentLanguage = useMemo(() => i18n?.languages[0], [i18n?.languages]);
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

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
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-darkPurple"
        variant="dark"
      >
        <Navbar.Brand href="/">
          <img
            alt=""
            src="https://jalyss.com/img/prestashop-logo-1610973135.jpg"
          />
        </Navbar.Brand>

        <div className="position-relative header-icon-responsive">
          <button
            variant="primary"
            onClick={handleShow}
            className="cart_offcanvas"
          >
            <BiCartDownload size="40px" color="white" />
          </button>
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

          <div className="position-absolute bottom-50 rounded-circle px-1 bg-yellow">
            <p className="m-0">{totalItems}</p>
          </div>
        </div>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setHide(!hide)}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={`d-flex flex-wrap navbar-collapse   ${
            hide ? "collapse" : "collapsing"
          }`}
        >
          <div
            className="d-flex gap-2 fs-5 justify-content-center align-items-center"
            style={{ color: "white" }}
          >
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle"
                onClick={() => {
                  navigate("/articles");
                }}
                id="articles-dropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("navbar.articles")}
              </a>
              <ul className="dropdown-menu" aria-labelledby="articles-dropdown">
                {categoryStore.categories.items.map((elem, i) => (
                  <li key={i}>
                    <a
                      onClick={() => {
                        navigate(`/articles/cat/${elem.id}`);
                      }}
                      className="dropdown-item"
                    >
                      {currentLanguage === "en" ? elem.nameEn : elem.nameAr}
                    </a>
                  </li>
                ))}
              </ul>
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
          </div>

          <div className="d-flex align-items-center mx-auto">
            <form className="form-inline mt-3 mb-3">
              <input
                className="form-control form-control-sm ml-4 w-125"
                type="text"
                placeholder={t("navbar.searchInput")}
                aria-label="Search"
                style={{ width: 300 }}
              />
            </form>
          </div>

          <div className="d-flex gap-4">
            <div>
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
              <WhiteSelect
                height={30}
                width={80}
                value={currentDevise}
                onChange={onChangeDevise}
                data={[
                  { label: "TND", value: "tnd" },
                  { label: "MAD", value: "mad" },
                  { label: "EUR", value: "eur" },
                  { label: "USD", value: "usd" },
                ]}
              />
            </div>
            <div>
              {authStore.me && (
                <IconButton href="/chat">
                  <ChatCircleDots size={32} color="#ccaa00" />
                </IconButton>
              )}
            </div>
            {me ? (
              <div>
                <Dropdown>
                  <Dropdown.Toggle
                    className="ellipsis-btn dropdownToggleBlogCard mb-3  "
                    style={{ all: "unset" }}
                  >
                    {me?.avatar ? (
                      <img
                        src={me.avatar.path}
                        alt="avatar"
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
                        navigate("/login");
                      }}
                    >
                      LogOut
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <button
                className="nav-link btn btn-link"
                style={{ color: "white" }}
                onClick={() => navigate("/login")}
              >
                {t("login")}
              </button>
            )}
            <div className="d-flex align-items-center mx-3">
              <div className="position-relative">
                <button
                  variant="primary"
                  onClick={handleShow}
                  className="cart_offcanvas"
                >
                  <BiCartDownload size="40px" color="white" />
                </button>
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

                <div className="position-absolute bottom-50 rounded-circle px-1 bg-yellow">
                  <p className="m-0">{totalItems}</p>
                </div>
              </div>
              <div className="text-white mx-2">
                <p className="m-0 text-right">{t("navbar.cart")}</p>
                <p className="m-0">
                  {cartTotal} {t("navbar.tot")}{" "}
                </p>
              </div>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
