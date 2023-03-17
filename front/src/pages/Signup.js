import React, { useState } from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import '../assets/styles/signup.css'

function Signup() {
  const [email, setEmail] = useState('')
  const [clientName, setClientName] = useState('')
  const [country, setCountry] = useState('')
  const [clientTel, setClientTel] = useState('')
  const [password, setPassword] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [city, setCity] = useState('')
  const [educationLevel, setEducationLevel] = useState('')
  const [functionalArea, setFunctionalArea] = useState('')
  const [jobName, setJobName] = useState('')
  const [accountBalance, setAccountBalance] = useState('')
  const [category, setCategory] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)

  const signup = () => {
    console.log({
      email,
      clientName,
      country,
      clientTel,
      password,
      clientAddress,
      city,
      educationLevel,
      functionalArea,
      jobName,
      accountBalance,
      category,
    })
  }

  const [preview, setPreview] = useState(null)

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
      <form className="checkout-form" onSubmit={signup}>
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
                <label for="clientName">
                  الاسم <span style={{ color: 'red' }}>*</span>
                </label>

                <input
                  class="form-control mt-2"
                  required
                  id="clientName"
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                />
              </div>
            </div>

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
              <div class="col mb-3 ">
                <label for="clientTel">
                  الهاتف<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  required
                  type="tel"
                  class="form-control mt-2"
                  id="clientTel"
                  value={clientTel}
                  onChange={(event) => setClientTel(event.target.value)}
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
                <label for="clientAddress">
                  العنوان<span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  required
                  class="form-control mt-2"
                  id="clientAddress"
                  value={clientAddress}
                  onChange={(event) => setClientAddress(event.target.value)}
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
                <label for="jobName">اسم الوظيفة</label>
                <input
                  class="form-control mt-2"
                  id="jobName"
                  value={jobName}
                  onChange={(event) => setJobName(event.target.value)}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="category">الفئة</label>
                <RadioGroup
                  onChange={(event) => setCategory(event.target.value)}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  id="category"
                >
                  <FormControlLabel
                    value="fournisseur"
                    control={<Radio />}
                    label="Fournisseur"
                    className="m-0"
                  />
                  <FormControlLabel
                    value="partenaire"
                    control={<Radio />}
                    label="Partenaire"
                    className="m-0"
                  />
                  <FormControlLabel
                    value="intermediaire"
                    control={<Radio />}
                    label="Intermediaire"
                    className="m-0"
                  />
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onClick={signup}
          >
            <span className="label-btn">تسجيل</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
