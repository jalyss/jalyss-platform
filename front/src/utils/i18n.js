import i18n from "i18next";
import {  initReactI18next } from "react-i18next";
import navbarAr from '../constants/traductions/arabic/navbar.json'
import navbarEn from '../constants/traductions/english/navbar.json'
import footerAr from '../constants/traductions/arabic/footer.json'
import footerEn from '../constants/traductions/english/footer.json'
import oneArticleAr from '../constants/traductions/arabic/OneArticle.json'
import oneArticleEn from '../constants/traductions/english/OneArticle.json'
import noPageAr from "../constants/traductions/arabic/noPage.json";
import noPageEn from "../constants/traductions/english/noPage.json";
//import CheckoutAr from "../constants/traductions/arabic/";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation:{...navbarEn,...footerEn,...oneArticleEn,...noPageEn}
      },
      ar:{
        translation: 
            {...navbarAr,...footerAr,...oneArticleAr,...noPageAr}
          
      }
    },
    lng: localStorage.getItem('lg')?localStorage.getItem('lg'):"ar", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });