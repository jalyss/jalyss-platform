import React from "react";

function UpdateButton({ mt, mb, onClick, content, type }) {
  return (
    <button
      type={type}
      className="outline"
      style={{ marginTop: mt, marginBottom: mb, fontWeight: 500 }}
      onClick={onClick}
    >
      {content ? content : "Update"}
    </button>
  );
}

export default UpdateButton;
