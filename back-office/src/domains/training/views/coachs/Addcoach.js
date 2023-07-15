import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { showErrorToast,showSuccessToast } from '../../../../utils/toast';
import { useDispatch } from 'react-redux';
import { CreateNeswcoach } from '../../../../store/coach';

const Addcoach = () => {
    const [addcoach,setAddcoach]=useState({})
    const dispatch = useDispatch()

    const handleAddcoachChange = (e) => {
        const { name, value } = e.target;
        setAddcoach((addcoach=> ({ ...addcoach, [name]: value ? parseFloat(value) : null })
        ))}



        const submitcoach = async (event) => {
            event.preventDefault();
            let add= Object.assign({},addcoach)
            dispatch(CreateNeswcoach(add))
              .then(res => {
                if (!res.error) {
                  showSuccessToast('coach.created')
                } else {
                  console.log(res);
                  showErrorToast(res.error.message)
                }
              }
              )
          };
        

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 card-container">
      <Card style={{ width: '18rem' }} className="text-center custom-card">
        <Card.Body>
          <Form.Group controlId="tariffName">
            <Form.Label>Name</Form.Label>
            <Form.Control
             type="text" 
             placeholder="Enter name" 
             name='name' 
             onChange={handleAddcoachChange} />
          </Form.Group>
         
          <Button variant="primary"  onClick={submitcoach}>Confirm</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Addcoach ;
