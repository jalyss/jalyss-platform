import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import StyledInput from "./StyledInput";

function CustomMDBCol({ Icon1, Icon2, label1, label2 }) {
  return (
    <div className="d-flex flex-column gap-4 my-3">
      <MDBCol  className="d-flex flex-wrap gap-3">
        <Icon1
          style={{ height: "20px", width: "20px" }}
          className="mt-2 "
        />
        <StyledInput label={label1} />
      </MDBCol>

      <MDBCol  className="d-flex flex-wrap gap-3">
        <Icon2
          style={{ height: "20px", width: "20px" }}
          className="mt-2"
        />
        <StyledInput label={label2} />
      </MDBCol>
    </div>
  );
}

export default CustomMDBCol;
