import React from "react";

const AddButton = ({ onClick, mt, mb ,title }) => {
  return (
    <div>
      <button
        type="button"
        className="full"
        style={{
          backgroundColor: "#790BE0",
          marginTop: mt,
          marginBottom: mb,
          color: "#fff",
        }}
        onClick={onClick}
      >
       {title}
      </button>
    </div>
  );
};

export default AddButton;
