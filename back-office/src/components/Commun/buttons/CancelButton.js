import React from "react";

function CancelButton({ onClick, mt, mb }) {
  return (
    <div>
     <button
      type="button"
      class="full bg-dark "
      style={{
        color:"#fff",
        marginTop: mt,
        marginBottom: mb,
      }}
      onClick={onClick}
    >
    Cancel
    </button>
    </div>
  );
}

export default CancelButton;
