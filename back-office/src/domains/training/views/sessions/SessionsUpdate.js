import React, { useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { editsession, fetchOnesession } from "../../../../store/sessions";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";


const SessionsUpdate = () => {
    const sessions=useSelector((state)=>state.sessions.session)
    const { t, i18n } = useTranslation();
    const dispatch=useDispatch()
    const[session,setSession]=useState({})  
    const [editMode, setEditMode] = useState(false)
    const {sessionsId}=useParams()

  console.log(sessions)
    useEffect(()=>{
        dispatch(fetchOnesession(sessionsId))
    },[dispatch])

    useEffect(()=>{
      setSession(session)
    },[session])

    const handlesessionChange = (e) => {
      const { name, value } = e.target;
      setSession((sessions) => ({ ...sessions, [name]: value ? parseFloat(value) : null }));
    };


    const submitEditsession=async(event)=>{
      if(!editMode){
        event.preventDefault()
        setEditMode(true)
      }else{
        event.preventDefault()
          let sess= Object.assign({},session)
          console.log('sess',sess)
          dispatch(editsession(sess) )
        setEditMode(false)
      }
    }


  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Profile coches</h2>
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
                        name='title'
                        value={sessions?.titel}
                        type="text"          
                        className="form-control"
                        onChange={handlesessionChange}
                        />
                      ) : (
                        <span> {sessions?.titel}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t(" description")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                        name=" description"
                        type="text" 
                        value={sessions?.description}
                        onChange={handlesessionChange}
                        className="form-control" 
                        />
                      ) : (
                        <span>{sessions?.description}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t("start-Date")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
                      
                        type="date"
                        id="Start sessions" 
                        name="Start sessions"
                        onChange={handlesessionChange}
                         valure={sessions?.startDate}
                        className="form-control" 
                        />
                      ) : (
                        <span>{sessions?.startDate}</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="fw-bold" align="right">
                      {t(" End sessions")}
                    </TableCell>
                    <TableCell align="right">
                      {editMode ? (
                        <input
            
                        type="date"
                        id=" End sessions" 
                        name="End sessions"
                        value={sessions?.endDate}
                        onChange={handlesessionChange}
                        className="form-control" 
                        />
                      ) : (
                        <span>{sessions?.endDate}</span>
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
            onClick={submitEditsession}
          >
            <span className="label-btn">{editMode ? "حفظ" : "تعديل"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionsUpdate;