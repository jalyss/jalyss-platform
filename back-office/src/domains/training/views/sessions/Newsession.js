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
import SaveButton from "../../../../components/Commun/buttons/SaveButton";
import { useRef } from "react";
import axios from "axios";
const Addtarif = () => {
  const [addsession, setAddsession] = useState({});
  const categoriesStore = useSelector((state) => state.category);
  const [cover, setCover] = useState("");

  const { categories } = categoriesStore;
  const [categoryId, setCategoryId] = useState("");
  const fileInputRef = useRef(null); // Reference to the file input element
  const dispatch = useDispatch();
  console.log(categoriesStore);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddsessionChange = (e) => {
    const { name, value } = e.target;
    console.log(name);

    setAddsession((Addsession) => ({
      ...Addsession,
      [name]: value,
    }));
  };

  const submitsession = async (event) => {
    event.preventDefault();
    let sess = Object.assign({}, addsession);
    sess.categoryId = categoryId;
    sess.startDate = new Date(sess.startDate);
    sess.endDate = new Date(sess.endDate);
    if (cover !== null) {
      console.log("in if");
      const image = new FormData();
      image.append("file", cover);
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/upload`,
        image
      );
      sess.coverId = response.data.id;
    }
    console.log("sessssss", sess);
    dispatch(CreateNeswSession(sess)).then((res) => {
      if (!res.error) {
        showSuccessToast("session.created");
        navigate(-1);
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
  };

  const handleChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      alert("Please choose a category!");
    } else {
      setCategoryId(selectedOption);
    }
  };
  const handleImageClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input click event
  };
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 card-container">
      <div style={{ width: "50rem" }} className="text-center custom-card">
        <label class="form-label mt-5" for="customFile">
          Image{" "}
        </label>

        <input
          type="file"
          className="form-control visually-hidden"
          id="customFile"
          onChange={handleImageChange}
          ref={fileInputRef}
        />

        {cover && (
          <img
            src={URL.createObjectURL(cover)}
            alt="Cover Image"
            style={{
              width: "200px",
              height: "200px",
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={handleImageClick}
            className="rounded"
          />
        )}
        {!cover && (
          <input
            type="file"
            className="form-control "
            onChange={handleImageChange}
          />
        )}

        <Form.Label>title</Form.Label>
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          value={addsession?.Title}
          onChange={handleAddsessionChange}
        />

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

        <SaveButton variant="primary" mt={20} onClick={submitsession} />
      </div>
    </div>
  );
};

export default Addtarif;
