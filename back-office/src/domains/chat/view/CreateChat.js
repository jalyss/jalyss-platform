import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { IoIosPersonAdd } from "react-icons/io";
import { users } from "../../../constants/users";
import "./../../../assets/styles/chat.css";

function CreateChat() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]); // Updated state for multiple members
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleAdminInputChange = (event) => {
    const { value } = event.target;
    setSelectedAdmin(value);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredAdmins(filtered);
  };

  const handleMemberInputChange = (event) => {
    const { value } = event.target;
    setSelectedAdmin(value);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const handleAdminSelection = (name) => {
    setSelectedAdmin(name);
    setFilteredAdmins([]); // Clear the filtered admins list
  };

  const handleMemberSelection = (name) => {
    setSelectedMembers((prevMembers) => [...prevMembers, name]);
    setFilteredMembers([]); // Clear the filtered members list
  };

  const handleRemoveMember = (name) => {
    setSelectedMembers((prevMembers) =>
      prevMembers.filter((member) => member !== name)
    );
  };

  const renderAdmins = () => {
    return (
      <>
        <label>Admin</label>
        <input
          type="text"
          className="form-control"
          placeholder="Admin"
          value={selectedAdmin}
          onChange={handleAdminInputChange}
        />
        {filteredAdmins.length > 0 && (
          <ul className="user-list">
            {filteredAdmins.map((user) => (
              <li
                key={user.name}
                onClick={() => handleAdminSelection(user.name)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  const renderMembers = () => {
    return (
      <>
        <label>Members</label>
        <input
          type="text"
          className="form-control"
          placeholder={
            selectedMembers?.length > 0
              ? selectedMembers.join(" ")
              : "select members"
          } // Display selected members as a space-separated string
          onChange={handleMemberInputChange}
        />
        {filteredMembers.length > 0 && (
          <ul className="user-list">
            {filteredMembers.map((user) => (
              <li
                key={user.name}
                onClick={() => handleMemberSelection(user.name)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
        {selectedMembers.length > 0 && (
          <div>
            <ul>
              {selectedMembers.map((member) => (
                <li key={member}>
                  {member}
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemoveMember(member)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="container">
      <div className="card">
        <div className="container">
          <form>
            <div className="row">
              <div className="form-group col-6 mt-3">
                <label>Chat's name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="form-group col-6 mt-3 position-relative">
                {renderAdmins()}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6 mt-3 position-relative">
                {renderMembers()}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-6 mt-3">
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                {selectedFile ? (
                  <p>Selected file: {selectedFile.name}</p>
                ) : (
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleButtonClick}
                  >
                    Select File
                  </Button>
                )}
              </div>
            </div>
            <div className="w-100 d-flex justify-content-center">
              <button type="submit" className="confirm-button mt-5 mb-3">
                <span className="label-btn"> Add Chat </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateChat;
