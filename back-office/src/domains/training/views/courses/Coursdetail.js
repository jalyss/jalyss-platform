import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from '@mui/material/Button';


function Coursdetail() {
  return (
    <Card style={{ width: '1100px' ,height:'300px',top:-20,marginLeft:0}}>
      <Card.Img   style={{width: '1000px' ,height:'300px',marginLeft:'50px',borderRadius:'500px',alignItems:'center'}}variant="top" src="https://images.pexels.com/photos/4443160/pexels-photo-4443160.jpeg?auto=compress&cs=tinysrgb&w=600" />
      <Card.Body>
        <Card.Title> Title BOOK </Card.Title>    
        <Card.Text>
          description here please 
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">  
    
        <ListGroup.Item>  category </ListGroup.Item>
        <ListGroup.Item>code</ListGroup.Item>
        <ListGroup.Item>ArticleByAuthor</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <Button size="small" >Update</Button>
      <Button size="small" >Remove</Button>
      </Card.Body>
    </Card>
  );
}

export default  Coursdetail;