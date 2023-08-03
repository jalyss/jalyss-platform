import React, { useEffect, useState } from "react";

import CreateButton from "../../../../components/Commun/buttons/CreateButton";


import StyledInput from "./../../../../components/Commun/inputs/StyledInput";
import { useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";

import Modal from "../../../../components/Commun/Modal";
import { CreateSessionType } from "../../../../store/sessiontypes";
import SessionTypesDataGrid from "../../components/SessionTypesDataGrid";
function SessionType() {

  const [title, setTitle] = useState("");
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const dispatch = useDispatch();
  const addType = () => {
    dispatch(CreateSessionType({ title }))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Type has been created successfuly");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });
  };

  const handleSave = () => {
    addType();
    setTitle("");
    toggleShow();
  };

  return (
    <div className="mx-5">
      <div className="d-flex">
        <CreateButton
          title={"add new type"}
          mt={20}
          mb={20}
          onClick={toggleShow}
        />
        <div style={{ marginTop: 20 }}> </div>
      </div>
      <SessionTypesDataGrid />
      <Modal
        toggleShow={toggleShow}
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        normal={true}
        title="Add new type"
        body={
          <div
            className="d-flex justify-content-center align-items-center "
            style={{ marginRight: "50px" }}
          >
            <StyledInput
            value={title}
              label="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        }
        fn={handleSave}
      />
    </div>
  );
}
export default SessionType;