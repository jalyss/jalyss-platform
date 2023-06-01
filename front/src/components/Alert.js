import React, { useState, useEffect } from "react";
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
      setSuccess(true);
    } else {
      setFailed(true);
    }
  }, []);

  return (
    <>
      <MDBModal show={optSmModal} onHide={toggleShow} centered>
        <MDBModalDialog size="sm">
          <MDBModalContent>
            <MDBModalHeader style={{ backgroundColor: "#48184c", textAlign: "center" }}>
              <MDBModalTitle style={{textAlign: "center"}}>
                {success && <p className="text-white mx-auto">Success</p>}
                {failed && <p className="text-white mx-auto">Failure</p>}
              </MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody style={{ textAlign: "center" }}>
              {success && (
                <span role="img" className="text-3xl">
                  &#10003;
                </span>
              )}
              {failed && (
                <span role="img" className="text-4xl text-red-500">
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

