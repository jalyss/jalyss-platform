import { red } from '@mui/material/colors';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux'
import { deletsessions, fetchsessions } from '../../../../store/sessions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";



function Sessions() {

  const sessionStore = useSelector((state) => state.sessions.sessions.items)
  // const {sessions}=sessionStore
  const dispatch = useDispatch()
  const navigate=useNavigate()

  useEffect(()=>{
  dispatch(fetchsessions()) 

  }, []) 

  const handleDeletesessionsClick=(id) => {
    dispatch(deletsessions(id))
    .then(res => {
      if (res.error) {
        showErrorToast(res.error.message)
      } else {
        showSuccessToast('tarif has been deleted')
      }
    })
  };
  

  return (
    <div class="container"> 
    {sessionStore.map((el,i)=>(
      <div cladss="row">
    
         <div class="col"> 
         {console.log("iddd",el.id)}
        <Card style={{marginTop:'50px',}}>
       
       <Card.Body>
       
  
       
         <Card.Title   >{el.title }</Card.Title>
        
         <Card.Text>
         
          {el. description}
         </Card.Text>
       </Card.Body> 
       <ListGroup className="list-group-flush" style={{backgroundColor:'#AA00FF'}}>
         <ListGroup.Item> Start sessions: {el.startDate}</ListGroup.Item>
         <ListGroup.Item> End sessions: {el.endDate} </ListGroup.Item>
        
       </ListGroup>
       <button  size="small"  onClick={()=>{handleDeletesessionsClick(el.id)}}>Delete</button>
       <button  size="small"  onClick={()=>{navigate(`${el.id}`)}}>Update</button>
       
       
     </Card>
         
        </div> 
     </div>
     ))}  
    </div>
  );
}

export default Sessions;