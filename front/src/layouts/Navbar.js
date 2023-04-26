import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RxAvatar } from 'react-icons/rx'

import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../store/category'
import WhiteSelect from '../components/WhiteSelect'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import Offcanvas from 'react-bootstrap/Offcanvas'
import { BiCartAdd } from 'react-icons/bi'
import { BiCartDownload } from 'react-icons/bi'
import Cart from '../components/Cart'
import { useCart } from 'react-use-cart'
import { ChatCircleDots } from 'phosphor-react'
import { IconButton } from '@mui/material'

function NavBar() {
  const authStore = useSelector((state) => state.auth)
  const { me } = authStore
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const { isEmpty, totalItems, cartTotal } = useCart()
  const categoryStore = useSelector((state) => state.category)
  const [showArticleMenu, setShowArticleMenu] = useState(false)
  const currentLanguage = useMemo(() => i18n?.languages[0], [i18n?.languages])
  const [show, setShow] = useState(false)
  const [showItems, setShowItems] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const onChangeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
    localStorage.setItem('lg', event.target.value)
  }

  const onChangeDevise = (event) => {
    localStorage.setItem('devise', event.target.value)
  }

  const currentDevise = localStorage.getItem('devise')
  console.log(showArticleMenu)

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-darkPurple"
        variant="dark"
      >
        <Container>
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
                  {t('offCanvas.title')}
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

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <div className="d-flex ">
                <input
                  className="w-100 p-2 border-0 "
                  placeholder={t('navbar.searchInput')}
                />
                <button className="bg-yellow px-4 m-0 border-0">
                  {t('navbar.searchButton')}
                </button>
              </div>
            </Nav>
            <Nav className="me-auto">
              <WhiteSelect
                height={30}
                width={70}
                value={currentLanguage}
                onChange={onChangeLanguage}
                data={[
                  { label: 'AR', value: 'ar' },
                  { label: 'EN', value: 'en' },
                ]}
                helper={t('navbar.language')}
              />
              <WhiteSelect
                height={30}
                width={80}
                value={currentDevise}
                onChange={onChangeDevise}
                data={[
                  { label: 'TND', value: 'tnd' },
                  { label: 'MAD', value: 'mad' },
                  { label: 'EUR', value: 'eur' },
                  { label: 'USD', value: 'usd' },
                ]}
                helper={t('navbar.devise')}
              />
            </Nav>
            <Nav className="me-auto">
              <div className={`d-flex align-items-center`}>
                {authStore.me?.avatar?.path ? (
                  <img
                    alt=""
                    src={authStore.me.avatar.path}
                    className="rounded-circle"
                    style={{ width: 50 }}
                  />
                ) : (
                  <RxAvatar size="30px" color="white" />
                )}
                <div className="text-white mx-2">
                  {authStore.me ? (
                    <a href="/profile" className="m-0 text-right">
                      {authStore.me.fullNameAr}
                    </a>
                  ) : (
                    <>
                      <a href="/login" className="m-0 text-right">
                        {t('navbar.account.profile')}
                      </a>
                      <a href="/signup" className="m-0">
                        {t('navbar.account.signup')}
                      </a>
                    </>
                  )}
                </div>
                <div>
                  {authStore.me &&  (
                    <IconButton href='/chat'>
                    <ChatCircleDots size={32} color="#ccaa00" />
                    </IconButton>
                    
                  ) }
                </div>   
              </div>
            </Nav>
            <Nav className="header-icon me-auto">
              <div className={` d-flex align-items-center`}>
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
                        {t('offCanvas.title')}
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
                  <p className="m-0 text-right">{t('navbar.cart')}</p>
                  <p className="m-0">
                    {cartTotal} {t('navbar.tot')}{' '}
                  </p>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container-fluid">
          <button
            onClick={() => setShowItems(!showItems)}
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main_nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class={`collapse navbar-collapse ${showItems ? 'd-flex' : ''}`}
            id="main_nav"
          >
            <ul class="navbar-nav w-100 justify-content-evenly">
              <li class="nav-item active">
                <a class="nav-link" href="/">
                  {t('navbar.home')}
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link  dropdown-toggle"
                  href="/articles"
                  data-bs-toggle="dropdown"
                >
                  {t('navbar.articles')}
                </a>
                <ul class="dropdown-menu">
                  {categoryStore.categories.items.map((elem, i) => (
                    <li>
                      <a
                        href={`/articles/cat/${elem.id}`}
                        class="dropdown-item"
                        key={i}
                      >
                        {currentLanguage === 'en' ? elem.nameEn : elem.nameAr}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/*">
                  {t('navbar.space')}
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/*">
                  {t('navbar.training')}
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/*">
                  {t('navbar.blogs')}
                </a>
              </li>
              {/* <li class="nav-item active">
                <a class="nav-link" href="/chat">
                  {t('chat')}
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar;
