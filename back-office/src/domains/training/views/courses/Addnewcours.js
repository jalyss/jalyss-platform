import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { CreateNeswcours } from "../../../../store/courses";
import { fetchCategories } from "../../../../store/category";

import AddButton from "../../../../components/buttons/AddButton";
import { useNavigate } from "react-router-dom";
import SaveButton from "../../../../components/Commun/buttons/SaveButton";
const Addnewcours = () => {
  const [addcours, setAddcours] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(addcours);

  const handleAddcoursChange = (e) => {
    const { name, value } = e.target;
    console.log(name);

    setAddcours((addcours) => ({
      ...addcours,
      [name]: value,
    }));
  };

  const submitcours = async (event) => {
    event.preventDefault();
    // let cou = Object.assign({}, addcours);
    addcours.startAt = new Date(addcours.startAt);
    addcours.endAt= new Date(addcours.endAt);
    console.log("cou",addcours);
    dispatch(CreateNeswcours(addcours)).then((res) => {
      if (!res.error) {
        showSuccessToast("cours.created");
        navigate(-1);
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
              onChange={handleAddcoursChange}
            />
          </Form.Group>
          <Form.Group controlId="tariffDescription">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              value={addcours?.content}
              placeholder="Enter content"
              name="content"
              onChange={handleAddcoursChange}
            />
          </Form.Group>

          <Form.Group controlId="tariffDescription">
            <Form.Label>Start Date</Form.Label>

            <input
              type="date"
              
             onChange={handleAddcoursChange}
              className="form-control"
              name="startAt"
            />
          </Form.Group>
          <Form.Group controlId="tariffDescription">
            <Form.Label>End Date</Form.Label>

            <input
              type="date"
              id="endAt"
              onChange={ handleAddcoursChange}

              className="form-control"
              name="endAt"

            />
          </Form.Group>

          <SaveButton variant="primary" onClick={submitcours} mt={20} />
        </Card.Body>
      </Card>
    </div>
   
  );
};

export default Addnewcours;
