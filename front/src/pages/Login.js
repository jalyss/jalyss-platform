import React, { useState } from 'react'

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import '../assets/styles/signup.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)

  const login = () => {
    console.log({
      email,
      password,
    })
  }

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>login</h2>
      <form className="checkout-form" onSubmit={login}>
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
        <div class="row">
          <div class="col mb-3">
            <label for="password">
              كلمة المرور <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="position-relative">
              <input
                class="form-control mt-2"
                required
                id="password"
                type={isShowPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div
                className="icon-eye"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center">هل نسيت كلمة المرور؟</p>

        <div className="w-100 d-flex justify-content-center">
          <button type="submit" className="confirm-button mt-3" onClick={login}>
            <span className="label-btn">تسجيل الدخول</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
