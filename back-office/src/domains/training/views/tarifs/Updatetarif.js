import React, { useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { purple } from "@mui/material/colors";
import {useDispatch,useSelector} from 'react-redux';
import { editTarif, fetchOneTarif } from "../../../../store/tarif";
import { useParams } from "react-router-dom";
import Tarifs from "./Tarifs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
const UpdateForm = () => {
  const tarifStore= useSelector((state)=>state.tarif)
  // const {tarif}=tarifStore
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()
  const [tarif,setTarif]=useState({})
  const [editMode, setEditMode] = useState(false)


const {tarifId}=useParams()


  useEffect(()=>{
 
  dispatch(fetchOneTarif(tarifId))
  setTarif(tarifStore.tarif)

},[tarifId])



const handleTarifChange = (e) => {
  const { name, value } = e.target;
  setTarif((tarif) => ({ ...tarif, [name]: value ? parseFloat(value) : null }));
};

const submitEditTarif=async(event)=>{
  if(!editMode){
    event.preventDefault()
    setEditMode(true)
  }else{
    event.preventDefault()
      let co = Object.assign({},tarif)
      // delete co.id
      delete co.sessionId
      console.log("co",co);

      dispatch(editTarif(co) )
    setEditMode(false)
  }
}

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
      <h2>Tarifs</h2>
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
                    { editMode ? (   
              <input id="title"
               name='title'
               type="text" 
               value={tarif?.title} 
               onChange={handleTarifChange}
               className="form-control"
                
               />):(
                <span>{tarif?.title}</span>
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
                    { editMode?( <input id="price" 
                        name="price"
                         type="text" 
                        value={tarif?.price || ""}
                        onChange={handleTarifChange} 
                        className="form-control" />):(
                <span>{tarif?.price}</span>
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
            onClick={submitEditTarif}
          >
            <span className="label-btn">{editMode ? "حفظ" : "تعديل"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
