import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import CloseButton from "./buttons/CloseButton";
import SaveButton from "./buttons/SaveButton";

export default function App({
  toggleShow,
  basicModal,
  setBasicModal,
  title,
  body,
  normal,
  ofDelete,
  bodOfDelete
}) {
  return (
    <>
      <MDBModal
        show={basicModal}
        setShow={setBasicModal}
        toggle={toggleShow}
        tabIndex="-1"
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader
              className={
                ofDelete
                  ? "bg-danger d-flex justify-content-center align-items-center"
                  : ""
              }
            >
              {normal ? (
                <>
                  <MDBModalTitle>{title}</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </>
              ) : (
                <MDBModalTitle className="fs-bold" style={{ color: "#fff" }}>
                  Are You Sure?
                </MDBModalTitle>
              )}
            </MDBModalHeader>
            <MDBModalBody>
              {normal ? (
                body
              ) : (
                <>
                <span className="d-flex justify-content-center align-items-center">
                  &#10060;
                </span>
                {bodOfDelete}
                </>
              )}
            </MDBModalBody>
            <MDBModalFooter className="d-flex justify-content-center align-items-center">
              {normal ? (
                <>
                  <CloseButton onClick={toggleShow} />
                  <SaveButton />
                </>
              ) : (
                <>
                  <button className="full bg-danger">Yes</button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={toggleShow}
                  >
                    No
                  </button>
                </>
              )}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
