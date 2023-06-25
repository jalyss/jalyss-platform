import React from "react";

function CloseButton({ onClick, mt, mb,title }) {
  return (
    <button
      class="full "
      style={{
        marginTop: mt,
        marginBottom: mb,
        backgroundColor:"#f5e6fe",
        color:"#48184c",
        fontWeight:"bold"
      }}
      onClick={onClick}
    >
     {title ? title : "close"} 
    </button>
  );
}

export default CloseButton;
