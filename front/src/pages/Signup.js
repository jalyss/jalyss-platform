import React, { useEffect, useState } from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { createSignUp, fetchAuth, fetchSign_up, register } from '../store/signUp'
import '../assets/styles/signup.css'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorToast } from '../utils/toast'

function Signup() {
  const dispatch = useDispatch()
  const signUpStore= useSelector((state) => state.auth)

  const [fullNameAr, setFullNameAr] = useState('')
  const [fullNameEn, setFullNameEn] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const [tel, setTel] = useState('')
  const [password, setPassword] = useState('')
  const [educationLevel, setEducationLevel] = useState('')
  const [functionalArea, setFunctionalArea] = useState('')
  const [jobTitle, setJobTitle ] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [accountBalance, setAccountBalance] = useState('')
  
  const [isShowPassword, setIsShowPassword] = useState(false)

  useEffect(() => {
    dispatch(fetchAuth())
  }, [])

  const [preview, setPreview] = useState(null)
  const submitSignup = async (event) => {
    event.preventDefault();
    dispatch(register())
      .then(res => {
        if (!res.error) {
          showSuccessToast(t('user.created'))
        } else {
          console.log(res);
          showErrorToast(res.error.message)
        }
      }
      )
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setPreview(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  
  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Signup</h2>
      <form className="checkout-form" onSubmit={submitSignup}>
        <div className="d-flex">
          <div className="position-relative">
            <label id="image">الصورة</label>
            <div class="image-upload">
              <img
                src={
                  preview ||
                  'http://tsr-industrie.fr/wp-content/uploads/2016/04/ef3-placeholder-image.jpg'
                }
                alt=""
              />
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {preview && (
              <button
                class="delete-button"
                onClick={() => setPreview(undefined)}
              >
                X
              </button>
            )}
          </div>
          <div className="w-100">
            <div class="row">
              <div class="col mb-3 ">
                <label for="fullNameAr">
                الاسم بالعربية <span style={{ color: 'red' }}>*</span>
                </label>

                <input
                  class="form-control mt-2"
                  required
                  id="fullNameAr"
                  value={fullNameAr}
                  onChange={(event) => setFullNameAr(event.target.value)}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="fullNameEn">
                الاسم بالإنجليزية <span style={{ color: 'red' }}>*</span>
                </label>

                <input
                  class="form-control mt-2"
                  required
                  id="fullNameEn"
                  value={fullNameEn}
                  onChange={(event) => setFullNameEn(event.target.value)}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="email">
                عنوان البريد الإلكتروني<span style={{ color: 'red' }}>*</span>
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
              <div class="col mb-3 ">
                <label for="tel">
                  الهاتف<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  required
                  type="tel"
                  class="form-control mt-2"
                  id="tel"
                  value={tel}
                  onChange={(event) => setTel(event.target.value)}
                />
              </div>
            </div>
            <div class="row">
              <div class="col mb-3 ">
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
                    {isShowPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col mb-3 ">
                <label for="address">
                  العنوان<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  required
                  class="form-control mt-2"
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>
            </div>
            <div class="row">
              <div class="col mb-3 ">
                <label for="country">البلد</label>
                <input
                  // this must be autocomplete or select from array of country fetched from database
                  type="tel"
                  class="form-control mt-2"
                  id="country"
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                />
              </div>
              <div class="col mb-3 ">
                <label for="city">المدينة</label>
                <input
                  // this must be autocomplete or select from array of country fetched from database
                  class="form-control mt-2"
                  id="city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="functionalArea">المجال الوظيفي</label>
                <input
                  class="form-control mt-2"
                  id="functionalArea"
                  value={functionalArea}
                  onChange={(event) => setFunctionalArea(event.target.value)}
                />
              </div>
              <div class="col mb-3 ">
                <label for="educationLevel">المستوى التعليمي</label>
                <input
                  class="form-control mt-2"
                  id="educationLevel"
                  value={educationLevel}
                  onChange={(event) => setEducationLevel(event.target.value)}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="accountBalance">رصيد حسابك</label>
                <input
                  class="form-control mt-2"
                  id="accountBalance"
                  value={accountBalance}
                  onChange={(event) => setAccountBalance(event.target.value)}
                />
              </div>
              <div class="col mb-3 ">
                <label for="jobTitle">اسم الوظيفة</label>
                <input
                  class="form-control mt-2"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(event) => setJobTitle (event.target.value)}
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
            <span className="label-btn">تسجيل</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
