import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceById, editSpace } from "../../../store/space";
import axios from "axios";

export default function SpaceDetails() {
  const [files, setFiles] = useState([]);

  const onChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("uploadImages", file);
    });
    console.log("form", formData);
  
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res, "ressssss");
    } catch (err) {
      console.log(err);
    }
  };
  
  const dispatch = useDispatch();
  const { spaceId } = useParams();

  const space = useSelector((state) => state.space?.service);
  const id = spaceId;

  console.log(space, "");

  useEffect(() => {
    dispatch(fetchSpaceById(spaceId));
  }, [dispatch, spaceId]);

  const navigate = useNavigate();
  const [galleryImages, setGalleryImages] = useState([]);

  const handleDeleteImage = (index) => {
    const updatedGallery = [...galleryImages];
    updatedGallery.splice(index, 1);
    setGalleryImages(updatedGallery);
  };

  const handleAddImage = (e) => {
    const newImage = e.target.files[0];
    setGalleryImages([...galleryImages, newImage]);
  };

  const handleSubmit = () => {
    const newMediaWorkspaces = galleryImages.map((image) => ({
      workspaceId: spaceId,
      mediaId: image.id,
    }));

    dispatch(editSpace({ id, ...{ MediaWorkSpace: newMediaWorkspaces } }));

    setGalleryImages([]);
    navigate(-1);
  };

  return (
    <div className="spaceDetailsWrapper">
      <div className="spaceImageWrapper">
        {space?.image ? (
          <img
            className="spaceImage"
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

      {/* <div className="galleryWrapper">
        {galleryImages.length > 0 &&
          galleryImages.map((image, index) => (
            <div key={index} className="galleryImageWrapper">
              <img
                className="galleryImage"
                src={URL.createObjectURL(image)}
                alt={`gallery-image-${index}`}
              />
              <button
                className="deleteButton"
                onClick={() => handleDeleteImage(index)}
              >
                Delete
              </button>
            </div>
          ))}
        <input type="file" className="galleryInput" onChange={handleAddImage} />
        <button className="addButton" onClick={handleSubmit}>
          Add Images
        </button>
      </div> */}

      <form onSubmit={onSubmit}>
        <div>
          <input
            type="file"
            id="file"
            name="uploadImages"
            multiple
            onChange={onChange}
          />
        </div>
        <input type="submit" value="Upload" />
      </form>

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
      </div>
    </div>
  );
}
