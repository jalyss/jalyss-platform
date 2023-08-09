import React, { useEffect, useState } from "react";

import CreateButton from "../../../../components/Commun/buttons/CreateButton";

import StyledInput from "./../../../../components/Commun/inputs/StyledInput";
import { useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";

import Modal from "../../../../components/Commun/Modal";
import { CreatePrereq } from "../../../../store/gain";
import Prereq from "../../../../components/Prereq";

function Prerequire() {
  const [content, setContent] = useState({});
  const [basicModal, setBasicModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((content) => ({ ...content, [name]: value }));
  };


  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const dispatch = useDispatch();
  const addPrereq = () => {
    dispatch(CreatePrereq(content))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Prerequire has been created successfuly");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });
  };

  const handleSave = () => {
    addPrereq();
    setContent({});
    toggleShow();
  };
  return (
    <div className="mx-5">
      <div className="d-flex">
        <CreateButton
          title={"add new Prerequire"}
          mt={20}
          mb={20}
          onClick={toggleShow}
        />
        <div style={{ marginTop: 20 }}> </div>
      </div>
      <Prereq />
      <Modal
        toggleShow={toggleShow}
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        normal={true}
        title="Add new prerequire"
        body={
          <div
            className="d-flex flex-column gap-3 justify-content-center align-items-center "
            style={{ marginRight: "50px" }}
          >
            <StyledInput
              value={content.contentEn}
              label="contentEn"
              name="contentEn"
              onChange={handleChange}
            />
            <StyledInput
              value={content.contentAr}
              label="contentAr"
              name="contentAr"

              onChange={handleChange}
            />
          </div>
        }
        fn={handleSave}
      />
    </div>
  );
}

export default Prerequire;
