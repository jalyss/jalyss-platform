import React, { useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { editcours, fetchOnecouse } from "../../../../store/courses";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const Coursdetail = () => {
const lecture=useSelector((state)=>state.courses.cours
)
  const  dispatch=useDispatch()
  const[cours,setCours]=useState({})
  const { t, i18n } = useTranslation();
  const [editMode, setEditMode] = useState(false)

  console.log('cours is here ',lecture)
  const {lectureId}=useParams()
  

 useEffect(()=>{
  dispatch(fetchOnecouse(lectureId)) 
  }, [lectureId])

  useEffect(()=>{
    setCours(cours)
  },[cours])

  const handlecoursChange = (e) => {
    const { name, value } = e.target;
    setCours((Cours) => ({ 
      ...Cours,
       [name]: value ? parseFloat(value) : null }));
  };


  
  
  const submitEditcours=async(event)=>{
    if(!editMode){
      event.preventDefault()
      setEditMode(true)
    }else{
      event.preventDefault()
        let courss= Object.assign({},cours)
        dispatch(editcours(courss) )
      setEditMode(false)
    }
  }


    
  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2> Courses</h2>
      <form className="checkout-form">
        <div className="d-flex flex-wrap">
          <div className="d-flex justify-content-center w-100 m-3">
            <TableContainer className="w-100" component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("titel")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          id="titel"
                           value={cours?.titel}
                          name="titel"
                          type="text"
                          className="form-control"
                          onChange={handlecoursChange}
                        />
                      ) : (
                        <span>{cours?.titel} </span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("description")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          name="description"
                          value={cours?.description}
                          type="text"
                          className="form-control"
                          onChange={handlecoursChange}
                        />
                      ) : (
                        <span>{cours?.description}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("start")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                          name="start"
                          value={cours?.startDate}
                          type="date"
                          className="form-control"
                          onChange={handlecoursChange}
                        />
                      ) : (
                        <span>{cours?.startDate}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("end")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
            
                          name="End"
                          value={cours?.endDate}
                          type="date"
                          className="form-control"
                          onChange={handlecoursChange}
                        />
                      ) : (
                        <span>{cours?.endDate}</span>
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
            onClick={submitEditcours}
          >
            <span className="label-btn">{editMode ? "حفظ" : "تعديل"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Coursdetail;
