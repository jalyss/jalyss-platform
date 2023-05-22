import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import OneArticleAr from '../constants/traductions/arabic/OneArticle.json'
import OneArticleEn from '../constants/traductions/english/OneArticle.json'
import noPageAr from "../constants/traductions/arabic/noPage.json";
import noPageEn from "../constants/traductions/english/noPage.json";
import SignupAr from "../constants/traductions/arabic/signUp.json";
import SignupEn from "../constants/traductions/english/signUp.json";
import articlesAr from "../constants/traductions/arabic/articles.json";
import articlesEn from "../constants/traductions/english/articles.json";
import loginAr from "../constants/traductions/arabic/login.json";
import loginEn from "../constants/traductions/english/login.json";
import resetpassAr from "../constants/traductions/arabic/resetpass.json";
import resetpassEn from "../constants/traductions/english/resetpass.json";



i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation:
          {  ...OneArticleEn, ...noPageEn,...SignupEn,...articlesEn,...loginEn,...resetpassEn}
      },
      ar: {
        translation:
          {  ...OneArticleAr, ...noPageAr,...SignupAr,...articlesAr,...loginAr,...resetpassAr}

      }
    },
    lng: localStorage.getItem('lg') ? localStorage.getItem('lg') : "ar", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });