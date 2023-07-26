import React, { useEffect, useState } from "react";

import CreateButton from "../../../../components/Commun/buttons/CreateButton";

import Featuress from "../../../../components/Featuress";
import StyledInput from "./../../../../components/Commun/inputs/StyledInput";
import { useDispatch } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { CreateFeature } from "../../../../store/tarifSession";
import Modal from "../../../../components/Commun/Modal";
function Features() {

  const [label, setLabel] = useState("");
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const dispatch = useDispatch();
  const addFea = () => {
    dispatch(CreateFeature({ label }))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Features has been created successfuly");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });
  };

  const handleSave = () => {
    addFea();
    setLabel("");
    toggleShow();
  };

  return (
    <div className="mx-5">
      <div className="d-flex">
        <CreateButton
          title={"add new feature"}
          mt={20}
          mb={20}
          onClick={toggleShow}
        />
        <div style={{ marginTop: 20 }}> </div>
      </div>
      <Featuress />
      <Modal
        toggleShow={toggleShow}
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        normal={true}
        title="Add new feature"
        body={
          <div
            className="d-flex justify-content-center align-items-center "
            style={{ marginRight: "50px" }}
          >
            <StyledInput
            value={label}
              label="Label"
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </div>
        }
        fn={handleSave}
      />
    </div>
  );
}
export default Features;
