import React, { useEffect, useState } from "react";
// import '../../../assets/styles/signup.css'
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { editCoach, fetchoneCoach } from "../../../../store/coach";
import { useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";

function CoachDetails() {
  const coach = useSelector((state) => state.coach?.coach);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const [auxCoach, setAuxCoach] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [fullname,setFullname]=useState('')
  const [email,setEmail]=useState('')
  const[address,setAddress]=useState('')
  const [tel,setTel]=useState('')
  const {id} = useParams();

  console.log('hello',coach)
  console.log('aya',auxCoach)

  useEffect(() => {
    dispatch(fetchoneCoach(id));
  }, [id]);

  useEffect(() => {
    setAuxCoach(coach);
  },[coach]);


  // const handlecoacheChange = (e) => {
  //   const { name, value } = e.target;
  //   setAuxCoach((auxCoach) => ({
  //     ...auxCoach ,
  //     [name]: value 
  //   }));
  // };


  const submitEditcoache = async (event) => {
    if (!editMode) {
      event.preventDefault();
      setEditMode(true);
    } 
 else {
      
      // let coch = Object.assign({}, auxCoach);
      let body ={
        fullname,
        email,
        address,
        address
      }
      dispatch(editCoach({id:id,body})).then((res)=>{
        if (res.error) {
          showErrorToast(res.error.message)
        } else {
          showSuccessToast('coach has been updted')
          // navigate(-1)
        }
      })
      setEditMode(false);
    }
     
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Profile coches</h2>
      <form className="checkout-form">
        <div className="d-flex flex-wrap">
          <label id="image">{t("image")}</label>

          <div class="image-upload">
            {/* <input id="image" type="file" accept="image/*" src={coach?.user?.avatar?.path}/> */}
            <img src={coach?.user?.avatar?.path} alt="image" style={{ width: '100%', marginBottom: '10px' }} /> 
          </div>

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
                          id="fullNameEn"
                          value={coach?.user?.fullNameEn || ''}
                          name="fullNameEn"
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setFullname(e.target.value);
                          }}
                        />
                      ) : (
                        <span>{coach?.user?.fullNameEn}</span>
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
                          name="email"
                          value={coach?.user?.email}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      ) : (
                        <span>{coach?.user?.email}</span>
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
                      
                          name="address"
                           value={coach?.user?.address}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                      ) : (
                        <span>{coach?.user?.address}</span>
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
            
                          name="tel"
                          value={coach?.user?.tel}
                          type="tel"
                          className="form-control"
                          onChange={(e) => {
                            setTel(e.target.value);
                          }}
                        />
                      ) : (
                        <span>{coach?.user?.tel}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  ></TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  ></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onClick={submitEditcoache}
          >
            <span className="label-btn">{editMode ? "حفظ" : "تعديل"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CoachDetails;
