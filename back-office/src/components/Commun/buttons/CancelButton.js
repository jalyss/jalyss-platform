import React from "react";

function CancelButton({ onClick, mt, mb, width }) {
  return (
    <div>
      <button
        type="button"
        class="full bg-dark "
        style={{
          color: "#fff",
          marginTop: mt,
          marginBottom: mb,
          width: width,
        }}
        onClick={onClick}
      >
        Cancel
      </button>
    </div>
  );
}

export default CancelButton;
