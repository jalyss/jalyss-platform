import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RxAvatar } from "react-icons/rx";


import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/category";
import WhiteSelect from "../components/WhiteSelect";

import Offcanvas from "react-bootstrap/Offcanvas";
import { BiCartAdd } from "react-icons/bi";
import { BiCartDownload } from "react-icons/bi";
import Cart from "../components/Cart";
import { useCart } from "react-use-cart";

function Header() {
  const authStore = useSelector(state => state.auth)
  const { me } = authStore
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const {
    isEmpty,
    totalItems,
    cartTotal,
  } = useCart();
  const categoryStore = useSelector((state) => state.category);
  const [showArticleMenu, setShowArticleMenu] = useState(false);
  const currentLanguage = useMemo(() => i18n?.languages[0], [i18n?.languages]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
      <div className="d-flex  px-5 py-4  bg-darkPurple">
        <img
          alt=""
          src="https://jalyss.com/img/prestashop-logo-1610973135.jpg"
        />

        <div className="d-flex w-100 align-items-center justify-content-evenly flex-wrap">
          <div className="d-flex w-50 mx-2">
            <input
              className="w-100 p-2 border-0 "
              placeholder={t("navbar.searchInput")}
            />
            <button className="bg-yellow px-4 m-0 border-0">
              {t("navbar.searchButton")}
            </button>
          </div>
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
              helper={t("navbar.language")}
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
              helper={t("navbar.devise")}
            />
          </div>

          <div className={`d-flex align-items-center`}>
            {authStore.me?.avatar?.path?
            <img src={authStore.me.avatar.path} className="rounded-circle" style={{width:50}}/>
            :<RxAvatar size="30px" color="white" />}
            <div className="text-white mx-2">
              {authStore.me ?
                <a href="/profile" className="m-0 text-right">
                  {authStore.me.fullNameAr}

                </a>
                :
                <>
                  <a href="/login" className="m-0 text-right">
                    {t("navbar.account.profile")}

                  </a>
                  <a href="/signup" className="m-0" >
                    {t("navbar.account.signup")}

                  </a>
                </>
              }
            </div>
          </div>

          <div className={`d-flex align-items-center`}>
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
              <p className="m-0">{cartTotal} {t('navbar.tot')} </p>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-evenly align-content-center m-3">
        <a href="/" className="text-decoration-none text-color-black">
          {t("navbar.home")}
        </a>
        <div className="dropdown">
          <a href="/articles" className="text-decoration-none text-color-black">

            {t("navbar.articles")}

          </a>
          <div class="dropdown-content bg-white">
            {categoryStore.categories.items.map((elem, i) => (
              <a href={`/articles/cat/${elem.id}`} key={i}>
                {currentLanguage === "en" ? elem.nameEn : elem.nameAr}
              </a>
            ))}
          </div>
        </div>
        <a href="/*" className="text-decoration-none text-color-black">
          {t("navbar.space")}
        </a>
        <a href="/*" className="text-decoration-none text-color-black">
          {t("navbar.training")}
        </a>
        <a href="/*" className="text-decoration-none text-color-black">
          {t("navbar.blogs")}
        </a>
      </div>
    </>
  );
}

export default Header;
