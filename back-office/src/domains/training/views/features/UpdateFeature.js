import React, { useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { purple } from "@mui/material/colors";
import {useDispatch,useSelector} from 'react-redux';
import { editTarif, fetchOneTarif } from "../../../../store/tarifss";
import { useNavigate, useParams } from "react-router-dom";
import Tarifs from "./Features";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { fetchsessions } from "../../../../store/sessions";
const UpdateFeatures = () => {
  const tarifStore= useSelector((state)=>state.tarif)
  const sessionstore=useSelector((state)=>state.sessions.sessions.items)
  console.log( sessionstore)
  const { t, i18n } = useTranslation();
   const  navigate=useNavigate()
  const dispatch = useDispatch()
  const [sessionId,setSessionId]=useState('')
  const [title,setTitle]=useState('')
  const [price,setprice]=useState('')
  const [tarif,setTarif]=useState({})
  const [editMode, setEditMode] = useState(false)


  const [skip, setSkip] = useState(0);


 
  const take = 6;

  useEffect(() => {
    dispatch(fetchsessions({ take, skip }));
  }, [dispatch, take, skip]);

const {tarifId}=useParams()

  useEffect(()=>{

  dispatch(fetchOneTarif(tarifId))  
  setTarif(tarifStore.tarif)

},[tarifId])

useEffect(()=>{
  dispatch(fetchsessions())
},[])



// const handleTarifChange = (e) => {
//   const { name, value } = e.target;
//   setTarif((tarif) => ({ ...tarif, [name]: value ? parseFloat(value) : null }));
// };

const submitEditTarif=async(event)=>{
  if(!editMode){
    event.preventDefault()
    setEditMode(true)
  }else{
    
   
      // delete co.id
      // delete co.sessionId
      // console.log("co",co);

      dispatch(editTarif({id:tarifId, title,
        price,sessionId})).then((res)=>{
        if (res.error) {
          showErrorToast(res.error.message)
        } else {
          showSuccessToast('session has been updted')
          navigate(-1)
      
        }
      })
    setEditMode(false)
  }
} 

const handleChange = (e) => {
  const selectedOption = e.target.value;
  if (selectedOption === "") {
    // No option selected, display an error message or take appropriate action
    alert("Please choose a category!");
  } else {
    // Option selected, update the categoryId state
    setSessionId(selectedOption);
  }
};

  return (
    // <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
    //   <h2>update Tarifs</h2>
    //   <form className="checkout-form">
    //     <div className="d-flex flex-wrap">
        

    //       <div className="d-flex justify-content-center w-100 m-3">
    //         <TableContainer className="w-100" component={Paper}>
    //           <Table aria-label="simple table">
    //             <TableBody>
    //               <TableRow
    //                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //               >
    //                 <TableCell className="fw-bold" align="right">
    //                   {t("titel")}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                 { editMode ? (   
    //           <input id="title"
    //            name='title'
    //            type="text" 
    //            value={title} 
    //            onChange={(e)=>{setTitle(e.target.value)}}
    //            className="form-control"
                
    //            />):(
    //             <span>{tarif?.title}</span>
    //            )} 
    //                 </TableCell>
    //               </TableRow>
    //               <TableRow
    //                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //               >
    //                 <TableCell className="fw-bold" align="right">
    //                   {t(" price")}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                 { editMode?( <input id="price" 
    //                     type="number"
    //                     name='number'
    //                     placeholder="Enter price"
    //                     value={price} 
    //                       onChange={(e) => { setprice(parseFloat(+e.target.value)) }}
    //                     className="form-control" />):(
    //             <span>{tarif?.price}</span>
    //           )}
    //                 </TableCell>
    //               </TableRow>
    //               <TableCell className="fw-bold" align="right">
    //     {t("  session")}
    //   </TableCell>
    //               {editMode ? (
    //     <select
    //     value={sessionId}
    //     className="form-select mt-3"
    //     aria-label="Default select example"
    //     onChange={handleChange}
    //     required
    //     style={{ marginLeft: "10px" }}
    //   >
    //     <option value="" disabled>
    //       Choose your Blog category
    //     </option>
    //     { sessionstore.items.map((el, index) => (
    //       <option key={index} value={el.id}>
    //         {el.title}
    //       </option>
    //     ))}
    //   </select>
      
    //   ) : (
    //     <span>{tarif?.sessionId}</span>
    //   )}
          
                  
    //               <TableRow
    //                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    //               >
                    
     
    //          </TableRow>
    //             </TableBody>
    //           </Table>
    //         </TableContainer>
    //       </div>
    //     </div>

    //     <div className="w-100 d-flex justify-content-center">
    //       <button
    //         type="submit"
    //         className="confirm-button mt-3"
    //         onClick={submitEditTarif}
    //       >
    //         <span className="label-btn">{editMode ? "حفظ" : "تعديل"}</span>
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div>hello</div>
  );
};

export default UpdateFeatures;
