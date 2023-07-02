import React from "react";

const SaveButton = ({ onClick, mt, mb ,title}) => {
  return (
    <div>
      <button
        type="button"
        className="full"
        style={{
          backgroundColor: "#48184c",
          marginTop: mt,
          marginBottom: mb,
          color: "#fff",
        }}
        onClick={onClick}
      >
      {title? title :"Save"} 
      </button>
    </div>
  );
};

export default SaveButton;
