import React, { useEffect, useState } from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { register } from '../../../store/auth'
import '../../../assets/styles/signup.css'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorToast, showSuccessToast } from '../../../utils/toast'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateUser() {
  const { t , i18n} = useTranslation()
  const dispatch = useDispatch()
  const navigate=useNavigate()
  

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [preview, setPreview] = useState(null)
  const [user, setUser] = useState({})
  const [avatar, setAvatar] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((User) => ({ ...User, [name]: value }))
  }
  console.log(avatar);
  const submitSignup = async (event) => {
    event.preventDefault();
    let aux = Object.assign({}, user)
    if (avatar!==null) {
      console.log('in if');
      const image = new FormData()
      image.append('file', avatar)
      const response=await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/upload`, image)
        aux.avatarId=response.data.id
    }

    dispatch(register(aux))
      .then(res => {
        if (!res.error) {
          showSuccessToast(t('user.created'))
          navigate('/profile')
        } else {
          console.log(res);
          showErrorToast(res.error.message)
        }
      }
      )
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    // const reader = new FileReader()
    // if (file) {
    //   reader.readAsDataURL(file)
    // }
    // reader.onloadend = () => {
    //   setPreview(reader.result)
    // }
    setPreview( URL.createObjectURL(file))
    setAvatar(file)

  }


  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>create user</h2>
      <form className="checkout-form" onSubmit={submitSignup}>
        <div className="d-flex flex-wrap">
         
          <div className=" m-3">
            <div class="row">
              <div class="col mb-3 ">
                <label for="fullNameAr">{t('nameAr')}<span style={{ color: 'red' }}>*</span>
                </label>

                <input
                  class="form-control mt-2"
                  required
                  name='fullNameAr'
                  id="fullNameAr"
                  value={user?.fullNameAr}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="fullNameEn">
                {t('nameEn')}<span style={{ color: 'red' }}>*</span>
                </label>

                <input
                  class="form-control mt-2"
                  required
                  id="fullNameEn"
                  name="fullNameEn"
                  pattern="^(\w\w+)\s(\w+)$"
                  value={user?.fullNameEn}
                  onChange={handleChange}
                />
              </div>
            </div>

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
                  name="email"
                  value={user?.email}
                  onChange={handleChange}
                />
              </div>
              <div class="col mb-3 ">
                <label for="tel">
                {t('phone')}<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  required
                  type="tel"
                  class="form-control mt-2"
                  id="tel"
                  name='tel'
                  value={user?.tel}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="row">
              <div class="col mb-3 ">
                <label for="password">
                {t('password')}<span style={{ color: 'red' }}>*</span>
                </label>
                <div className=" d-flex  " >
                  <input
                    style={{ width: '100%' }}
                    required
                    className='form-control'
                    id="password"
                    name='password'
                    type={isShowPassword ? 'text' : 'password'}
                    value={user?.password}
                    onChange={handleChange}
                  />
                  <div className='position-relative w-0'>
                    <div
                      style={{
                        left: i18n.languages[0] === 'ar' ? 15 : -25,
                        top: 5,

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
                <label for="address">
                {t('yy')}<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  required
                  class="form-control mt-2"
                  id="address"
                  name="address"
                  value={user?.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="row">
              <div class="col mb-3 ">
                <label for="country">{t('country')}</label>
                <input
                  // this must be autocomplete or select from array of country fetched from database
                  type="tel"
                  class="form-control mt-2"
                  id="country"
                  name="countryId"
                  value={user?.countryId}
                  onChange={handleChange}
                />
              </div>
              <div class="col mb-3 ">
                <label for="city">{t('city')}</label>
                <input
                  // this must be autocomplete or select from array of country fetched from database
                  class="form-control mt-2"
                  id="city"
                  name="cityId"
                  value={user?.cityId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="functionalArea"> {t('functionalArea')}</label>
                <input
                  class="form-control mt-2"
                  id="functionalArea"
                  name="functionalAreaId"
                  value={user?.functionalAreaId}
                  onChange={handleChange}
                />
              </div>
              <div class="col mb-3 ">
                <label for="educationLevel">{t('educationLevel')} </label>
                <input
                  class="form-control mt-2"
                  id="educationLevel"
                  name="educationLevelId"
                  value={user?.educationLevelId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="row">

              <div class="col mb-3 ">
                <label for="jobTitle">{t('jobTitle')} </label>
                <input
                  class="form-control mt-2"
                  id="jobTitle"
                  name="jobTitleId"
                  value={user?.jobTitleId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">


              </div>
            </div>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onSubmit={submitSignup}
          >
            <span className="label-btn"> add User </span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateUser
