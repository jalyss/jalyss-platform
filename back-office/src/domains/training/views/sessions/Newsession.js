import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { CreateNeswSession } from "../../../../store/sessions";
import { Title } from "@mui/icons-material";
import AutoCompleteFilter from "../../../../components/Commun/AutoCompleteFilter";
import { fetchCategories } from "../../../../store/category";
import AddButton from "../../../../components/buttons/AddButton";
import { useNavigate } from "react-router-dom";
import SaveButton from "../../../../components/Commun/buttons/SaveButton"
const Addtarif = () => {
  const [addsession, setAddsession] = useState({});
  const categoriesStore = useSelector((state) => state.category);
  const { categories } = categoriesStore;
  const [categoryId, setCategoryId] = useState("");
  const dispatch = useDispatch();
  console.log(categoriesStore);
 const navigate=useNavigate()
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddsessionChange = (e) => {
    const { name, value } = e.target
    console.log(name);

    setAddsession((Addsession) => ({
      ...Addsession,
      [name]: value 
    }));
  };

  const submitsession = async (event) => {
    event.preventDefault();
    let sess = Object.assign({}, addsession);
    sess.categoryId = categoryId;
    sess.startDate= new Date (sess.startDate)
    sess.endDate= new Date (sess.endDate)

    console.log("sessssss", sess);
    dispatch(CreateNeswSession(sess)).then((res) => {
      if (!res.error) {
        showSuccessToast("session.created");
        navigate(-1)
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };

  
  const handleChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      // No option selected, display an error message or take appropriate action
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
          <label class="form-label" for="customFile">Image  </label>
           <input type="file" class="form-control" id="customFile" />
            <Form.Label>title</Form.Label>
            <input
              type="text"
              placeholder="Enter title"
              name="title"
              value={addsession?.Title}
              onChange={handleAddsessionChange}
            />
          </Form.Group>
          <Form.Group controlId="tariffDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={addsession?.description}
              placeholder="Enter description"
              name="description"
              onChange={handleAddsessionChange}
            />
          </Form.Group>
          <Form.Group controlId="tariffPrice">
            <Form.Label>start-Date</Form.Label>
            <Form.Control
              type="date"
              value={addsession?.startDate}
              name="startDate"
              placeholder="startDate"
              onChange={handleAddsessionChange}
            />
          </Form.Group>
          <Form.Group controlId="tariffPrice">
            <Form.Label>end-Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={addsession?.endDate}
              placeholder="endDate"
              onChange={handleAddsessionChange}
            />
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

          <SaveButton  variant="primary" onClick={submitsession}>
            Confirm
          </SaveButton>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Addtarif;
