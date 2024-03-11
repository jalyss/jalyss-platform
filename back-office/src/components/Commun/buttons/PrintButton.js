import React from "react";

function PrintButton({ onClick, type, width }) {
  return (
    <div>
      <button
        type={type}
        className="full"
        style={{
          backgroundColor: "#3B70B3",
          color: "#fff",
          width: width,
        }}
        onClick={onClick}
      >
        Print
      </button>
    </div>
  );
}

export default PrintButton;
