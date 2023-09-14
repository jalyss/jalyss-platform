import AddButton from "../../../components/buttons/AddButton";
import { AiFillDelete } from "react-icons/ai";
import "../../../assets/styles/WorkSpaceDetails.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceById, editSpace } from "../../../store/space";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import axios from "axios";

export default function SpaceDetails() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const dispatch = useDispatch();
  const { spaceId } = useParams();

  const space = useSelector((state) => state.space.space);
  const [refresh, setRefresh] = useState(false);
  
console.log(space,'space');

  useEffect(() => {
    dispatch(fetchSpaceById(spaceId));
  }, [dispatch, spaceId, refresh]);

  const navigate = useNavigate();

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
        `${process.env.REACT_APP_API_ENDPOINT}/work-spaces/images/${spaceId}`,
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
        `${process.env.REACT_APP_API_ENDPOINT}/work-spaces/delete-images/${name}`
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

  return (
    <div className="view">
      <div className="card mb-3">
        {space?.image ? (
          <img
            className="card-img-top"
            src={space?.image?.path}
            alt={space?.image?.alt}
          />
        ) : (
          <img
            className="spaceImage"
            src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
            alt="cover"
          />
        )}
      </div>

      <div className="spaceDetails">
        <h5 className="spaceName">{space?.name}</h5>
        <p className="spaceDescription">{space?.description}</p>
        <p className="spaceAmenities">{space?.amenities}</p>
        <div className="spaceFooter">
          <div className="spacePrice">
            <h5>Price: {space?.price}</h5>
            <p className="capacity">Capacity: {space?.capacity}</p>
          </div>
        </div>
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
