import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { showErrorToast,showSuccessToast } from '../../../../utils/toast';
import { useDispatch } from 'react-redux';
import CreateTarif from '../../../service/views/CreateTarif';
import { CreateNeswTarif } from '../../../../store/tarif';
import Title from 'antd/es/skeleton/Title';
const Addtarif = () => {
    // const [addtarif,setAddtarif]=useState({})
    const [title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const[price,setPrice]=useState('')
    const dispatch = useDispatch()

    const handleAddTarifChange = (e) => {
        const { name, value } = e.target
        setAddtarif((addtarif => ({ ...addtarif, [name]: value ? parseFloat(value) : null })
        ))}



        const submitTarif = async (event) => {
            event.preventDefault();
            let tar={price,title}
            dispatch(CreateNeswTarif(tar))
              .then(res => {
                if (!res.error) {
                  showSuccessToast('tarif.created')
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
            <Form.Label>title</Form.Label>
            <Form.Control
             type="text" 
             placeholder="Enter name" 
             name='name' 
             value={title}
             onChange={(e)=>{setTitle(e.target.value)} } />
          </Form.Group>
          {/* <Form.Group controlId="tariffDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter description"
            // name='description' 
            value={description}
            onChange={(e)=>{setDescription(e.target.value)} } />
          </Form.Group> */}
          <Form.Group controlId="tariffPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
             type="number"
             name='number'
             placeholder="Enter price"
             value={price}
            onChange={(e) => { setPrice(parseFloat(+e.target.value)) }}/>
          </Form.Group>
          <Button variant="primary"  onClick={submitTarif}>Confirm</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Addtarif;
