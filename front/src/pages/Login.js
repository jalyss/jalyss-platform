import React, { useState } from 'react'

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import {login, register} from '../store/auth'
import { useNavigate } from 'react-router-dom'
import {showErrorToast, showSuccessToast} from '../utils/toast'
import FacebookLogin from "react-facebook-login";

function Login() {
  const { t, i18n } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitLogin = async (event) => {
    event.preventDefault();
    dispatch(login({ email: email, password: password }))
      .then(res => {
        if (!res.error) {
         window.location.pathname='/profile'
        } else {
          showErrorToast(res.error.message)
        }
      })
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({});

  const responseFacebook = async (response) => {
    console.log('renspose fb is:', response);
    console.log('status fb is:', response.status);

    if ( await response.status !== "unknown") {
          setData(
            {
                id: response.id,
                email: response.email,
                name: response.name,
                picture_url: response?.picture.data.url
            }
        );
    }

    if (response.accessToken) {
      setIsLoggedIn(true);
      // create user in db
        let aux = Object.assign({}, data);
        console.log('auxsssssx: ', aux)
        dispatch(register(aux)
        ).then((res) => {
            if (!res.error) {
                showSuccessToast(t("user.created"));
                navigate("/profile")
            } else {
                console.log(res);
                showErrorToast(res.error.message);
            }
        });
      //navigate('/profile');
    }
  }

 const regData =  async () => {

     let aux = Object.assign({}, data);
     console.log('auxx: ', aux)
     dispatch(register(aux)
     ).then((res) => {
         if (!res.error) {
             showSuccessToast(t("user.created"));
             navigate("/profile")
         } else {
             console.log(res);
             showErrorToast(res.error.message);
         }
     });
 }

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>{t('login')}</h2>
      <form className="checkout-form" onSubmit={submitLogin}>
        <div class="row">
          <div class="col mb-3 ">
            <label for="email">
              {t('email')}<span style={{ color: 'red' }}>*</span>
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
             {t('mdp')}<span style={{ color: 'red' }}>*</span>
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
              <div className='w-0 position-relative' >
                <div
                  style={{

                    left: i18n.languages[0] === 'ar' ? 15 : -25,
                    top: 15

                  }}
                  className="icon-eye"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>

            </div>


          </div>
        </div>
        
          <a href='reset-password' className="text-center">{t('forgetpass')}</a>
        
        <div className="w-100 d-flex justify-content-center">
          <button type="submit" className="confirm-button mt-3" onSubmit={submitLogin}>
            <span className="label-btn"> {t('btnlogin')}</span>
          </button>
        </div>
      </form>

      {console.log('is logged in?', isLoggedIn)}
      {/*{!isLoggedIn &&*/}
          <FacebookLogin
              appId="6510419415700314"
              autoLoad={true}
              callback={responseFacebook}
              fields="name,email,picture"
          />
      {/*}*/}

      {isLoggedIn &&
         <div>
           <div> {data.name}</div>
             <div> email is: {data.email}</div>
             <div> user id is: {data.id}</div>
           <img alt='img fb could not be loaded' src ={data.picture_url}/>

         </div>
      }
      
    </div>
  )
}

export default Login
