import React, { useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { editcours, fetchOnecouse } from "../../../../store/courses";




const Coursdetail = () => {
  const Coursestore=useSelector((state)=>state.courses)
  const[cours,setCours]=useState({})
  const [editMode, setEditMode] = useState(false)
  const  dispatch=useDispatch()
  const {id}=useParams()
  

 useEffect(()=>{
  dispatch(fetchOnecouse(id)) 
  setCours(Coursestore.cours)
  }, [id])

  const handlecoursChange = (e) => {
    const { name, value } = e.target;
    setCours((cours) => ({ ...cours, [name]: value ? parseFloat(value) : null }));
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
    <div className="container d-flex justify-content-center" style={{ height: '100vh' }}  >
      <div className="card my-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="card-title mb-4">Update sessions</h3>
          <form  className="d-flex flex-column">
            <div className="mb-3">
              <label 
               className="form-label">Title:</label>
               {editMode ?(
              <input id="title"
               name='title'
               value={cours?.titel}
               type="text"          
               className="form-control"
               onChange={handlecoursChange }
               />) 
               : ( <span>{cours?.titel}</span>
               )}
               
            </div>
            <div className="mb-3">
              <label 
             
              className="form-label">  Category:</label> 
              {editMode ?( 
              <input id=" category" 
              name=" category"
              value={cours?.category}
              type="text" 
              onChange={ handlecoursChange }
              className="form-control" />) 
              : <span>{cours?.category}</span>}
            </div>
         
      
            
            <button
             type="submit"  
             style={{
               backgroundColor:purple,
                borderColor: purple
                }}
               onClick={submitEditcours}
                >{editMode?"confirm":"update"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Coursdetail;
