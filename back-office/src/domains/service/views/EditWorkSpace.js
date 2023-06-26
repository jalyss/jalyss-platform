import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpaceById, editSpace } from "../../../store/space";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";


export default function EditWorkSpace() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spaceId, serviceId } = useParams();

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");

  const workSpaceStore = useSelector((state) => state.space.space);

  console.log(workSpaceStore);

const id = spaceId;
const service = serviceId

  useEffect(() => {
    dispatch(fetchSpaceById(spaceId));
  }, [dispatch, spaceId]);

  useEffect(() => {
    if (workSpaceStore) {
      setName(workSpaceStore?.name);
      setCapacity(workSpaceStore?.capacity);
      setDescription(workSpaceStore?.description);
      setAmenities(workSpaceStore?.amenities);
      setPrice(workSpaceStore?.price);
      setImage(workSpaceStore?.image);
    }
  }, [workSpaceStore?.space]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const body ={
        name,
        capacity,
        price,
        description,
        amenities,
        image,
      }
    dispatch(editSpace({id,...body})
    ).then((res) => {
      if (!res.error) {
        showSuccessToast("WorkSpace has been edited");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput2">Capacity</label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput2"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput2">Price</label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea2">Amenities</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea2"
            rows="3"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Image file input</label>
          <input
            type="file"
            className="form-control-file"
            id="exampleFormControlFile1"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mb">
          Edit Space
        </button>
      </form>
    </div>
  );
}
