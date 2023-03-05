import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RxAvatar } from "react-icons/rx";
import { RiShoppingCart2Line } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/category";
import WhiteSelect from "../components/WhiteSelect";

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
                { label: "TND", value: "eur" },
                { label: "MAD", value: "mad" },
                { label: "EUR", value: "tnd" },
                { label: "USD", value: "usd" },
              ]}
              helper={t("navbar.devise")}
            />
          </div>

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

                      <div class="container h-min-content py-initial">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                          <div class="col">

                            <div class="table-responsive">

                              <table class="table">
                                <thead>
                                  <tr>
                                    <th scope="col" class="h5">Shopping Bag</th>

                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      <div class="flex-column ms-4">
                                        <p class="mb-2">فن اللامبالاة</p>

                                      </div>
                                      <div class="d-flex align-items-center">
                                        <img src="https://jalyss.com/899-home_default/The-Subtle-Art-of-Not-Giving.jpg" class="img-fluid rounded-3"
                                          alt="Book" />

                                      </div>
                                    </th>

                                    <td class="align-middle">
                                      <div class="d-flex flex-row">

                                        <input id="form1" min="0" name="quantity" value="2" type="number"
                                          class="form-control form-control-sm" />


                                      </div>
                                    </td>
                                    <td class="align-middle">
                                      <p class="mb-0">TND 78.00</p>
                                    </td>
                                  </tr>
                                </tbody>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      <div class="flex-column ms-4">
                                        <p class="mb-2">فن اللامبالاة</p>

                                      </div>
                                      <div class="d-flex align-items-center">
                                        <img src="https://jalyss.com/899-home_default/The-Subtle-Art-of-Not-Giving.jpg" class="img-fluid rounded-3"
                                          alt="Book" />

                                      </div>
                                    </th>

                                    <td class="align-middle">
                                      <div class="d-flex flex-row">

                                        <input id="form1" min="0" name="quantity" value="2" type="number"
                                          class="form-control form-control-sm" />


                                      </div>
                                    </td>
                                    <td class="align-middle">
                                      <p class="mb-0">TND 78.00</p>
                                    </td>
                                  </tr>
                                </tbody>

                              </table>
                            </div>
                          </div>
                        </div>
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
                        <button className="offCanvas-btn1">

                          <span className="label-btn">VIEW CART</span>
                        </button>
                      </div>
                      <div>
                        <button className="offCanvas-btn2">
                          <span className="label-btn"> CHECKOUT </span>
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
          {t('navbar.home')}
        </a>
        <div className="dropdown">
          <a href="/articles" className="text-decoration-none text-color-black">
            {t('navbar.articles')}
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
