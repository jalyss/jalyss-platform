import React, { useState } from 'react'
import { register } from '../store/auth'
import '../assets/styles/signup.css'
import { useDispatch } from 'react-redux'
import { showErrorToast, showSuccessToast } from '../utils/toast'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function Profile() {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)
  const [preview, setPreview] = useState(null)
  const [user, setUser] = useState({})
  const [avatar, setAvatar] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((User) => ({ ...User, [name]: value }))
  }
  const submitEditProfile = async (event) => {
    if (!editMode) {
      event.preventDefault()
      setEditMode(true)
    } else {
      event.preventDefault()
      let aux = Object.assign({}, user)
      if (avatar !== null) {
        console.log('in if')
        const image = new FormData()
        image.append('file', avatar)
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          image
        )
        aux.avatarId = response.data.id
      }

      dispatch(register(aux)).then((res) => {
        if (!res.error) {
          showSuccessToast(t('user.created'))
        } else {
          console.log(res)
          showErrorToast(res.error.message)
        }
      })
      setEditMode(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setPreview(URL.createObjectURL(file))
    setAvatar(file)
  }

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Profile</h2>
      <form className="checkout-form" onSubmit={submitEditProfile}>
        <div className="d-flex">
          <div className="position-relative">
            <label id="image">{t('image')}</label>
            <div class="image-upload">
              <img
                src={
                  preview
                    ? preview
                    : 'http://tsr-industrie.fr/wp-content/uploads/2016/04/ef3-placeholder-image.jpg'
                }
                alt=""
              />

              {editMode && (
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              )}
            </div>
            {preview && (
              <button
                type="button"
                class="delete-button"
                onClick={() => {
                  setPreview(null)
                  setAvatar(null)
                }}
              >
                X
              </button>
            )}
          </div>
          <div className="w-100">
            <TableContainer className="w-100" component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('nameAr')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          class="form-control mt-2"
                          required
                          name="fullNameAr"
                          id="fullNameAr"
                          value={user?.fullNameAr}
                          onChange={handleChange}
                        />
                      ) : (
                        user?.fullNameAr
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('nameEn')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          class="form-control mt-2"
                          required
                          name="fullNameAr"
                          id="fullNameAr"
                          value={user?.fullNameAr}
                          onChange={handleChange}
                        />
                      ) : (
                        user?.fullNameEn
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('email')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          required
                          class="form-control mt-2"
                          type="email"
                          id="email"
                          name="email"
                          value={user?.email}
                          onChange={handleChange}
                        />
                      ) : (
                        user?.email
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('phone')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          required
                          type="tel"
                          class="form-control mt-2"
                          id="tel"
                          name="tel"
                          value={user?.tel}
                          onChange={handleChange}
                        />
                      ) : (
                        user?.phone
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('address')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          required
                          class="form-control mt-2"
                          id="address"
                          name="address"
                          value={user?.address}
                          onChange={handleChange}
                        />
                      ) : (
                        user?.address
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('country')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          type="tel"
                          class="form-control mt-2"
                          id="country"
                          name="countryId"
                          value={user?.countryId}
                          onChange={handleChange}
                        />
                      ) : (
                        user?.countryId
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('city')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          class="form-control mt-2"
                          id="city"
                          name="cityId"
                          value={user?.cityId}
                          onChange={handleChange}
                        />
                      ) : (
                        user?.cityId
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('functionalArea')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          class="form-control mt-2"
                          id="functionalArea"
                          name="functionalAreaId"
                          value={user?.functionalAreaId}
                          onChange={handleChange}
                        />
                      ) : (
                        user?.functionalAreaId
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('educationLevel')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          class="form-control"
                          id="educationLevel"
                          name="educationLevelId"
                          value={user?.educationLevelId}
                          onChange={handleChange}
                        />
                      ) : (
                        user?.educationLevelId
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t('jobTitle')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          class="form-control mt-2"
                          id="jobTitle"
                          name="jobTitleId"
                          value={user?.jobTitleId}
                          onChange={handleChange}
                        />
                      ) : (
                        user?.jobTitleId
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onSubmit={submitEditProfile}
          >
            <span className="label-btn">{editMode ? 'حفظ' : 'تعديل'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile
