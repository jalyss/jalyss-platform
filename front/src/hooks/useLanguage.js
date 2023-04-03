import { useTranslation } from "react-i18next"

function useLanguage() {
  const {t,i18n}=useTranslation()
  console.log('useLanguage',i18n.languages[0]);
  return (
    i18n.languages[0]
  )
}

export default useLanguage