import React from "react";

const SaveButton = ({ onClick, mt, mb,onSubmit,type,width,disabled }) => {
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
          width:width
        }}
        disabled={disabled}
        onSubmit={onSubmit}
        onClick={onClick}
      >
       Save
      </button>
    </div>
  );
};

export default SaveButton;
