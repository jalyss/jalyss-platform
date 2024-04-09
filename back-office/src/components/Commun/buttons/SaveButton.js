import React from "react";

const SaveButton = ({ name ,onClick, mt, mb,onSubmit,type,width,disabled,bgColor }) => {
  return (
    <div>
      <button
        type={type}
        className=" btn btn-light"
        style={{
          backgroundColor: bgColor || "#48184c"  ,
          marginTop: mt,
          marginBottom: mb,
          color: "#fff",
          width:width
        }}
      
        disabled={disabled}
        onSubmit={onSubmit}
        onClick={onClick}
      >
{ name ? name:'Save ' }	

      </button>
    </div>
  );
};

export default SaveButton;
