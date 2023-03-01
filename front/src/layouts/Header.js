import React from 'react'

import { useTranslation } from 'react-i18next'

function Header() {
    const { t, i18n } = useTranslation()

    return (
        <div>

            <div className={`justify-content-between d-flex bg-darkPurple ${i18n?.languages[0] === 'ar' ? "flex-row-reverse" : "flex-row"} `}  >

                <div>

                    <img alt='' src='https://jalyss.com/img/prestashop-logo-1610973135.jpg' />
                </div>


                <div>
                    <input placeholder={t('navbar.searchInput')} />
                    <button>{t('navbar.searchButton')}</button>

                </div>
                <div>

                </div>
                <div>

                </div>
                <button onClick={() => {
                    if (i18n.languages[0] === 'ar') {
                        i18n.changeLanguage('en')
                        localStorage.setItem('lg', 'en')
                    }
                    else {
                        i18n.changeLanguage('ar')
                        localStorage.setItem('lg', 'ar')
                    }
                }}>language</button>
                <button>
                    {t('navbar.cart')}
                </button>
            </div>
            <div>
                <div>
                    <a href='/'>
                        <p>{t('navbar.home')}</p>
                    </a>
                </div>
                <div>
                    <a href='/articles'>
                        <p>{t('navbar.articles')}</p>
                    </a>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Header