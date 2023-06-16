import { red } from '@mui/material/colors';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux'
import { fetchsessions } from '../../../../store/sessions';
import { useState } from 'react';

function Sessions() {
  const sessionStore = useSelector((state) => state.sessions.sessions.items)
  // const {sessions}=sessionStore
  const dispatch = useDispatch()
  

  useEffect(()=>{
  dispatch(fetchsessions()) 
  }, [])

  {console.log('here',sessionStore)}


  return (
    <div class="container"> 
    {sessionStore.map((el,i)=>(
      <div cladss="row">
    
         <div class="col"> 
    
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
       
       
     </Card>
         
        </div> 
     </div>
     ))}  
    </div>
  );
}

export default Sessions;