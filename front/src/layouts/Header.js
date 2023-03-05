import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RxAvatar } from "react-icons/rx";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/category";

import Offcanvas from 'react-bootstrap/Offcanvas';
import { BiCartAdd } from "react-icons/bi";
import { BiCartDownload } from "react-icons/bi";



function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const categoryStore = useSelector((state) => state.category);
  const [showArticleMenu, setShowArticleMenu] = useState(false);
  const currentLanguage = useMemo(() => i18n?.languages[0], [i18n?.languages]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const onChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lg", lng);
  };

  const onChangeDevise = (devise) => {
    localStorage.setItem("devise", devise);
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

        <div className="d-flex w-100 align-items-center justify-content-evenly">
          <div className="d-flex w-50 mx-2">
            <input
              className="w-100 p-2 border-0 "
              placeholder={t("navbar.searchInput")}
            />
            <button className="bg-yellow px-4 m-0 border-0">
              {t("navbar.searchButton")}
            </button>
          </div>

          <select
            name="language"
            onChange={(event) => onChangeLanguage(event.target.value)}
            defaultValue={currentLanguage}
          >
            <option value="ar">AR</option>
            <option value="en">EN</option>
          </select>

          <select
            name="devise"
            onChange={(event) => onChangeDevise(event.target.value)}
            defaultValue={currentDevise}
          >
            <option value="eur">EUR</option>
            <option value="mad">MAD</option>
            <option value="tnd">TND</option>
            <option value="usd">USD</option>
          </select>

          <div className={`d-flex align-items-center`}>
            <RxAvatar size="30px" color="white" />
            <div className="text-white mx-2">
              <p className="m-0 text-right">{t("navbar.account.profile")}</p>
              <p className="m-0">{t("navbar.account.signup")}</p>
            </div>
          </div>

          <div className={`d-flex align-items-center`}>
            <div className="position-relative">

              <button variant="primary" onMouseOver={handleShow} className='cart_offcanvas' >
                <BiCartDownload size="40px" color="white" />
              </button>
              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>

                  <Offcanvas.Title>
                    <BiCartAdd size="30px" color="purple" />
                    {t('Offcanvas.title')}

                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div>
                    <div className="mini-body-offCanvas">

                      <div>
                        <img src="https://jalyss.com/899-home_default/The-Subtle-Art-of-Not-Giving.jpg" title="fan la moubalet" className='book-content-img-cart' />
                      </div>
                    </div>
                    <div>
                      <div className="subtotal">
                        <div>

                          <span className="label" >
                            Cart subtotal
                          </span>

                          <span className="price-wrapper">
                            175.000 TND
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="double-btn">
                      <div >
                        <button className="offCanvas-btn">

                          VIEW CART
                        </button>
                      </div>
                      <div>
                        <button className="offCanvas-btn">
                          CHEKOUT
                        </button>

                      </div>
                    </div>

                  </div>

                </Offcanvas.Body>
              </Offcanvas>


              <div className="position-absolute bottom-50 rounded-circle px-1 bg-yellow">
                <p className="m-0">1</p>
              </div>
            </div>
            <div className="text-white mx-2">
              <p className="m-0 text-right">{t('navbar.cart')}</p>
              <p className="m-0">{t('navbar.tot')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-evenly align-content-center m-3">
        <a href="/" className="text-decoration-none text-color-black">
          Home
        </a>
        <div className="dropdown">
          <a href="/articles" className="text-decoration-none text-color-black">
            Products
          </a>
          <div class="dropdown-content bg-white">
            {categoryStore.categories.items.map((elem, i) => (
              <a href={`/articles/cat/${elem.id}`}>{currentLanguage === 'en' ? elem.nameEn : elem.nameAr}</a>
            ))}
          </div>
        </div>
        <a href="/*" className="text-decoration-none text-color-black">
          Space
        </a>
        <a href="/*" className="text-decoration-none text-color-black">
          Training
        </a>
        <a href="/*" className="text-decoration-none text-color-black">
          Blogs
        </a>
      </div>
    </>
  );
}

export default Header;
