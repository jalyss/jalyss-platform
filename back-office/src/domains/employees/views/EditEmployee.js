import React, { useEffect, useState, useRef} from 'react'

import '../../../assets/styles/signup.css'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { editEmployee, fetchEmployee } from '../../../store/employee'
import { useParams } from 'react-router-dom'
import { fetchBranches } from '../../../store/branche'
import { fetchRoles } from '../../../store/role'
import {fetchMedias} from "../../../store/media"
import axios from "axios";

import  Cropper ,{ReactCropperElement}  from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Dialog, DialogContent } from '@mui/material'
import CropEasy from '../../../components/CropEasy'


 
function EditEmployee() {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const authStore = useSelector((state) => state.auth)
  const [employee, setEmployee] = useState({})
  const roleStore = useSelector((state) => state.role)
  const branchStore = useSelector((state) => state.branche)
  const mediaStore =useSelector((state)=> state.media)
  const [editMode, setEditMode] = useState(false)
  const { employeeId } = useParams()
  const employeeStore = useSelector((state) => state.employee)
  const [avatar, setAvatar] = useState(null)

  const [preview, setPreview] = useState(null)
  const [open,setOpen]=useState(false)
  const [openCrop, setOpenCrop] = useState(false);
  const [opp, setOpp] = useState(null);
  
  
  

  useEffect(() => {
    dispatch(fetchBranches())
    dispatch(fetchRoles()) 
    dispatch(fetchMedias())
    dispatch(fetchEmployee(employeeId))
  }, [])

  
  useEffect(() => {
    if (employeeStore.employee)
      setEmployee(employeeStore.employee)
  }, [employeeStore.employee])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmployee((Employee) => ({ ...Employee, [name]: value }))
  }

  const submitEditProfile = async (event) => {
    if (!editMode) {
      event.preventDefault()
      setEditMode(true)
      
    } else {
      event.preventDefault()
      let aux = Object.assign({}, employee)
      if (avatar !== null) {
        const image = new FormData()
        image.append('file', avatar)
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_UPLOAD_ENDPOINT}/upload`,
          image
        )
        aux.avatarId = response.data.id
      }
      delete aux.branch;
      delete aux.role;
      delete aux.avatar;
      delete aux.Media;
      dispatch(editEmployee(aux))
      setEditMode(false)
    }
  }
  const handleImageChange = (e) => {

    const file = e.target.files[0]
    setOpp(file);
    setPreview(URL.createObjectURL(file))

    setOpenCrop(true)
    setAvatar(opp)
  }

  return ( !openCrop? (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Profile Employee</h2>
     
      <form className="checkout-form" onSubmit={submitEditProfile}>
        {/* <Dialog open={open}>
          <DialogContent>
             <Cropper
                src={preview?preview:employee?.avatar?.path} 
              
                style={{ height: 400, width: "100%" }}
                // Cropper.js options
                aspectRatio={1/ 1}
                guides={false}
                crop={onCrop}
                ref={cropperRef}
              /></DialogContent>      
         </Dialog> */}
        <div className="d-flex flex-wrap justify-content-center">
        {/* <label id="image">{t('image')}</label> */}
            <div class="image-upload">
             
            <img src={preview?preview:employee?.avatar?.path} alt="taswira" />
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
                    <TableCell className="fw-bold" align="left">
                      {t('nameAr')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          class="form-control mt-2"
                          required
                          name="fullNameAr"
                          id="fullNameAr"
                          value={employee?.fullNameAr}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{employee?.fullNameAr}</span>
                      )
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="left">
                      {t('nameEn')}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          class="form-control mt-2"
                          required
                          name="fullNameEn"
                          id="fullNameen"
                          value={employee?.fullNameEn}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{employee?.fullNameEn}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="left">
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
                          value={employee?.email}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{employee?.email}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="left">
                      Address
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          required
                          class="form-control mt-2"
                          id="address"
                          name="address"
                          value={employee?.address}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{employee?.address}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="left">
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
                          value={employee?.tel}
                          onChange={handleChange}
                        />
                      ) : (
                        <span>{employee?.tel}</span>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="left">
                      Branch
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <select
                          name='branchId'
                          class="form-control mt-2"
                          id="branch"
                          value={employee?.branchId}
                          onChange={handleChange}>
                          <option value={null} >--حدد الفرع--</option>
                          {branchStore.branches.items.map(item => (

                            <option value={item.id} >{item.name}</option>

                          ))}

                        </select>
                      ) : (
                        <span>{employee?.branch?.name}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="left">
                      Role
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <select
                          name='roleId'
                          class="form-control mt-2"
                          id="role"
                          value={employee?.roleId}
                        
                          onChange={handleChange}
                        >
                          <option value={null}>--حدد الدور--</option>
                          {roleStore.roles.items.map(item => (
                            <option value={item.id}>{item.nameAr}</option>
                          ))
                          }


                        </select>
                      ) : (
                        <span>{employee?.role?.nameAr}</span>
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
            <span className="label-btn" >{editMode ? 'Save': 'Edit'}</span>
          </button>
        </div>
      </form>
    </div>) : <CropEasy {...{ preview, setOpenCrop, setPreview, setOpp,setAvatar,avatar}}/>
  )
}

export default EditEmployee