import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import StyledInput from "./StyledInput";

function CustomMDBRow({ Icon1, Icon2, label1, label2 }) {
  return (
    <MDBRow className="mt-5">
      <MDBCol md="6" className="d-flex flex-wrap gap-3">
        <Icon1
          style={{ height: "20px", width: "20px" }}
          className="mt-2 "
        />
        <StyledInput label={label1} />
      </MDBCol>

      <MDBCol md="6" className="d-flex flex-wrap gap-3">
        <Icon2
          style={{ height: "20px", width: "20px" }}
          className="mt-2"
        />
        <StyledInput label={label2} />
      </MDBCol>
    </MDBRow>
  );
}

export default CustomMDBRow;
