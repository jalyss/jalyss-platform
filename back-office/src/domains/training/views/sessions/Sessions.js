import { red } from '@mui/material/colors';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Sessions() {
  return (


    <div class="container">
    <div class="row">
      <div class="col">
      <Card style={{ width: '18rem' ,marginTop:'50px',marginLeft:20,}}>
     
     <Card.Body>
       <Card.Title   >Card Title</Card.Title>
       <Card.Text>
         Some quick example text to build on the card title and make up the
         bulk of the card's content.
         description 

       </Card.Text>
     </Card.Body>
     <ListGroup className="list-group-flush" style={{backgroundColor:'#AA00FF'}}>
       <ListGroup.Item> Start sessions: </ListGroup.Item>
       <ListGroup.Item> End sessions:  </ListGroup.Item>
       <ListGroup.Item>Session Type: </ListGroup.Item>
       <ListGroup.Item> Lectures :   </ListGroup.Item>
       <ListGroup.Item> Tarifs : </ListGroup.Item>
     </ListGroup>
     
     
   </Card>
      </div>
      <div class="col order-12">
      <Card style={{ width: '18rem' ,marginTop:'50px',marginLeft:20,}}>
     
     <Card.Body>
       <Card.Title   >Card Title</Card.Title>
       <Card.Text>
         Some quick example text to build on the card title and make up the
         bulk of the card's content.
         description 

       </Card.Text>
     </Card.Body>
     <ListGroup className="list-group-flush" style={{backgroundColor:'#AA00FF'}}>
       <ListGroup.Item> Start sessions: </ListGroup.Item>
       <ListGroup.Item> End sessions:  </ListGroup.Item>
       <ListGroup.Item>Session Type: </ListGroup.Item>
       <ListGroup.Item> Lectures :   </ListGroup.Item>
       <ListGroup.Item> Tarifs : </ListGroup.Item>
     </ListGroup>
     {/* <Card.Body>
      
     </Card.Body> */}
     
   </Card>
      </div>
      <div class="col order-1">
      <Card style={{ width: '18rem' ,marginTop:'50px',marginLeft:20,}}>
     
     <Card.Body>
       <Card.Title   >Card Title</Card.Title>
       <Card.Text>
         Some quick example text to build on the card title and make up the
         bulk of the card's content.
         description 

       </Card.Text>
     </Card.Body>
     <ListGroup className="list-group-flush" style={{backgroundColor:'#AA00FF'}}>
       <ListGroup.Item> Start sessions: </ListGroup.Item>
       <ListGroup.Item> End sessions:  </ListGroup.Item>
       <ListGroup.Item>Session Type: </ListGroup.Item>
       <ListGroup.Item> Lectures :   </ListGroup.Item>
       <ListGroup.Item> Tarifs : </ListGroup.Item>
     </ListGroup>
     {/* <Card.Body>
      
     </Card.Body> */}
     
   </Card>
      </div>
    </div>
  </div>
   
    
  );
}

export default Sessions;