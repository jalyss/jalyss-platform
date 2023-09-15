// import "../../../assets/styles/WorkSpaceDetails.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceById } from "../../store/space";

export default function WorkSpaceDetail() {
  const dispatch = useDispatch();
  const { workSpaceId } = useParams();

  const space = useSelector((state) => state.space.space);
  const [refresh, setRefresh] = useState(false);

  console.log(space, 'space');

  useEffect(() => {
    dispatch(fetchSpaceById(workSpaceId));
  }, [dispatch, workSpaceId, refresh]);

  const navigate = useNavigate();

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
      </div>
      {space?.MediaWorkSpace?.map((elem, i) => (
        <div className="grid" key={i}>
          <img alt="" src={elem.media.path} style={{ height: 100 }} />
        </div>
      ))}
    </div>
  );
}
