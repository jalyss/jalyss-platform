import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import navbarAr from '../constants/traductions/arabic/navbar.json'
import navbarEn from '../constants/traductions/english/navbar.json'
import footerAr from '../constants/traductions/arabic/footer.json'
import footerEn from '../constants/traductions/english/footer.json'
import OneArticleAr from '../constants/traductions/arabic/oneArticle.json'
import OneArticleEn from '../constants/traductions/english/OneArticle.json'
import noPageAr from "../constants/traductions/arabic/noPage.json";
import noPageEn from "../constants/traductions/english/noPage.json";
import CheckoutAr from "../constants/traductions/arabic/checkout.json"; 
import CheckoutEn from "../constants/traductions/english/checkout.json"; 
import SignupAr from "../constants/traductions/arabic/signUp.json";
import SignupEn from "../constants/traductions/english/signUp.json";
import articlesAr from "../constants/traductions/arabic/articles.json";
import articlesEn from "../constants/traductions/english/articles.json";
import loginAr from "../constants/traductions/arabic/login.json";
import loginEn from "../constants/traductions/english/login.json";
import resetpassAr from "../constants/traductions/arabic/resetpass.json";
import resetpassEn from "../constants/traductions/english/resetpass.json";
import offCanvasAr from "../constants/traductions/arabic/offCanvas.json";
import offCanvasEn from "../constants/traductions/english/offCanvas.json";
import blogAr from "../constants/traductions/arabic/blog.json";
import blogEn from "../constants/traductions/english/blog.json";


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation:
          { ...navbarEn, ...footerEn, ...OneArticleEn, ...noPageEn,...CheckoutEn,...SignupEn,...articlesEn,...loginEn,...resetpassEn,...offCanvasEn,...blogEn}
      },
      ar: {
        translation:
          { ...navbarAr, ...footerAr, ...OneArticleAr, ...noPageAr,...CheckoutAr,...SignupAr,...articlesAr,...loginAr,...resetpassAr,...offCanvasAr,...blogAr }

      }
    },
    lng: localStorage.getItem('lg') ? localStorage.getItem('lg') : "ar", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });