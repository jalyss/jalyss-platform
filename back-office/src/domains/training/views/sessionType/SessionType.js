import React, { useEffect, useState } from "react";

import CreateButton from "../../../../components/Commun/buttons/CreateButton";


import StyledInput from "./../../../../components/Commun/inputs/StyledInput";
import { useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";

import Modal from "../../../../components/Commun/Modal";
import { CreateSessionType } from "../../../../store/sessiontypes";
import SessionTypesDataGrid from "../../components/SessionTypesDataGrid";
function SessionType() {

  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const dispatch = useDispatch();
  const addType = () => {
    dispatch(CreateSessionType({ titleEn,titleAr }))
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
    setTitleEn("");
    setTitleAr("");

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
            className="d-flex flex-column gap-3 justify-content-center align-items-center "
           
          >
            <StyledInput
            value={titleEn}
              label="titleEn"
              onChange={(e) => {
                setTitleEn(e.target.value);
              }}
            />
               <StyledInput
            value={titleAr}
              label="titleAr"
              onChange={(e) => {
                setTitleAr(e.target.value);
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
