import React from "react";

function DeleteButton({ onClick, mt, mb }) {
  return (
    <div>
      <button
        className="full bg-danger"
        style={{ marginTop: mt, marginBottom: mb }}
        onClick={onClick}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteButton;
