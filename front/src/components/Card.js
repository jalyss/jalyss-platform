import React from "react";
import Dropdown from "../components/DropDown"
function Card({
  cover,
  category,
  title,
  author,
  avatar,
  createdAt,
  startTime,
  endTime,
  duration,
  onClick
}) {
  return (
    <div className="blogItemWrapper" style={{ cursor: "pointer" }}>
      {cover ? (
        <img className="blogItemCover" src={cover} alt="cover" onClick={onClick}/>
      ) : (
        <img
          className="blogItemCover"
          src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
          alt="cover"
          onClick={onClick}
        />
      )}
      <div className="chip mt-3" onClick={onClick}>{category}</div>
      <div className="d-flex flex-column gap-2" onClick={onClick}>
        <h5 style={{ margin: "20px", flex: "1" }}>{title}</h5>
      </div>
      <div className="blogItemFooter d-flex justify-content-between mt-1">
        <div className="d-flex align-items-center" onClick={onClick}>
          {avatar && (
            <img className="blogItemAuthorAvatar" src={avatar} alt="avatar" />
          )}
          <div className="d-flex flex-column">
            {author && <h6 className="mt-3">{author?.fullNameEn}</h6>}
            {createdAt && (
              <p
                style={{
                  fontSize: "0.6rem",
                  color: "#a9a9a9",
                  fontWeight: "600",
                }}
              >
                {createdAt}
              </p>
            )}
            <h6 className="courses-text mt-1">&#9203; {duration}</h6>
            <div className=" ">
              <h6 className="courses-text">Starts at: {startTime}</h6>
              <h6 className="courses-text">Ends at: {endTime}</h6>
            </div>
          </div>
        </div>
        <div style={{marginTop:"60px"}}>
       <Dropdown content1="Save" content2="Delete" content3="Edit"/>
      </div>
      </div>
    </div>
  );
}

export default Card;
