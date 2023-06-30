import React, { useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { purple } from "@mui/material/colors";
import {useDispatch,useSelector} from 'react-redux';
import { editTarif, fetchOneTarif } from "../../../../store/tarif";
import { useParams } from "react-router-dom";
import Tarifs from "./Tarifs";


const UpdateForm = () => {
  const tarifStore= useSelector((state)=>state.tarif)
  // const {tarif}=tarifStore

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
    <div className="container d-flex justify-content-center" style={{ height: '100vh' }} 
    >
      <div className="card my-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="card-title mb-4">Update Tarif</h3>
          <form  className="d-flex flex-column">
            <div className="mb-3">
              <label 
               className="form-label">Title:</label>
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
            </div>
            <div className="mb-3">

              <label 
              className="form-label">Price:</label>
          { editMode?( <input id="price" 
          name="price"
              type="text" 
              value={tarif?.price || ""}
              onChange={handleTarifChange} className="form-control" />):(
                <span>{tarif?.price}</span>
              )}
             
            </div>
            {/* <div className="mb-3">
              <label 
               className="form-label">Description:</label>
              <textarea id="description" 
              // value={description}
               onChange={handlecoacheChange}
                className="form-control" />
            </div> */}
            <button
             type="submit" 
             style={{
               backgroundColor:purple,
                borderColor: purple
                }}
                onClick={submitEditTarif}
                >{editMode?"confirm":"update"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
