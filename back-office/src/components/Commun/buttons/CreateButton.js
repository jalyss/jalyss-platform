import React from "react";

function CreateButton({ onClick, mt, mb, title, disabled }) {
  return (
    <button
      disabled={disabled}
      className="full"
      style={{
        backgroundColor: "#48184c",
        color: "#fff",
        marginTop: mt,
        marginBottom: mb,
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default CreateButton;
