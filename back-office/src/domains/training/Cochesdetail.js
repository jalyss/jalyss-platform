import React, { useEffect, useState } from 'react'

// import '../../../assets/styles/signup.css'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'



function EditUser() {
  const { t, i18n } = useTranslation()
 
  const [user, setUser] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [avatar, setAvatar] = useState(null)
  
  const [preview, setPreview] = useState(null)


 


//   const submitEditProfile = async (event) => {
//     if (!editMode) {
//       event.preventDefault()
//       setEditMode(true)
//     } else {
//       event.preventDefault()
//       let aux = Object.assign({}, user)

//       dispatch(editUser(aux))

//       setEditMode(false)
//     }
//   }

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
    
      <h2>Profile coches </h2>
      <form className="checkout-form" >
        <div className="d-flex flex-wrap">
        <label id="image">{t('image')}</label>
            <div class="image-upload">
             

              { editMode && (
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              )}
              </div>
              {preview && editMode && (
              <button
                type="button"
                class="delete-button"
                onClick={() => {
                  setPreview(null);
                  setAvatar(null);
                }}
              >
                X
              </button>
            )}
      
          <div className="d-flex justify-content-center w-100 m-3">
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
                        
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{user?.fullNameAr}</span>
                      )
                      }
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
                          
                          onChange={handleChange}
                        />
                      ) : (
                        <span>fullNameEn</span>
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
                         
                          onChange={handleChange}
                        />
                      ) : (
                        <span>email</span>
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
                       
                          onChange={handleChange}
                        />
                      ) : (
                        <span>tel</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      العنوان
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          required
                          class="form-control mt-2"
                          id="address"
                          name="address"
                          
                          onChange={handleChange}
                        />
                      ) : (
                        <span>address</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    
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
            
          >
            <span className="label-btn">{editMode ? 'حفظ' : 'تعديل'}</span>
          </button>
        </div>
      </form>
    </div>
  )

}

export default EditUser