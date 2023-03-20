import React from "react";
import { useTranslation } from "react-i18next";

function NoPage() {
  const { t } = useTranslation()
  return (
    
    <div className="bg-purple ">
      
      <div className="stars"   >
        

        <div className="central-body">
          <h1 className="text-white">{t('noPage.commingSoon')}</h1>
          <img
            className="image-404"
            src="https://jalyss.com/img/prestashop-logo-1610973135.jpg"
            width="100px"
          />
          
          <a
            href="/"
            className="btn-go-home"

          >
            {t('noPage.goHome')}
          </a>
        </div>


        <div className="objects">

          <div className="box_astronaut">
            <img
              className="object_astronaut"
              src="https://jalyss.com/899-home_default/The-Subtle-Art-of-Not-Giving.jpg"
              width="100px"
            />
          </div>


        </div>
        <div className="objects">

          <div className="box_astronaut">
            <img
              className="object_astronaut"
              src="https://jalyss.com/899-home_default/The-Subtle-Art-of-Not-Giving.jpg"
              width="60px"
            />
          </div>

        </div>


        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  );
}

export default NoPage;
