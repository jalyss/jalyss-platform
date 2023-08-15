import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";

const profileclient = () => {
   const [isPaid, setIsPaid] = useState(false);
   const[isdelivered,setIsdelivered]=useState(false)
   const[isconfirm,setIsconfirm]=useState(false)
  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (event) => {
    setIsPaid(event.target.value);
  };
    const [editMode, setEditMode] = useState(false);
    const [preview, setPreview] = useState(null);
    const { t, i18n } = useTranslation();
  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
    <h2>Profile client</h2>
    <form className="checkout-form" >
      <div className="d-flex flex-wrap justify-content-center">
   
        <div className="image-upload">
          <img src="https://images.pexels.com/photos/17742455/pexels-photo-17742455/free-photo-of-portrait-of-brunette-woman.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="taswira" />
          {editMode && (
            <input
              id="image"
              type="file"
              accept="image/*"
            />
          )}
        </div>
        {preview && editMode && (
          <button
            type="button"
            class="delete-button"
          >
            X
          </button>
        )}

        <div className="d-flex justify-content-center w-100 m-3">
          <TableContainer className="w-100" component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold" align="right">
                    {t("nameAr")}
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <input
                        class="form-control mt-2"
                        required
                        name="fullNameAr"
                        id="fullNameAr"
                      />
                    ) : (
                      <span></span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold" align="right">
                    {t("nameEn")}
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <input
                         required
                        class="form-control mt-2"
                        name="fullNameEn"
                        id="fullNameEn"
                      />
                    ) : (
                      <span></span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold" align="right">
                    {t("email")}
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <input
                        required
                        class="form-control mt-2"
                        type="email"
                        id="email"
                        name="email"
                      />
                    ) : (
                      <span></span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold" align="right">
                    {t("phone")}
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <input
                        required
                        type="tel"
                        class="form-control mt-2"
                        id="tel"
                        name="tel" 
                      />
                    ) : (
                      <span></span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
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
                        
                      />
                    ) : (
                      <span></span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell className="fw-bold" align="right">
                  Delivered  
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <input  
                        required
                        class="form-control mt-2"
                        id="delivered"
                        name="delivered"  
                        value={isdelivered}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span  style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        backgroundColor: isdelivered ? '#4CAF50' : '#FFC107',
                        color: '#fff',
                      }}>{isdelivered? 'delivered' : 'Not delivered  '}</span>
                    )}
                    <button
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            borderRadius: '5px',
            backgroundColor: editMode ? '#2196F3' : '#4CAF50',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleEditModeToggle}
        >
          {editMode ? 'Save' : 'Edit'}
        </button>
                    
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell className="fw-bold" align="right">
        Paid
      </TableCell>
      <TableCell align="right">
        {editMode ? (
          <input
            required
            className="form-control mt-2"
            id="delivered"
            name="paid"
            value={isPaid}
            onChange={handleInputChange}
          />
        ) : (
          <span  style={{
            padding: '5px 10px',
            borderRadius: '5px',
            backgroundColor: isPaid ? '#4CAF50' : '#FFC107',
            color: '#fff',
          }}>{isPaid ? 'Paid' : 'Not Paid'}</span>
        )}
        <button
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            borderRadius: '5px',
            backgroundColor: editMode ? '#2196F3' : '#4CAF50',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleEditModeToggle}
        >
          {editMode ? 'Save' : 'Edit'}
        </button>
      </TableCell>
    </TableRow>
    <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell className="fw-bold" align="right">
                  Confirm 
                  </TableCell>
                  <TableCell align="right">
                    {editMode ? (
                      <input  
                        required
                        class="form-control mt-2"
                        id=" confirm "
                        name=" confirm "  
                        value={isconfirm}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span  style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        backgroundColor: isconfirm ? '#4CAF50' : '#FFC107',
                        color: '#fff',
                      }}>{isconfirm? ' confirm ' : 'Not  confirm   '}</span>
                    )}
                   <button
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            borderRadius: '5px',
            backgroundColor: editMode ? '#2196F3' : '#4CAF50',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleEditModeToggle}
        >
          {editMode ? 'Save' : 'Edit'}
        </button>
                    
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
        //   onSubmit={submitEditProfile}
        >
          <span className="label-btn">{editMode ? "حفظ" : "تعديل"}</span>
        </button>
      </div>
    </form>
  </div>
  )
}

export default profileclient