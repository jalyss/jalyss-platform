import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { fetchServiceById, editService } from "../../../store/service";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import AddButton from "../../../components/buttons/AddButton";


export default function EditService() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filename, setFileName] = useState("");
  const [filenamesplitted, setFileNamesplitted] = useState("");
  const [cover, setCover] = useState("");
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const id = serviceId;
  const serviceStore = useSelector((state) => state.service);

  console.log(serviceStore, "lol");
  const space = useSelector((state) => state.service);



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

  const onChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const galleryData = new FormData();

    for (let i = 0; i < files.length; i++) {
      galleryData.append("files", files[i]);
    }

    let auxMedia = [];
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/uploads`,
        galleryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
            setTimeout(()=>{

              setUploadProgress(0)
            },2000)
          },
        }
      );
      auxMedia = res.data.map((elem) => elem.id);
    } catch (err) {
      console.log(err);
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/services/images/${serviceId}`,
        auxMedia
      )
      .then((res) => {
        setRefresh(!refresh);
        if (!res.error) {
          showSuccessToast("image added");
        } else {
          showErrorToast(res.error.message);
        }
      });
  };

  const deleteImg = async (path) => {
    const pathElements = path.split("/");
    const name = pathElements[pathElements.length - 1];

    await axios
      .delete(
        `${process.env.REACT_APP_API_ENDPOINT}/services/delete-images/${name}`
      )
      .then((res) => {
        if (!res.error) {
          window.location.reload();
          showSuccessToast("image deleted");
        } else {
          showErrorToast(res.error);
        }
      });
  };

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
        showErrorToast("res.error.message");
        console.log(res.error.message);
      }
    });
  };


  return (

    <div>
      <div className="container">
        <>
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
        </>
        <>
        <form onSubmit={onSubmit}>
          <div>
          <input
              className="form-input"
              style={{ display: "block", visibility: "visible" }}
              type="file"
              id="file"
              accept="image/*"
              multiple
              onChange={(e) => onChange(e)}
            />
          </div>
          <AddButton type="submit" content="Upload" />
        </form>
        </>
          <div>
          {uploadProgress > 0 && (
            <progress value={uploadProgress} max="100" />
          )}
          
          </div>
      </div>
      {space?.MediaWorkSpace?.map((elem, i) => (
        <div className="grid" key={i}>
          <img alt="" src={elem.media.path} style={{ height: 100 }} />
          <div className="deleteButton">
            <AddButton
              onClick={() => deleteImg(elem.media.path)}
              content={<AiFillDelete />}
              startIcon
              />
          </div>
        </div>
      ))}
      
      </div>
  );
}




