import React from "react";

const SaveButton = ({ onClick, mt, mb,onSubmit,type }) => {
  return (
    <div>
      <button
        type={type}
        className="full"
        style={{
          backgroundColor: "#48184c",
          marginTop: mt,
          marginBottom: mb,
          color: "#fff",
        }}
        onSubmit={onSubmit}
        onClick={onClick}
      >
       Save
      </button>
    </div>
  );
};

export default SaveButton;
