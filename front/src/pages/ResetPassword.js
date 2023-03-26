import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { resetPassword } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { showErrorToast } from '../utils/toast'

function ResetPassword() {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitResetPassword = async (event) => {
    event.preventDefault()
    dispatch(resetPassword({ email })).then((res) => {
      if (!res.error) {
        navigate(`/login`)
      } else {
        showErrorToast(res.error.message)
      }
    })
  }

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Reset Password</h2>
      <form className="checkout-form" onSubmit={submitResetPassword}>
        <div class="row">
          <div class="col mb-3 ">
            <label for="email">
              عنوان البريد<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              required
              class="form-control mt-2"
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onSubmit={submitResetPassword}
          >
            <span className="label-btn">إرسال رابط إعادة الضبط</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
