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
  const categoriesStore = useSelector((state) => state.category);
  const { categories } = categoriesStore;
  const [categoryId, setCategoryId] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate()

  console.log(addcours)
console.log(categoryId)

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);





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
    cou.categoryId = categoryId;
   

    dispatch(CreateNeswcours(cou)).then((res) => {
      if (!res.error) {
        showSuccessToast("cours.created");
        // navigate(-1)
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };
  const handleChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
    
      alert("Please choose a category!");
    } else {
      // Option selected, update the categoryId state
      setCategoryId(selectedOption);
    }
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
          <Form.Group controlId="tariffPrice">
            <Form.Label>start-Date</Form.Label>
            {/* <Form.Control
              type="date"
              value={addcours?.startDate}
              name="startDate"
              placeholder="startDate"
              onChange={ handleAddcoursChange }
            /> */}
          </Form.Group>
          <Form.Group controlId="tariffPrice">
            <Form.Label>end-Date</Form.Label>
            {/* <Form.Control
              type="date"
              name="endDate"
              value={addcours?.endDate}
              placeholder="endDate"
              onChange={ handleAddcoursChange }
            /> */}
          </Form.Group>
          <Form.Group controlId="tariffPrice">
            <select
              value={categoryId}
              class="form-select mt-3"
              aria-label="Default select example"
              onChange={handleChange}
              required
            >
              <option value="" disabled selected>
                Choose your Blog category
              </option>
              {categories.items.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.nameEn}
                </option>
              ))}
            </select>
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
