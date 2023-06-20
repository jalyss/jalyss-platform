import React from "react";
import Dropdown from "./DropDown";
import start from "../../img/start.png";
import end from "../../img/end.png";
import cardCover from "../../img/cardCover.jpg"
function Card({
  cover,
  category,
  title,
  avatar,
  createdAt,
  startTime,
  endTime,
  onClick,
}) {
  return (
    <div className="blogItemWrapper" style={{ cursor: "pointer" }}>
      {cover ? (
        <img
          className="blogItemCover"
          src={cover}
          alt="cover"
          onClick={onClick}
        />
      ) : (
        <img
          className="blogItemCover"
          src={cardCover}
          alt="cover"
          onClick={onClick}
        />
      )}
      <div className="chip mt-3" onClick={onClick}>
        {category}
      </div>
      <div className="d-flex flex-column gap-2" onClick={onClick}>
        <h5 style={{ marginTop: "20px", marginLeft: "20px", flex: "1" }}>
          {title}
        </h5>
      </div>
      <div className="blogItemFooter d-flex justify-content-between mt-1">
        <div className="d-flex align-items-center" onClick={onClick}>
          {avatar && (
            <img className="blogItemAuthorAvatar" src={avatar} alt="avatar" />
          )}
          <div className="d-flex  justify-content-between gap-5 mt-3">
            <div className="d-flex flex-column justify-content-center align-items-center gap-2 ">
              {" "}
              <img src={start} height="20" width="20" alt="icon" />{" "}
              <div>{startTime}</div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <img src={end} height="20" width="20" alt="icon" />{" "}
              <div>{endTime}</div>
            </div>
          </div>
        </div>
        <div >
          <Dropdown content1="Save" content2="Delete" content3="Edit" />
        </div>
      </div>
    </div>
  );
}

export default Card;
