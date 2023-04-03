import React from 'react'
import useLanguage from '../hooks/useLanguage'

function isEnglish() {
    const lg=useLanguage()
  return (
    lg==='en'
  )
}

export default isEnglish