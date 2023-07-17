import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { CreateNeswcours} from "../../../../store/courses";
import { fetchCategories } from "../../../../store/category";

import AddButton from "../../../../components/buttons/AddButton";
import { useNavigate } from "react-router-dom";
import SaveButton from "../../../../components/Commun/buttons/SaveButton"
const Addnewcours= () => {
  const [addcours, setAddcours] = useState({});
 
  const dispatch = useDispatch();
  const navigate=useNavigate()

  console.log(addcours)






  const handleAddcoursChange = (e) => {
    const { name, value } = e.target
    console.log(name);

    setAddcours((addcours) => ({
      ...addcours,
      [name]: value 
    }));
  };

  const submitcours = async (event) => {
    event.preventDefault();
    let cou = Object.assign({}, addcours);
 
    dispatch(CreateNeswcours(cou)).then((res) => {
      if (!res.error) {
        showSuccessToast("cours.created");
        navigate(-1)
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };
  

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 card-container">
      <Card style={{ width: "18rem" }} className="text-center custom-card">
        <Card.Body>
          <Form.Group controlId="tariffName">
         
            <Form.Label>title</Form.Label>
            <input
              type="text"
              placeholder="Enter title"
              name="title"
              value={addcours?.Title}
              onChange={ handleAddcoursChange }
            />
          </Form.Group>
          <Form.Group controlId="tariffDescription">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              value={addcours?.content}
              placeholder="Enter content"
              name="content"
              onChange={ handleAddcoursChange }
            />
          </Form.Group>
          
        
          <SaveButton  variant="primary" onClick={submitcours}>
            Confirm
          </SaveButton>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Addnewcours;
