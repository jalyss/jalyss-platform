import React, { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { showErrorToast,showSuccessToast } from '../../../../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateNeswSession } from '../../../../store/sessions';
import { Title } from '@mui/icons-material';
import AutoCompleteFilter from '../../../../components/Commun/AutoCompleteFilter';
import { fetchCategories } from '../../../../store/category';
import AddButton from '../../../../components/buttons/AddButton';

const Addtarif = () => {
    const [addsession,setAddsession]=useState({})
    const categoriesStore = useSelector((state) => state.category);
    const { categories } = categoriesStore;
    const [categoryId, setCategoryId] = useState([]);
    const dispatch = useDispatch()
    console.log(categoriesStore)

useEffect(()=>{
  dispatch(fetchCategories())
},[dispatch])
 


    const handleAddsessionChange = (e) => {
        const { name, value } = e.target.value;
        setAddsession((Addsession => ({ ...Addsession, [name]: value ? parseFloat(value) : null })
        ))}



        const submitsession = async (event) => {
            event.preventDefault();
            let sess=Object.assign({},addsession)
            dispatch( CreateNeswSession(sess))
              .then(res => {
                if (!res.error) {
                  showSuccessToast('session.created')
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
            id='title'
             type="text" 
             placeholder="Enter title" 
             name='title' 
             value={addsession?.Title}
           
             onChange={handleAddsessionChange } />
          </Form.Group>
          <Form.Group controlId="tariffDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
            id='description'
            type="text"
            value={addsession?.description}
            placeholder="Enter description"
            name='description' 
           
            onChange={handleAddsessionChange} />
          </Form.Group>
          <Form.Group controlId="tariffPrice">
            <Form.Label>start-Date</Form.Label>
            <Form.Control 
             type="date"
             id='startDate'
             value={addsession?.startDate}
             name='startDate'
             placeholder="startDate"
         
            onChange={handleAddsessionChange}/>
          </Form.Group>
          <Form.Group controlId="tariffPrice">
            <Form.Label>end-Date</Form.Label>
            <Form.Control
             type="date"
             id='endDate'
             name='endDate'
             value={addsession?.endDate}
             placeholder="endDate"
            onChange={handleAddsessionChange}/>
          </Form.Group>
          <Form.Group controlId="tariffPrice">
          <AutoCompleteFilter  
                        data={categories.items}
                        valueOptionName="nameEn"
                        labelOptionName="nameEn"
                        label="Filter by Category"
                        onChange={setCategoryId}
                        required
                       
                      />
                       </Form.Group>
                    
          <Button variant="primary"  onClick={submitsession}>Confirm</Button>
         
        </Card.Body>
      </Card>
    </div>
  );
};

export default Addtarif;
