import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'

function NewPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const submitResetPassword = async (event) => {
    event.preventDefault()
    navigate('/login')
  }

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>{t('reset')}</h2>
      <form className="checkout-form" onSubmit={submitResetPassword}>
        <div class="row">
          <div class="col mb-3 ">
            <label for="email">
              {t('mdp')}
              <span style={{ color: 'red' }}>*</span>
            </label>
            <div className=" d-flex ">
              <input
                class="form-control mt-2 w-100"
                required
                id="password"
                type={isShowPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div className="w-0 position-relative">
                <div
                  style={{
                    left: i18n.languages[0] === 'ar' ? 15 : -25,
                    top: 15,
                  }}
                  className="icon-eye"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3 ">
            <label for="email">
            {t('confpass')}  
                <span style={{ color: 'red' }}>*</span>
            </label>
            <div className=" d-flex ">
              <input
                class="form-control mt-2 w-100"
                required
                id="password"
                type={isShowPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <div className="w-0 position-relative">
                <div
                  style={{
                    left: i18n.languages[0] === 'ar' ? 15 : -25,
                    top: 15,
                  }}
                  className="icon-eye"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onSubmit={submitResetPassword}
          >
            <span className="label-btn">{t('confirm')}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewPassword
