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

export default function Modal({
  toggleShow,
  basicModal,
  setBasicModal,
  title,
  body,
  normal,
  ofDelete,
  bodOfDelete,
  confirm,
  fn,
  onSubmit,
  noButtons,
  noFooter,
}) {
  return (
    <MDBModal show={basicModal} setShow={setBasicModal} toggle={toggleShow} >
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
          {!noFooter && (
            <MDBModalFooter className="d-flex justify-content-center align-items-center">
              {!noButtons ? (
                <>
                  {normal ? (
                    <>
                      <CloseButton onClick={toggleShow} type={"button"} />
                      <SaveButton
                        onClick={fn}
                        onSubmit={onSubmit}
                        type={onSubmit ? "submit" : "button"}
                      />
                    </>
                  ) : (
                    <>
                      <button className="full bg-danger" onClick={confirm}>
                        Yes
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={toggleShow}
                      >
                        No
                      </button>
                    </>
                  )}
                </>
              ) : null}
            </MDBModalFooter>
          )}
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
