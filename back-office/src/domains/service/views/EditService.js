import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById, editService } from "../../../store/service";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";


export default function EditService() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filename, setFileName] = useState("");
  const [filenamesplitted, setFileNamesplitted] = useState("");
  const [cover, setCover] = useState("");
  const id = serviceId;
  const serviceStore = useSelector((state) => state.service);

  console.log(serviceStore, "lol");

  useEffect(() => {
    dispatch(fetchServiceById(serviceId));
  }, [dispatch, serviceId]);

  useEffect(() => {
    if (serviceStore.service) {
      const { name, description, cover } = serviceStore.service;
      // const {cover} = serviceStore.cover
      setName(name);
      setDescription(description);
      setFileName(cover.path);
      deleteImg(filename)
      setCover();
    }
  }, [serviceStore.service]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !cover) {
      console.log("Please fill in all required fields");
      return;
    }

    let body = {
      name,
      description,
    };

    if (cover !== null) {
      try {
        const formData = new FormData();
        formData.append("file", cover);

        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/upload`,
          formData
        );

        body.coverId = response.data.id;
      } catch (error) {
        showErrorToast("Error uploading cover image:", error);
      }
    }

    dispatch(editService({ id, body })).then((res) => {
      if (!res.error) {
        showSuccessToast("Service has been updated");
        navigate(-1);
      } else {
        console.log(res.error.message);
      }
    });
  };

  const deleteImg = async (path) => {
    const pathElements = path.split('/');
    const name = pathElements[pathElements.length - 1];
  console.log(name,'ggg')
  setFileNamesplitted(name)
  };

  return (
    <div>
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
            <label htmlFor="exampleFormControlTextarea1">description</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Image file input</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              onChange={(e) => setCover(e.target.files[0])}
              required
            />
            {/* {filenamesplitted && <p>Selected file: {filenamesplitted}</p>} */}
          </div>
          <button type="submit" className="btn btn-primary mb">
            Add the service
          </button>
        </form>
      </div>
    </div>
  );
}
