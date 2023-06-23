import React from "react";

const Modal = ({ image, closeModal, handleDelete }) => {
  return (
    <div className="modal">
      <div className="modalContent">
        <img alt="" src={image.path} />
        <button onClick={closeModal}>Close</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Modal;
