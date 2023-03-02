import React, { useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { RxAvatar } from 'react-icons/rx'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { Dropdown } from 'react-bootstrap'

function Header() {
  const { t, i18n } = useTranslation()
  const [showArticleMenu, setShowArticleMenu] = useState(false)
  const currentLanguage = useMemo(() => i18n?.languages[0], [i18n?.languages])

  const onChangeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('lg', lng)
  }

  const onChangeDevise = (devise) => {
    localStorage.setItem('devise', devise)
  }

  const currentDevise = localStorage.getItem('devise')
  console.log(showArticleMenu)
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
              placeholder={t('navbar.searchInput')}
            />
            <button className="bg-yellow px-4 m-0 border-0">
              {t('navbar.searchButton')}
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
              <p className="m-0 text-right">{t('navbar.account.profile')}</p>
              <p className="m-0">تسجيل الدخول - تسجيل</p>
            </div>
          </div>

          <div className={`d-flex align-items-center`}>
            <div className="position-relative">
              <RiShoppingCart2Line size="30px" color="white" />
              <div className="position-absolute bottom-50 end-50 rounded-circle px-1 bg-yellow">
                <p className="m-0">1</p>
              </div>
            </div>
            <div className="text-white mx-2">
              <p className="m-0 text-right">سلة مشترياتك</p>
              <p className="m-0">د.ت. 0٫00</p>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-evenly mt-3">
        <a href="/" className='text-decoration-none text-color-black'>Home</a>
        <p class="dropdown">
        Products
          <div class="dropdown-content">
            <a href="/" >تطوير ذات</a>
            <a href="/">ادارة اعمال</a>
            <a href="/"> الطفل والاسرة</a>
          </div>
        </p>
        <a href="/" className='text-decoration-none text-color-black'>Space</a>
        <a href="/" className='text-decoration-none text-color-black'>Training</a>
        <a href="/" className='text-decoration-none text-color-black'>Blogs</a>
      </div>
    </>
  )
}

export default Header
