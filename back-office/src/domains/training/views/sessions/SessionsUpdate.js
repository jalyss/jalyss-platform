import React, { useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { purple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { editsession, fetchOnesession } from "../../../../store/sessions";
import { useParams } from "react-router-dom";




const SessionsUpdate = () => {
    const sessionsStore=useSelector((state)=>state.sessions)
    // const {session}=sessionsStore
    const dispatch=useDispatch()
    const[session,setSession]=useState({})  
    const [editMode, setEditMode] = useState(false)
    const {id}=useParams()

  
    useEffect(()=>{
        dispatch(fetchOnesession(id))
        setSession(sessionsStore.session)
    },[id])

    const handlesessionChange = (e) => {
      const { name, value } = e.target;
      setSession((session) => ({ ...session, [name]: value ? parseFloat(value) : null }));
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
               value={session?.titel}
               type="text"          
               className="form-control"
               onChange={handlesessionChange}
               />) 
               : ( <span>{session?.titel}</span>
               )}
               
            </div>
            <div className="mb-3">
              <label 
             
              className="form-label"> description:</label> 
              {editMode ?( 
              <input id=" description" 
              name=" description"
              type="text" 
              onChange={handlesessionChange}
              className="form-control" />) 
              : <span>{session?.description}</span>}
            </div>
            <div className="mb-3">
              <label 
              className="form-label">Start sessions:</label>
              {editMode ?(
              <input 
              type="date"
              id="Start sessions" 
              name="Start sessions"
              onChange={handlesessionChange}
               
              className="form-control" />) 
              :<span>{session?.startDate}</span>}
            </div>
              <div className="mb-3">
              <label 
              className="form-label">End sessions:</label>
              {editMode ? (
              <input 
              type="date"
              id=" End sessions" 
              name="End sessions"
             onChange={handlesessionChange}
              className="form-control" />)
              :(<span>{session?.endDate}</span>)}
            </div>
      
            
            <button
             type="submit"  
             style={{
               backgroundColor:purple,
                borderColor: purple
                }}
               onClick={submitEditsession}
                >{editMode?"confirm":"update"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SessionsUpdate;
