import React, { useState,useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";

const Alert = ({ alertType }) => {
  const [optSmModal, setOptSmModal] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const toggleShow = () => setOptSmModal(!optSmModal);

  useEffect(() => {
    if (alertType === "success") {
      return setSuccess(true);
    } else {
      setFailed(true);
    }
  }, []);

  return (
    <>
      <MDBModal show={optSmModal} onHide={toggleShow}>
        <MDBModalDialog size="sm">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle></MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              {success && (
                <span role="img" className="text-3xl">
                 &#10003;
                </span>
              )}
              {failed && (
                <span role="img" className="text-3xl">
                &#120;
                </span>
              )}
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};
export default Alert;
