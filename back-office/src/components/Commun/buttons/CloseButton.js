import React from "react";

function CloseButton({ onClick, mt, mb ,modifTitle }) {
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
    {modifTitle?modifTitle:"Close"} 
    </button>
  );
}

export default CloseButton;
