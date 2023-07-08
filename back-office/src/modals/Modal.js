import React, { useState } from "react";

const Modal = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState("");
  const [logo, setLogo] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMembersChange = (e) => {
    setMembers(e.target.value);
  };

  const handleLogoChange = (e) => {
    const selectedLogo = e.target.files[0];
    setLogo(selectedLogo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any necessary actions with the form data
    console.log("Title:", title);
    console.log("Members:", members);
    console.log("Logo:", logo);

    // Reset the form inputs
    setTitle("");
    setMembers("");
    setLogo(null);

    // Close the modal
    closeModal();
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        width: "40%",
        height: "80%",
        zIndex: 1,
        marginLeft: "100%",
        backgroundColor: "grey",
      }}
    >
      <div
        className="modal-content"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title">New message</h5>
          <button
            type="button"
            className="close"
            onClick={closeModal}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">
                Recipient:
              </label>
              <input
                type="text"
                className="form-control"
                id="recipient-name"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message-text" className="col-form-label">
                Message:
              </label>
              <textarea
                className="form-control"
                id="message-text"
                value={members}
                onChange={handleMembersChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
